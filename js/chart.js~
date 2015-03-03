var w = 300;
var h = 300;
var r = h/2;
var now = moment().hour();
var today = moment().day() - 1;


//var color = d3.scale.category20b();

var color = d3.scale.ordinal()
  .domain(["High", "Medium", "Low"])
  .range(["#af1111","#dbd823","#6ba351"]);

var pie = d3.layout.pie().value(function(d){return d.value;});

var arc = d3.svg.arc()
    .innerRadius(r/2)
    .outerRadius(r);

function init(hour, line, station, day){

  var file = "../data_vis/data/0"+line+"_data/s"+station+"d0"+day+".csv"
   d3.csv(file,
    function(data) {
      var filtered =  data.filter(function(d) {return d["hour"]==hour });
      var dataset = filtered.map(function(d) {
         return [ +d["sHigh"], +d["sMed"], + d["sLow"] ];
      });

      var dataset_sb = filtered.map(function(d) {
         return [ +d["nHigh"], +d["nMed"], + d["nLow"] ];
      });

      piePlotter(dataset[0]);
      piePlotter_SB(dataset_sb[0]);

      console.log("Line " + line);
      console.log("Station " + station);
      console.log("Day " + day);
      console.log("Hour " + hour);

    });

}


function getData(hour, line, station, day, div, fn){

  var days = [0,1,2,3,4,5,6];


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



   d3.csv(file,
    function(data) {

      var filtered =  data.filter(function(d) {
        return d["hour"]==hour;
      });
      var dataset = filtered.map(function(d) {
         return [ +d["sHigh"], +d["sMed"], + d["sLow"] ];
      });

      var dataset_sb = filtered.map(function(d) {
         return [ +d["nHigh"], +d["nMed"], + d["nLow"] ];
      });

      if (div=="#chart"){
        fn(dataset[0]);
      }
      else {
        fn(dataset_sb[0]);
      }


    });

}




function piePlotter(dataset){

  var data = [{"label":"High", "value": dataset[0]},
              {"label":"Medium", "value":dataset[1]},
              {"label":"Low", "value":dataset[2]}];

  var vis = d3.select("#chart")
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");


  // select paths, use arc generator to draw
  var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");

  arcs.append("svg:path")
      .attr("fill", function(d, i){
          return color(i);
      })
      .attr("d", function (d) {
          // log the result of the arc generator to show how cool it is :)
          console.log(arc(d));
          return arc(d);
      })
      .each(function(d){ this._current = d; })
          .append('title')
          .text(function(d,i){ return data[i].value + '%'; });

  // render the labels
  arcs.append("svg:text")
      .attr("transform", function(d){
          return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d,i){
          return data[i].value+"%";
      });

  //Center Text
  vis.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", "rgba(255,255,255,0.85)")
        .attr("class", "inside_nb")
        .text(function(d) { return 'NB'; });

}

function piePlotter_SB(dataset){

  var data = [{"label":"High", "value": dataset[0]},
              {"label":"Medium", "value":dataset[1]},
              {"label":"Low", "value":dataset[2]}];

  var vis = d3.select("#chart_sb")
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");


  // select paths, use arc generator to draw
  var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");

  arcs.append("svg:path")
      .attr("fill", function(d, i){
          return color(i);
      })
      .attr("d", function (d) {
          // log the result of the arc generator to show how cool it is :)
          console.log(arc(d));
          return arc(d);
      })
      .each(function(d){ this._current = d; })
          .append('title')
          .text(function(d,i){ return data[i].value + '%'; });

  // render the labels
  arcs.append("svg:text")
      .attr("transform", function(d){
          return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d,i){
          return data[i].value+"%";
      });

  //Center Text
  vis.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", "rgba(255,255,255,0.85)")
        .attr("class", "inside_sb")
        .text(function(d) { return 'SB'; });

}



function updatePieChart(hour, line, station, day)
{
    console.log("Line " + line);
    console.log("Station " + station);
    console.log("Day " + day);
    console.log("Hour " + hour);
    updateArcs(hour, line, station, day,
      "#chart");
updateLabels(hour, line, station, day, "#chart");

    updateArcs(hour, line, station, day,
      "#chart");

    updateArcs(hour, line, station, day, "#chart_sb");

    updateLabels(hour, line, station, day, "#chart_sb");
}


// update the slices of the pie chart
function updateArcs(hour, line, station, day, div)
{

  getData(hour, line, station, day, div, function(data){
      console.log(data);

      var data =  [{"label":"High", "value": data[0]},
                {"label":"Medium", "value":data[1]},
                {"label":"Low", "value":data[2]}];

      console.log("Low " + data[2].value);

      d3.selectAll(div + " path title")
        .text(function(d,i){ return data[i].value + '%'; });

      d3.selectAll(div + " path")
        .data(pie(data))
        .transition()
            .duration(700)
            .attrTween('d', arcTween);

    });
}


// update the labels of the pie chart
function updateLabels(hour, line, station, day, div)
{
   getData(hour, line, station, day, div, function(data){
     var data =  [{"label":"High", "value": data[0]},
        {"label":"Medium", "value":data[1]},
        {"label":"Low", "value":data[2]}];

    d3.selectAll(div + " text")
        .data(pie(data))
        .transition()
            .duration(700)
            .attr("transform", function(d){
                return "translate(" + arc.centroid(d) + ")";
            })
            .text(function(d,i){
                return data[i].value+"%";
            });

  });
}

// transition for the arcs
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}
