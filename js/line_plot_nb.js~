// InitChart();



function getDataLine(hour, line, station, day){

  switch(day){
    case 7:
      day = today
      console.log("Today " + day);
      break;
    case 8:
      day = today + 1;
        //If today is sunday
        if (day==7){ day = 0; }
      console.log("Tomorrow " + day);
      break
  }
  var file = "../data_vis/data/0"+line+"_data/s"+station+"d0"+day+".csv";

  d3.csv(file, function(error, data) {


      d3.select("#id1S").remove();
      d3.select("#id2S").remove();
      d3.select("#id3S").remove();
      d3.select("#id1N").remove();
      d3.select("#id2N").remove();
      d3.select("#id3N").remove();

      InitChartS(data);
      InitChart(data);
  }) ;

  console.log("Line for LG " + line);
  console.log("Station for LG " + station);
  console.log("Day for LG " + day);
  console.log("Hour for LG " + hour);

}
function InitChart(data) {

    var vis = d3.select("#visualisationNB"),
    WIDTH = 1125,
    HEIGHT = 400,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 16,
        left: 30
    },
    xRange = d3.scale.linear()
    .range([MARGINS.left, WIDTH - MARGINS.right])
    .domain([0,23]),

    yRange = d3.scale.linear()
    .range([HEIGHT - MARGINS.top, MARGINS.bottom])
    .domain([0,100]),


    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(5)
    .orient("left")
    .tickSubdivide(true);


    vis.append("svg:g")
    .attr("class", "x axis")
    .attr("stroke-width", 4)
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

    vis.append("text")      // text label for the x axis
    .attr("class", "x label")
    .attr("x", WIDTH/2-1)
    .attr("y", HEIGHT)
    .style("text-anchor", "middle")
    .text("Time");

    vis.append("svg:g")
    .attr("stroke-width", 4)
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

    vis.append("text")
    .attr("class", "y label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Percentage:");

    var numberOfTicks = 10;

    var yAxisGrid = d3.svg.axis().scale(yRange)
      .ticks(numberOfTicks)
      .tickSize(WIDTH-20, 0)
      .tickFormat("")
      .orient("right");

    var xAxisGrid = d3.svg.axis().scale(xRange)
      .ticks(24)
      .tickSize(-HEIGHT+20, 1)
      .tickFormat("")
      .orient("top");

    vis.append("g")
    .classed('y', true)
    .classed('axis', true)
    .call(yAxisGrid);

    vis.append("g")
    .classed('x', true)
    .classed('axis', true)
    .call(xAxisGrid);

    var line = d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.nHigh);
    })
    .interpolate('linear');

    var line2= d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.nMed);
    })
    .interpolate('linear');

    var line3= d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.nLow);
    })
    .interpolate('linear');


    vis.append("svg:path")
    .datum(data)
    .attr("d", line(data))
    .attr("id", "id1N")
    .attr("stroke", "#af1111")
    .attr("stroke-width", 4)
    .attr("fill", "none");

    vis.append("svg:path")
    .attr("d", line2(data))
    .attr("id", "id2N")
    .attr("stroke", "#dbd823")
    .attr("stroke-width", 4)
    .attr("fill", "none");

    vis.append("svg:path")
    .attr("d", line3(data))
    .attr("id", "id3N")
    .attr("stroke", "#6fb640")
    .attr("stroke-width", 4)
    .attr("fill", "none");

    vis.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "white")
        .attr("r", 4);

    // append the rectangle to capture mouse
    vis.append("rect")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .style("fill", "none")
        .style("pointer-events", "all")
        // .on("mouseover", function() { vis.style("display", null); })
        // .on("mouseout", function() { vis.style("display", "none"); })
        .on("mousemove", mousemove);
    function mousemove() {
        var x0 = xRange.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.hour> d1.hour - x0 ? d1 : d0;

        vis.select("circle.y")
            .attr("transform",
                  "translate(" + xRange(d.hour) + "," +
                                 yRange(d.nHigh) + ")");
    };


    var bisectDate = d3.bisector(function(d) { return d.hour; }).left;
}

function InitChartS(data) {
    var vis = d3.select("#visualisationSB"),
    WIDTH = 1125,
    HEIGHT = 400,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 16,
        left: 30
    },
    xRange = d3.scale.linear()
    .range([MARGINS.left, WIDTH - MARGINS.right])
    .domain([0,23]),

    yRange = d3.scale.linear()
    .range([HEIGHT - MARGINS.top, MARGINS.bottom])
    .domain([0,100]),


    xAxis = d3.svg.axis()
      .scale(xRange)
      .tickSize(5)
      .tickSubdivide(true),

    yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(5)
    .orient("left")
    .tickSubdivide(true);

    vis.append("svg:g")
    .attr("class", "x axis")
    .attr("stroke-width", 4)
    .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
    .call(xAxis);

    vis.append("text")      // text label for the x axis
    .attr("class", "x label")
    .attr("x", WIDTH/2-1)
    .attr("y", HEIGHT)
    .style("text-anchor", "middle")
    .text("Time");

    vis.append("svg:g")
    .attr("stroke-width", 4)
    .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

    vis.append("text")
    .attr("class", "y label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text("Percentage:");

    var numberOfTicks = 10;

    var yAxisGrid = d3.svg.axis().scale(yRange)
      .ticks(numberOfTicks)
      .tickSize(WIDTH-20, 0)
      .tickFormat("")
      .orient("right");

    var xAxisGrid = d3.svg.axis().scale(xRange)
      .ticks(24)
      .tickSize(-HEIGHT+20, 1)
      .tickFormat("")
      .orient("top");

    vis.append("g")
    .classed('y', true)
    .classed('axis', true)
    .call(yAxisGrid);

    vis.append("g")
    .classed('x', true)
    .classed('axis', true)
    .call(xAxisGrid);

    var line = d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.sHigh);
    })
    .interpolate('linear');

    var line2= d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.sMed);
    })
    .interpolate('linear');

    var line3= d3.svg.line()
    .x(function (d) {
        return xRange(d.hour);
    })
    .y(function (d) {
        return yRange(d.sLow);
    })
    .interpolate('linear');


    vis.append("svg:path")
    .datum(data)
    .attr("d", line(data))
    .attr("id", "id1S")
    .attr("stroke", "#af1111")
    .attr("stroke-width", 4)
    .attr("fill", "none");

    vis.append("svg:path")
    .attr("d", line2(data))
    .attr("id", "id2S")
    .attr("stroke", "#dbd823")
    .attr("stroke-width", 4)
    .attr("fill", "none");

    vis.append("svg:path")
    .attr("d", line3(data))
    .attr("id", "id3S")
    .attr("stroke", "#6fb640")
    .attr("stroke-width", 4)
    .attr("fill", "none");

    vis.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "white")
        .attr("r", 4);

    // append the rectangle to capture mouse
    vis.append("rect")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .style("fill", "none")
        .style("pointer-events", "all")
        // .on("mouseover", function() { vis.style("display", null); })
        // .on("mouseout", function() { vis.style("display", "none"); })
        .on("mousemove", mousemove);
    function mousemove() {
        var x0 = xRange.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.hour> d1.hour - x0 ? d1 : d0;

        vis.select("circle.y")
            .attr("transform",
                  "translate(" + xRange(d.hour) + "," +
                                 yRange(d.sHigh) + ")");
    };


    var bisectDate = d3.bisector(function(d) { return d.hour; }).left;
}
