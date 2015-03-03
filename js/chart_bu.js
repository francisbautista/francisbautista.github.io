var w = 300;
var h = 300;
var r = h/2;


//var color = d3.scale.category20b();

var color = d3.scale.ordinal()
  .domain(["High", "Medium", "Low"])
  .range(["#af1111","#dbd823","#6ba351"]);

function pieSketch(hour){

d3.csv("../data_vis/output/station_day_summary/s0d01_nospace.csv",
  function(data) {
    var filtered =  data.filter(function(d) {return d["hour"]==hour });
    var dataset = filtered.map(function(d) {
       return [ +d["nHigh"], +d["nMed"], + d["nLow"] ];
    });
<<<<<<< HEAD

=======
>>>>>>> 1e9930d9db16093dc2b0d722c5b9b1ce99078752
    piePlotter(dataset[0]);
});

}


function piePlotter(dataset){

  var data = [{"label":"High", "value": dataset[0]},
              {"label":"Medium", "value":dataset[1]},
              {"label":"Low", "value":dataset[2]}];

  var vis = d3.select('#chart')
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");

  var pie = d3.layout.pie().value(function(d){return d.value;});

  // declare an arc generator function
  var arc = d3.svg.arc()
      .innerRadius(r/2)
      .outerRadius(r);

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
      });

  // add the text
  arcs.append("svg:text").attr("transform", function(d){
        d.innerRadius = 0;
        d.outerRadius = r;
      return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
      return data[i].value+"%";}
      );
  //Center Text
  vis.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", "rgba(255,255,255,0.85)")
        .attr("class", "inside_nb")
        .text(function(d) { return 'NB'; });

}


//MAIN


pieSketch(hour);
