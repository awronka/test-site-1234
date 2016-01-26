app.directive('unemploymentMap', function($window, $parse){
	return {
		retstrict: "EA",
		template: '<div id="unemployment"></div>',
		link: function (scope, elem, attr){
			
			var width = 960,
				height = 600;
			
			var d3 = $window.d3,
				queue = $window.queue,
				topojson = $window.topojson;
			
			var rateById = d3.map();
			
			var quantile = d3.scale.quantile()
				.range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
			
			var projection = d3.geo.albersUsa()
				.scale(1280)
				.translate([width / 2, height / 2]);
			
			var path = d3.geo.path()
				.projection(projection);
			
			var svg = d3.select("#unemployment").append("svg")
				.attr("width", width)
				.attr("height", height);
			
			queue()
				.defer(d3.json, "data/us.json")
				.defer(d3.tsv, "unemployment.tsv", function(d) { rateById.set(d.id, +d.rate); })
				.await(ready);
			
			function ready(error, us) {
			if (error) throw error;
			
			quantile.domain(rateById.values());
			
			svg.append("g")
				.attr("class", "counties")
				.selectAll("path")
				.data(topojson.feature(us, us.objects.counties).features)
				.enter().append("path")
				.transition().delay(function(d, i) {return  i *5; }).duration(500)
				.attr("class", function(d) { return quantile(rateById.get(d.id)); })
				.attr("d", path);
			
			svg.append("path")
				.datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
				.attr("class", "states")
				.attr("d", path);
			}
			
			d3.select('#unemployment').style("height", height + "px");
			
			
			
		}
	}
})