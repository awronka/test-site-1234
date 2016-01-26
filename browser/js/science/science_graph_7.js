app.directive('graphSeven', function($window, $parse){
	return {
		restrict: "EA",
		templateUrl: 'js/science/graphSeven.html',
		link: function(scope,elem,attrs){
			console.log("hit")
			var d3 = $window.d3;
			var _ = $window._;
			
			//characters
			var characters = ["Blanka","Dhalsim","Zangief","Ryu","Ken","Chun Li","Guile","E. Honda"]
			console.log("characters")
			// set up random data set
			function createData(){
				return _.map(_.range(8), function(d, index){
					return {
							games: Math.floor(Math.random()*10),
							char: characters[index],
							wins: Math.floor(Math.random()*100)
					}
				});
			}
			
			var margin = {top: 20, right: 20, bottom: 60, left: 30};
			var h = 600,
				w = 600,
				radius = Math.min(w, h) / 2;
			
			var initialData = createData();
			
			var color = d3.scale.category20b()
			var size = 680;
 			var r = size/8;

			var svg = d3.select('#containerSeven').append('svg')
						.attr('height', h)
						.attr('width', w)			 
						.append('g')
						.attr('transform', 'translate('+(h/2)+','+(w/2)+')')
			
			  var radiusScale = d3.scale.sqrt()
					.domain([0, d3.max(initialData,
					 function(d){ 
						 console.log(d.games)
						 return d.games })])
					.range([0, 200]);
			
			// set up arc
			var arc = d3.svg.arc()
					.outerRadius(function(d){ 
						return r + radiusScale(d.data.games) })
					.innerRadius(50);
			
			//set up the pie
			var pie = d3.layout.pie()
					.sort(null)
					.startAngle(1.1*Math.PI)
					.endAngle(3.1*Math.PI)
					.value(function(d){return d.wins})
						
			// initial set up
			var g = svg.selectAll('.arc')
					.data(pie(initialData))
					.enter().append('g')
					.attr('class', 'arc')
					g.append('path')
					.style('fill', 
					function(d,i){
						console.log(color(i+1))
						return color(i+1)})
				    .transition().delay(function(d, i) { return  500; }).duration(500)
						.attrTween('d', function(d) {
							var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
							return function(t) {
								d.endAngle = i(t);
								return arc(d);
							}
					})
					.transition()
					.style('fill', function(d,i){
						console.log(color(i))
						return color(i)})
						
		scope.newData = createData();
		scope.update = function(data){
			var path = svg.selectAll('path')
				path
					.transition()
					.style('fill', function(d,i){return color(i+Math.floor(Math.random()*10)+Math.floor(Math.random()*10))})
		}
		
		var newRadiusScale = d3.scale.sqrt()

					
		}
	}
})
