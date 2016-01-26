app.directive('bookFour', function($window){
	return{
		restrict:"EA",
		scope:{},
		template:'<div id="book-four"><div id="time-series" class="data-series"></div><div id="key" class="data-series"></div><div>',
		link: function(scope,attr,elem){
			var d3 = $window.d3;
		
		var time_scale,
            percent_scale;
		
        
        function draw(data){
			
			var containter_dimensions = {width: 800, height: 400},
				margins = {top: 10, right: 20, bottom: 30, left: 60},
				chart_dimensions = {
					width: containter_dimensions.width - margins.right-margins.left,
					height: containter_dimensions.height - margins.top - margins.bottom
				};
				
			var chart = d3.select('#time-series')
						.append('svg')
						.attr('height', containter_dimensions.height)
						.attr('width', containter_dimensions.width)
					.append('g')
						.attr('height', chart_dimensions.height)
						.attr('width', chart_dimensions.width)
			
			    time_scale = d3.time.scale()
					.range([margins.left,chart_dimensions.width])
					.domain([new Date(2009,0,1), new Date(2011,3,1)])
			
			    percent_scale = d3.scale.linear()
					.range([chart_dimensions.height,margins.top])
					.domain([65,90])
					
			var time_axis = d3.svg.axis()
					.scale(time_scale)
			
			var count_axis = d3.svg.axis()
					.scale(percent_scale)
					.orient('left')
			
			chart.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,'+ chart_dimensions.height+')')
				.call(time_axis)
			
			chart.append('g')
				.attr('class', 'y axis')
				.attr('transform', 'translate('+margins.left+',0)')
				.call(count_axis);
			
			
			d3.select('.y.axis')
				.append('text')
				.attr('text-anchor','middle')
				.text('percent on time')
				.attr('transform', 'rotate(-270,50,0)')
				.attr('x', containter_dimensions.height/2)
				.attr('y', 100)
			
			var key_items = d3.select('#key')
						.selectAll('div')
						.data(data)
						.enter()
						.append('div')
							.attr('class', 'key_line')
							.attr('id', function(d){return d.line_id})
			
				key_items.append('div')
					.attr('id', function(d){return 'key_square_'+d.line_id})
					.attr('class', 'key_square')
				
				key_items.append('div')
						.append('class', 'key_label')
						.text(function(d){return d.line_name})
				

				d3.selectAll('.key_line')
					.on('click', get_timeseries_data);

				
		}	
		
		
		function get_timeseries_data(){
				
				//get the id of the current element
				var id = d3.select(this).attr('id')
			console.log('hit')
			//see fi we have an associated time series
			
			var ts = d3.select("#"+id+"_path");
				if(ts.empty()){
					d3.json('/data/subway_wait.json', function(data){
                    
						var filtered_data = data.filter(function(d){return d.line_id ===id})
                        console.log(filtered_data)
						draw_timeseries(filtered_data, id)
					})
				}
				else{
                    console.log('hit 2')
					ts.remove();
				}
		};
			
       function draw_timeseries(data, id){
           console.log('hit 3')
            var line = d3.svg.line()
                    .x(function(d){return time_scale(d.time)})
                    .y(function(d){return percent_scale(d.late_percent)})
                    .interpolate("linear")
                
                var g = d3.select('svg')
                    .append('g')
                    .attr('id', id+'_path')
                    .attr('class', 'timeseries ' + id.split("_")[1])
                
                console.log("This is the ", g)
                
                g.append('path')
                    .attr('d', line(data))
                
                g.selectAll('circle')
                    .data(data)
                    .enter()
                    .append('circle')
                    .attr('cx', function(d){return time_scale(d.time)})
                    .attr('cy', function (d){return percent_scale(d.late_percent)})
                    .attr('r', 0)
                    .transition()
                    .delay(function(d,i){return i*50 })
                    .attr('r',5)
                    .style('fill', "black")
                    .each('end', function(d,i){
                        if(i=== data.length-1){
                            add_label(this,d)
                        }
                    })
                g.selectAll('circle')
                    .on('mouseover', function(d){
                        d3.select(this)
                            .transition()
                            .attr('r',9)
                            .style('fill', 'blue')
                    })
                    .on('mouseout', function(d,i){
                        if(i !== data.length-1){
                         d3.select(this)
                            .transition()
                            .attr('r', 5)
                            .style('fill', 'black') 
                        }
                    })
                    .on('mouseover.tooltip', function(d){
                        d3.select('svg')
                            .append('text')
                            .text(d.late_percent+"%")
                            .attr('x', time_scale(d.time))
                            .attr('y', percent_scale(d.late_percent)-20)
                            .attr('id', d.line_id)
                    })
                    .on('mouseout.tooltip', function(d){
                        d3.select('text#'+d.line_id)
                            .transition()
                            .duration(500)
                            .style('opacity', 0)
                            .style('font-size','1px')
                            .attr('transform', 'translate(0,+20)')
                            .remove()
                    })
            
            function add_label(circle, d){
                    d3.select(circle)
                        .transition()
                        .attr('r',9)
                    g.append('text')
                        .text(d.line_id.split("_")[1])
                        .attr('x', time_scale(d.time))
                        .attr('y', percent_scale(d.late_percent))
                        .attr('dy', '0.35em')
                        .attr('class', 'linelabel')
                        .attr('text-anchor','middle')
                        .style('opacity',0)
                        .style('fill', "white")
                        .transition()
                        .style('opacity', 1)
                
            }
                
       }
			d3.json('/data/subway_wait_mean.json', draw)
				
		}
	}
})