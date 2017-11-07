var svg = d3.select("svg"),
    margin = {top: 20, right: 80, bottom: 30, left: 50},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal().range(["#960038", "#4c9d49", "#ffc100"]);

var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.jaar); })
    .y(function(d) { return y(d.prijs); });

d3.csv("data.csv", type, function(error, data) {
  if (error) throw error;

  var waarden = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {jaar: d.jaar, prijs: d[id]};
      })
    };
  });

  x.domain(d3.extent(data, function(d) { return d.jaar; }));

  y.domain([
    d3.min(waarden, function(c) { return d3.min(c.values, function(d) { return d.prijs; }); }),
    d3.max(waarden, function(c) { return d3.max(c.values, function(d) { return d.prijs; }); })
  ]);

  z.domain(waarden.map(function(c) { return c.id; }));

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Prijs in $, Aantal zonnepanelen x1000");

  var waarde = g.selectAll(".waarde")
    .data(waarden)
    .enter().append("g")
      .attr("class", "waarde");

  waarde.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return z(d.id); });

  waarde.append("text")
      .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.jaar) + "," + y(d.value.prijs) + ")"; })
      .attr("x", 3)
      .attr("dy", "-1em")
      .attr("dx", "-6em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });

});

var svg2 = d3.select(".stellingen"),
    margin2 = {top: 20, right: 200, bottom: 30, left: 550},
    width2 = +svg2.attr("width") - margin2.left - margin2.right,
    height2 = +svg2.attr("height") - margin2.top - margin2.bottom,
    g2 = svg2.append("g").attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var y2 = d3.scaleBand()
    .rangeRound([0, height2])
    .paddingInner(.4)
    .align(0.1);

var x2 = d3.scaleLinear()
    .rangeRound([0, width2]);

var z2 = d3.scaleOrdinal()
    .range(["#960038", "#ff0000", "#ffc100",  "#4c9d49", "#005b00", "#888"]);

d3.csv("data3.csv", function(d, i, columns) {
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}, function(error, data2) {
  if (error) throw error;

  var keys = data2.columns.slice(1);

  data2.sort(function(a, b) { return b.total - a.total; });
  y2.domain(data2.map(function(d) { return d.Stelling; }));
  x2.domain([0, d3.max(data2, function(d) { return d.total; })]).nice();
  z2.domain(keys);

  g2.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data2))
    .enter().append("g")
      .attr("fill", function(d) { return z2(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
      .attr("y", function(d) { return y2(d.data.Stelling); })
      .attr("x", function(d) { return x2(d[0]); })
      .attr("width", function(d) { return x2(d[1]) - x2(d[0]); })
      .attr("height", y2.bandwidth());

  g2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,0)")
      .call(d3.axisLeft(y2));

  g2.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0,"+height2+")")
      .call(d3.axisBottom(x2).tickFormat(d => d + "%"))
    .append("text")
      .attr("y", 2)
      .attr("x", x2(x2.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "end")
      .attr("transform", "translate("+ (-width2) +",-30)");

  var legend = g2.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
     .attr("transform", function(d, i) { return "translate(150," + (150 + i * 20) + ")"; });

  legend.append("rect")
      .attr("x", width2 - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z2);

  legend.append("text")
      .attr("x", width2 - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

});

function type(d, _, columns) {
  d.jaar = parseTime(d.jaar);
  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
  return d;
}

