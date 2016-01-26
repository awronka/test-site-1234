app.directive('bookFive', function($window){
    return{
        restrict: "EA",
        scope: {},
        template: '<div id="book-five-chart"></div>',
        link: function(scope, elem, attrs){
            var d3 = $window.d3;
            
            
            function draw(data){
                var width = 800,
                    height = 800;
               
               var svg = d3.select('#book-five-chart')
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height)
                            
               var node = svg.selectAll('circle.node')
                            .data(data.nodes)
                            .enter()
                            .append('circle')
                                .attr('class', 'node')
                                .attr('r', 12)
               var link = svg.selectAll('line.link')
                            .data(data.links)
                            .enter()
                            .append('line')
                            .style('stroke','black')
                            
               var force = d3.layout.force()
                            .charge(-120)
                            .linkDistance(10)
                            .size([width,height])
                            .nodes(data.nodes)
                            .links(data.links)
                            .start();
               
               force.on('tick', function(){
                   link.attr('x1', function(d){return d.source.x})
                       .attr('y1', function(d){return d.source.y})
                       .attr('x2', function(d){return d.target.x})
                       .attr('y2', function(d){return d.target.y})
                       
                               node.attr('cx', function(d){return d.x})
                    .attr('cy', function(d){return d.y})
                   
               })
               

               
               node.call(force.drag)
            }
            
            
            
            d3.json('/data/stations_graph.json', draw)
        }
    }
    
})