app.directive("graphFive", function($window, $parse,$http){
	return {
		restrict: "EA",
		templateUrl: "js/science/graphFive.html",
		link: function(scope, attrs, elem){
			//set up d3
			var d3 = $window.d3;
			var _ = $window._;
			//attach svg
			var w = 300;
			var h = 200;
			var path;
			var subjects;

		$http.get('//jsbin.com/vegaqi/1.js').then(function (json) {
			console.log("this is the return value",json.data)
			console.log("This is the window", $window)
					subjects = json.data;
				
					_.keys(subjects).forEach(function (subject) {
					subjects[subject].forEach(function (d) {
						d.date = d3.time.format("%Y%m%d").parse(d.date);
					});
					});
				
					path = d3
					.select('#graphfive')
					.append('svg')
					.attr('width', '100%')
					.attr('height', '100%')
					.append('g')
					.append('path');
				
					scope.updateChart('math');
				});
		
			scope.updateChart = function (subject) {
				var data = subjects[subject];
				var dates = _.pluck(data, 'date');
				var counts = _.pluck(data, 'count');
			
				var x = d3.time.scale()
				.domain(d3.extent(dates))
				.range([0, w]);
			
				var y = d3.scale.linear()
				.domain(d3.extent(counts))
				.range([h, 0]);
			
				var area = d3.svg.area()
				.interpolate('bundle')
				.x(function (d) {
					return x(d.date);
				})
				.y0(function (d) {
					return y(0);
				})
				.y1(function (d) {
					return y(d.count);
				});
			
				path
				.datum(data)
				.transition()
				.duration(450)
				.attr('d', area);
			}
		}
	}
});