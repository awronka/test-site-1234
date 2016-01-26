app.directive('bookSix', function ($window){
    return {
        restrict:"EA",
        scope:{},
        template: '<div id="book-six-chart"></div>',
        link: function(scope,elem,attrs){
            
            var d3 = $window.d3;
            
            d3.json('/data/interarrival_times.json', function(err,data){
   console.log(data)
        "use strict";
        var width = 800,
            height = 900,
            margin = 50;
                
        var stack = d3.layout.stack()
        
        var bar_width = 2.2,
            bar_max = 23;
        
        var histogram = d3.layout.histogram()
            .bins(d3.range(1.5,bar_max,bar_width))
            .frequency(false)
        
        var lines = data.map(function(d){return "Line_" + d.route_id});
        
        var counts = data.map(
            function(d){
                return histogram(d.interarrival_times)
            }
        );
                
        function nested_stat(d, stat, accessor){
            return stat(counts, function(d){
                return stat(d.map(accessor))
            })
        }
        
        var max_count = 2
        var count_scale = d3.scale.linear()
            .domain([0, max_count]) 
            .range([height-margin, margin])
            .nice();
        
        var x_scale = d3.scale.linear()
            .domain([
                nested_stat(counts, d3.min, function(di){return di.x}), 
                nested_stat(counts, d3.max, function(di){return di.x})
            ]) 
            .range([margin, width])
        var xaxis = d3.svg.axis().scale(x_scale),
            yaxis = d3.svg.axis().scale(count_scale).orient('left');
                        
        var svg = d3.select('#book-six-chart')
          .append('svg')
            .attr('width', width)
            .attr('height', height);
            
        var color = d3.scale.category20b()
          var k = 0;  
        svg.selectAll('g')
          .data(stack(counts))
          .enter()
          .append('g')
          .attr('class',function(d,i){return  lines[i]})
          .selectAll('rect')
          .data(function(d){return d})
          .enter()
          .append('rect')
            .attr('x',function(d){return x_scale(d.x) })
            .attr('y',function(d){return count_scale(d.y) - (height - margin - count_scale(d.y0))})
            .attr('width', function(d){return x_scale(d.x + d.dx) - x_scale(d.x)})
            .attr('height', function(d){return height - margin - count_scale(d.y)})
            .attr('fill', function(d,i){ if(i===0)k++; console.log(color(k)); return color(k)})
        
            
           
        
        svg.append('g').attr('transform','translate(0,' + (height-margin) + ')').call(xaxis)
        
        svg.append('text').attr('x',x_scale(10)).attr('y', height - margin/5).text('scheduled wait time (minutes)')
                
            })
            
        }
    }
})