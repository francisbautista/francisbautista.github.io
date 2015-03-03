var w = 300;
var h = 300;
var r = h/2;

var color = d3.scale.ordinal()
  .domain(["High", "Medium", "Low"])
  .range(["#af1111","#dbd823","#6ba351"]);

var data = [{"label":"High", "value":20}, 
              {"label":"Medium", "value":50}, 
              {"label":"Low", "value":30}];


var vis = d3.select('#chart_sb')
            .append("svg:svg")
            .data([data])
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(" + r + "," + r + ")");
var pie = d3.layout.pie().value(function(d){return d.value;});

// declare an arc generator function
//var arc = d3.svg.arc().outerRadius(r);

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
    return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) 
    {
        //return data[i].label+" "+data[i].value+"%";
        return data[i].value+"%";
    }
    );

//Center Text
vis.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("fill", "rgba(255,255,255,0.85)")
      .attr("class", "inside_sb")
      .text(function(d) { return 'SB'; });