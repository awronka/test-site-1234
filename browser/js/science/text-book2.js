app.directive('textBookTwo', function($window, $parse){
	return {
		restrict: 'EA',
		scope: {},
		template: "<div id=bookTwoContainer></div>",
		link: function(scope,elem, attr){
			
			
		var d3 = $window.d3;
		
		// set up dimensions 
		var height = 700,
			width = 700,
			margin = 70;
		
		
		
		d3.json('/data/bus_perf.json', function(err, data){
			console.log(data)
			
		d3.select('#bookTwoContainer').append('svg')
				.attr('height', height)
				.attr('width', width)
				.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
				
		//set up xScale
		
		//xmin and xmax
		var xExtent = d3.extent(data, function(d){return d.collision_with_injury})
		console.log(xExtent)
		
		var xScale = d3.scale.linear()
				.range([margin,width-margin])
				.domain(xExtent)
		console.log(xScale)
		var yExtent = d3.extent(data, function(d){return d.dist_between_fail})
		
		var yScale = d3.scale.linear()
					.range([height-margin,margin])
					.domain(yExtent)
					
			d3.selectAll('circle')
				.attr('cx', function(d){return xScale(d.collision_with_injury)})
				.attr('cy', function(d){return yScale(d.dist_between_fail) })
				.attr('r',5)
		
		var x_axis = d3.svg.axis().scale(xScale)
		
			d3.select('svg').append('g')
				.attr('class', 'x axis')
				.attr('transform','translate(0,'+(height-margin)+')').call(x_axis)
				
		var y_axis = d3.svg.axis().scale(yScale).orient(['left'])
		
			d3.select('svg').append('g')
				.attr('class', 'y axis')
				.attr('transform', 'translate('+margin+',0)').call(y_axis)
				
			// add axis titles 
			d3.select('.x.axis')
				.append('text')
				.text('collision with injury(per million miles)')
				.attr('x', (width/2)-margin)
				.attr('y', margin/1.5)
			
			d3.select('.y.axis')
				.append('text')
				.text('mean distance between failure')
				.attr('transform', 'rotate(-90, -50, 0) translate('+(-height/2-margin)+')')
				
				
		// var x_extent = d3.extent(data, function(d){return d.collision_with_injury})
        // var y_extent = d3.extent(data, function(d){return d.dist_between_fail});
            
        // var x_scale = d3.scale.linear()
        //     .range([margin,width-margin])
        //     .domain(x_extent)
        
        // var y_scale = d3.scale.linear()
        //     .range([height-margin, margin])
        //     .domain(y_extent)
		// 	d3.selectAll('circle')
		// 		.attr('cx', function(d){return x_scale(d.collision_with_injury)})
		// 		.attr('cy', function(d){return y_scale(d.dist_between_fail) })
		// 		.attr('r',5)
				
			
				
			
			
		})
			
			
			
			
		}
		
	}
})


        // var margin = 50,
        //     width = 700,
        //     height = 300,
        //     x_extent = d3.extent(data, function(d){return d.collision_with_injury}),
        //     y_extent = d3.extent(data, function(d){return d.dist_between_fail});
            
        // var x_scale = d3.scale.linear()
        //     .range([margin,width-margin])
        //     .domain(x_extent)
        
        // var y_scale = d3.scale.linear()
        //     .range([height-margin, margin])
        //     .domain(y_extent)
        
        // var x_axis = d3.svg.axis().scale(x_scale)
        // var y_axis = d3.svg.axis().scale(y_scale).orient('left')
        
        
        // d3.select("body")
        //   .append('svg')
        //     .attr('width', width)
        //     .attr('height', height)
        //   .selectAll('circle')
        //   .data(data)
        //   .enter()
        //   .append('circle')
        //     .attr('cx', function(d){return x_scale(d.collision_with_injury)})
        //     .attr('cy', function(d){return y_scale(d.dist_between_fail)})
        //     .attr('r', 5)
        
        // d3.select("svg") 
        //   .append("g") 
        //     .attr("class", "x axis") 
        //     .attr("transform", "translate(0," + (height-margin) + ")") 
        //   .call(x_axis);
        
        // d3.select("svg") 
        //   .append("g") 
        //     .attr("class", "y axis") 
        //     .attr("transform", "translate(" + margin + ", 0 )") 
        //   .call(y_axis);
         
        // d3.select('.y.axis')
        //     .append('text')
        //     .text('mean distance between failure (miles)')
        //     .attr('transform', "rotate (-90, -43, 0) translate(-280)")
                    
        // d3.select('.x.axis')
        //   .append('text')
        //     .text('collisions with injury (per million miles)')
        //     .attr('x', function(){return (width / 2) - margin})
        //     .attr('y', margin/1.5)