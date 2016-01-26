app.directive("textBookThree", function($window, $parse){
	return {
		restrict: "EA",
		scope: {},
		template: "<div id='bookThreeContainer'></div>",
		link: function(scope, elem, attrs){
			var d3 = $window.d3;
			
			var margin = 40,
				height= 700,
				width = 1100;
				
		d3.select('#bookThreeContainer').append('svg')
					.attr('width', width)
					.attr('height', height)
					.append('g')
					.attr('class', 'chart')
		
		d3.json('/data/turnstileData.json', function(err, data){
			if(err) return err
		
			d3.select('svg')
					.selectAll('circle.times_square')
					.data(data.times_square)
					.enter()
					.append('circle')
						.attr('class', 'times_square')
			d3.select('svg')
				.selectAll('circle.grand_central')
				.data(data.grand_central)
				.enter()
				.append('circle')
					.attr('class', 'grand_central')
					.style('fill', 'blue')

		var count_extent = d3.extent(data.times_square.concat(data.grand_central),
				function(d){return d.count})
		
		var count_scale = d3.scale.linear()
						.domain(count_extent)
						.range([height-margin, margin])
			
		var time_extent = d3.extent(data.times_square.concat(data.grand_central),
				function(d){return d.time});
				
		var time_scale = d3.time.scale()
				.domain(time_extent)
				.range([margin, width-margin])
			
			d3.selectAll('circle')
				.attr('cy', function(d){return count_scale(d.count)})
				.attr('cx', function(d){return time_scale(d.time)})
				.attr('r', 5)
				
		var time_axis = d3.svg.axis()
					.orient('bottom')
					.scale(time_scale)
			
			d3.select('svg')
				.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,660)')
				.call(time_axis)
		
		console.log((height-margin))
				
		var count_axis = d3.svg.axis()
						.orient('left')
						.scale(count_scale)
		
			d3.select('svg')
				.append('g')
				.attr('class','y axis')
				.attr('transform', 'translate('+margin+',0)')
				.call(count_axis)
		
		var line = d3.svg.line()
				.y(function(d){return count_scale(d.count)})
				.x(function(d){return time_scale(d.time)})
				
			d3.select('svg')
				.append('path')
				.attr('d', line(data.times_square))
				.attr('class', 'times_square')
			
			d3.select('svg')
				.append('path')
				.attr('d', line(data.grand_central))
				.attr('class', 'grand_central')
				
			
     d3.select('.y.axis')
          .append('text')
          .text('mean number of turnstile revolutions')
          .attr('transform', "rotate (90, " + -margin + ", 0)")
          .attr('x', 20)
          .attr('y', 0)
                    
      d3.select('.x.axis')
        .append('text')
          .text('time')
          .attr('x', function(){return (width / 1.6) - margin})
          .attr('y', margin/1.5)
		})
				
			
		}
	}
})