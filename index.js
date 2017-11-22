var svg = d3.select("svg"),
    margin = {top: 0, right: 0, bottom: 30, left: 0},
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
    .attr('x', width - 700)
    .attr('y', function(d, i){ return (i *  30) + 165;})
    .text(function(d){ return d.id; })
    .attr("font-size", 10);

  waarde.append("rect")
    .attr('x', width - 730)
    .attr('y', function(d, i){ return (i *  30) + 150;})
    .attr('width', 20)
    .attr('height', 20)
    .style('fill', function(d) {
      return z(d.id);
    });

// append a g for all the mouse over nonsense
var mouseG = svg.append("g")
  .attr("class", "mouse-over-effects");

// this is the vertical line
mouseG.append("path")
  .attr("class", "mouse-line")
  .style("stroke", "black")
  .style("stroke-width", "1px")
  .style("opacity", "0");

// keep a reference to all our lines
var lines = document.getElementsByClassName('line');

// here's a g for each circle and text on the line
var mousePerLine = mouseG.selectAll('.mouse-per-line')
  .data(waarden)
  .enter()
  .append("g")
  .attr("class", "mouse-per-line");

// the circle
mousePerLine.append("circle")
  .attr("r", 7)
  .style("stroke", function(d) {
    return z(d.id);
  })
  .style("fill", "none")
  .style("stroke-width", "1px")
  .style("opacity", "0");

// the text
mousePerLine.append("text")
  .attr("transform", "translate(10,3)");

// rect to capture mouse movements
mouseG.append('svg:rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'none')
  .attr('pointer-events', 'all')
  .on('mouseout', function() { // on mouse out hide line, circles and text
    d3.select(".mouse-line")
      .style("opacity", "0");
    d3.selectAll(".mouse-per-line circle")
      .style("opacity", "0");
    d3.selectAll(".mouse-per-line text")
      .style("opacity", "0");
  })
  .on('mouseover', function() { // on mouse in show line, circles and text
    d3.select(".mouse-line")
      .style("opacity", "1");
    d3.selectAll(".mouse-per-line circle")
      .style("opacity", "1");
    d3.selectAll(".mouse-per-line text")
      .style("opacity", "1");
  })
  .on('mousemove', function() { // mouse moving over canvas
    var mouse = d3.mouse(this);

    // move the vertical line
    d3.select(".mouse-line")
      .attr("d", function() {
        var d = "M" + mouse[0] + "," + height;
        d += " " + mouse[0] + "," + 0;
        return d;
      });

    // position the circle and text
    d3.selectAll(".mouse-per-line")
      .attr("transform", function(d, i) {
        console.log(width/mouse[0])
        var xDate = x.invert(mouse[0]),
            bisect = d3.bisector(function(d) { return d.date; }).right;
            idx = bisect(d.values, xDate);

        // since we are use curve fitting we can't relay on finding the points like I had done in my last answer
        // this conducts a search using some SVG path functions
        // to find the correct position on the line
        // from http://bl.ocks.org/duopixel/3824661
        var beginning = 0,
            end = lines[i].getTotalLength(),
            target = null;

        while (true){
          target = Math.floor((beginning + end) / 2);
          pos = lines[i].getPointAtLength(target);
          if ((target === end || target === beginning) && pos.x !== mouse[0]) {
              break;
          }
          if (pos.x > mouse[0])      end = target;
          else if (pos.x < mouse[0]) beginning = target;
          else break; //position found
        }

        // update the text with y value
        d3.select(this).select('text')
          .text(y.invert(pos.y).toFixed(2));

        // return position
        return "translate(" + mouse[0] + "," + pos.y +")";
      });
  });

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

d3.text('data2.csv').mimeType('text/plain;charset=iso88591').get(onload);

/*The .csv file is cleaned by getting rid of the header, the semicolons are replaced with commas.
The words 'number' and the actual numbers (e.g. 1.4) are effectively removed by replacing them with nothing*/

function onload(err, doc) {
  if (err) throw err;
     var header = doc.indexOf('TJ')
    var end = doc.indexOf('\n', header)
    doc = doc.slice(end).trim()
    doc = doc.replace(/number/g, '')
    doc = doc.replace(/;/g, ',')
    doc = doc.replace(/\d\.\d /g, '') /*Thanks @wooorm*/

/*I'm storing the cleaned data in var cleanedData, each column from the dataset gets its own key.*/

    var cleanedData = d3.csvParseRows(doc, map)
    function map(d) {
    return {
      source: d[0],
      year: Number(d[2]),
      amount: Number(d[3])
    }
  }

/*The footer is taken out of cleanedData, preventing an empty object from being returned.*/

    var cyaFooter = cleanedData.indexOf('� Statistics Netherlands, Den Haag/Heerlen 11-10-2017');
    var remove = cleanedData.splice(cyaFooter); /*Thanks @DesleyAalderink*/

    console.log(cleanedData)

var svgCountry = d3.select(".country"),
margin3 = {top: 50, right: 20, bottom: 0, left: 40},
width3 = +svgCountry.attr("width") - margin3.left - margin3.right,
height3 = +svgCountry.attr("height") - margin3.bottom - margin3.top,
radius = Math.min(width3, height3) / 2,
g3 = svgCountry.append("g").attr("transform", "translate(" + width3 / 2 + "," + height3 / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.amount; });

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius + 10)
    .innerRadius(radius + 10);

/*1997 is the default option (upon landing) so I'm filtering the cleaned data to all entries belonging to 1997.*/

var cleanedDatatime = cleanedData.filter(function(d) { return d.year == "2010" })

/*This is where the pie and its labels are made.*/

var arc = g3.selectAll(".arc")
    .data(pie(cleanedDatatime))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.amount); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.source.concat(": ", d.data.amount, " terajoule"); });

/*Now we listen to the second dropdown, the one for the pie chart, and run onchangeTime when anything is changed.*/

d3.select('.selectyear').on('change', onchangeTime);

function onchangeTime(){
            field2 = this.value;

            /*I'm filtering the cleaned data to the entries with the year that's selected in the dropdown. I'm also making sure that
            entries with no local flights are filtered out, to prevent 'empty slices' from being created.*/

            var cleanedDatatime2 = cleanedData.filter(function(d) { return d.year == field2 && Number(d.amount) != 0 })

            /*The currently existing pie slices are removed, new ones are created with the newly filtered data.*/

            g3.selectAll(".arc").remove()


            var arc2 = g3.selectAll(".arc")
            .data(pie(cleanedDatatime2))
            .enter().append("g")
            .attr("class", "arc")

            arc2.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.amount); });

            arc2.append("text")
            .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
            .attr("dy", "0.35em")
            .text(function(d) { return d.data.source.concat(": ", d.data.amount, " terajoule"); });
    }

};

function type(d, _, columns) {
  d.jaar = parseTime(d.jaar);
  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
  return d;
}

