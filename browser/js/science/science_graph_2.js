app.directive("barSchedule", function($parse, $window){
  return {
    restrict: "EA",
    template:"<div class='bar-graph'><svg width='850' height='500'></svg></div>",
    link: function(scope, elem, attrs){
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    var d3 = $window.d3;
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    
    var y = d3.scale.linear()
        .range([height, 0]);
     var rawSvg=elem.find('svg');
    
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");
    
    var svg = d3.select(rawSvg[0]).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    d3.tsv("data.tsv", type, function(error, data) {
      if (error) throw error;
    
      x.domain(data.map(function(d) { return d.letter; }));
      y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
    
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
    
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");
    
      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.letter); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { 
            console.log(y(d.frequency))
            return y(d.frequency); })
          .attr("height", function(d) { 
            console.log(height - y(d.frequency))
            return height - y(d.frequency); });
          
    });
    
    function type(d) {
      d.frequency = +d.frequency;
      return d;
    }
    
    
var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var rawSvg=elem.find('svg');

var d3 = $window.d3;

var color = d3.scale.category10();

var pie = d3.layout.pie()
    .value(function(d) { return d.setOne; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

var svg = d3.select(rawSvg[0]).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.tsv("pieData.tsv", type, function(error, data) {
  console.log(data)
  var path = svg.datum(data).selectAll("path")
      .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) { return color(i+5); })
      .attr("d", arc)
      .each(function(d) { this._current = d; }); // store the initial angles

  d3.selectAll("input")
      .on("change", change);

  var timeout = setTimeout(function() {
    d3.select("input[value=\"setTwo\"]").property("checked", true).each(change);
  }, 500);

  function change() {
    var value = this.value;
    clearTimeout(timeout);
    pie.value(function(d) { return d[value]; }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(400).attrTween("d", arcTween); // redraw the arcs
  }
});

function type(d) {
  console.log(d)
  d.setOne = +d.setOne;
  console.log(d)
  d.setTwo = +d.setTwo;
  return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}

    
    
    
    
    
    
    }

    
  }
});

  