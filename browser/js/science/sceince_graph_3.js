app.directive("thirdDeeThreeGraph", function($parse, $window){
	return {
		restrict: "EA",
		template: "<div class='bar-graph' id='svg-container'></div>",
		link: function(scope, elem, attrs){
			var margin = {top: 30, left: 20, bottom: 20, right:  30}
			var exp= $parse(attrs.graphData)
			var data = exp(scope);
			var svgHeight = 500,
				svgWidth = 700;
			
			//d3 set up
			var svg = d3.select('#svg-container').append('svg')
				.attr('width', svgWidth)
				.attr('height', svgHeight)
			var d3 = $window.d3;
			var x = d3.scale.ordinal()
       	    .rangeRoundBands([0, svgWidth], .1);
			var scale = d3.scale.linear()
				.domain([0,100])
				.range([0, 700])

		   var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");
			 
			
			function render(data, color){
				// bind data
				var rects = svg.selectAll('rect').data(data);
				// enter
				x.domain(data.map(function(d) { return d.year; }));
				
				svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (svgHeight) + ")")
				.call(xAxis);
				
				rects.enter().append("rect")
					.attr('x', function(d, index){
						console.log((index+5)*10)
						return 70*index})
					.attr('y', function(d){return svgHeight-d.grossSales/1000*5})
					.attr('width', 50);

				//update
				rects
					.attr('height', function(d){return d.grossSales/1000*5})
					.attr('fill', color);
				//exit
				rects.exit().remove();
			 }
			 render(data, "blue");
		}
	}
	
})