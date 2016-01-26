app.directive('graphSix', function($window, $parse){
	return {
		retstrict: "EA",
		template: '<div id=containerSix><button ng-click="render()">Click</button></div>',
		link: function(scope,elem,attr){
			// svg dimensions
			var margin = {top: 20, right: 20, bottom: 60, left: 30};
			var w = 700 - margin.left - margin.right,
				h = 500 - margin.top - margin.bottom;
			
			var rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'violet']
			
			// development tools
			var d3 = $window.d3,
				_ = $window._;
			var dataSet = _.map(_.range(6),function(item, index){
				return {
						color: rainbow[index],
						height: Math.floor(Math.random()*100),
						width: 50
				}
			})
			
			function getNewData(){ return _.map(_.range(6),function(item, index){
				return {
						color: rainbow[index],
						height: Math.floor(Math.random()*100),
						width: 50
				}
			})}
			
			
			//transition function
			function simpleTransition (selection){
					selection
						.transition()
						.duration(750)
						.attr('y', function(d){return h-yScale(d.height)})
						.attr('width', function(d){return d.width})
						.attr('x', function(d){
								return Math.floor(xScale(d.color)+margin.left+margin.right)})
						.attr('height', function(d){return yScale( d.height)})
						.style('fill', function(d,i){return d.color})
			}
			
			// render square functions
			scope.render = function (){
					svg.selectAll('rect')
							.data(getNewData())
							.call(simpleTransition)

			}
			console.log(dataSet)
			// set up axis or label data 
			// attatch svg	
			var svg = d3.select('#containerSix').append('svg')
						.attr('width', w + margin.left + margin.right)
						.attr('height', h + margin.top + margin.bottom)
						.append('g')
						.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
			// set up the x scale 			
			var xScale = d3.scale.ordinal()
						.domain(rainbow)
						.rangeBands([0,w-100])
			// set up xAxis			
			var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient('bottom')	
						.ticks(6)
						.innerTickSize(6)
						.outerTickSize(12)
						.tickPadding(12);
			// set up y scale
			var yScale = d3.scale.linear()
						.domain([0,100])
						.range([h,0])
			// set up y axis
			var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')
						.ticks(6)
			// append both axis to the svg
			svg.append('g')
				.attr('class', 'y axis')
				.attr('transform', 'translate(20,0)')
				.call(yAxis);
		
			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(20, ' + (h - 0) + ')')
				.call(xAxis);
			// set data	
			svg.selectAll('rect')
				.data(dataSet)
				.enter()
				.append('rect')
				.attr('y', function(d){return h})
				.attr('width', function(d){return d.width})
				.attr('x', function(d){
						return Math.floor(xScale(d.color)+margin.left+margin.right)})
				.attr('height', function(d){return 0})
				.transition()
				.duration(1000)
				.attr('y', function(d){return h-yScale(d.height)})
				.attr('width', function(d){return d.width})
				.attr('x', function(d){
						return Math.floor(xScale(d.color)+margin.left+margin.right)})
				.attr('height', function(d){return yScale( d.height)})
				.style('fill', 'green')
		}
	}
})