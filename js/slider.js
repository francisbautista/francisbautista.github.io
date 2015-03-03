


formatDate = d3.time.format("%I:%M %p");
// parameters
var margin = {
    top: 0,
    right: 30,
    bottom: 0,
    left: 30
  },
  width = 1140 - margin.left - margin.right,
  height = 100 - margin.bottom - margin.top;


// scale function

// var a = new Date('2014-01-01 00:00:00');
// var b =  new Date('2014-01-01 23:59:59');


var day = moment(4 * 60000);
console.log(a);


var temp = moment([2014, 01, 01, 15, 00, 00, 00]).format("h:mm a");
console.log(temp);

var a = moment([2015, 01, 01, 00, 00, 00, 00]); //start
var b =  moment([2015, 01, 01, 23, 59, 00, 00]); //end
var def_time = moment([2015, 01, 01, 7, 00, 00, 00]);

var timeScale = d3.time.scale()
  .domain([a, b])
 //.domain([0, 24])
  .range([0, width])
  .clamp(true);


//initial value

// var startValue = new Date('2014-01-01 00:00:00');
// startingValue = new Date('2014-01-01 00:00:00');

var startValue = timeScale(a);
var startingValue = def_time;

// var startValue = timeScale(9);
// startingValue = 9;

//////////

var startValue = timeScale(a);
var startingValue = def_time;
// defines brush
var brush = d3.svg.brush()
  .x(timeScale)
  .extent([startingValue, startingValue])
  .on("brush", brushed);

var svg = d3.select("#slider7").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  // classic transform to position g
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
  .attr("class", "x axis")
// put in middle of screen
.attr("transform", "translate(0," + height / 2 + ")")
// inroduce axis
.call(d3.svg.axis()
  .scale(timeScale)
  .orient("bottom")
  .tickFormat(function(d) {
    return formatDate(d);
   //return d
  })
  .tickSize(0)
  .ticks(d3.time.hour,4)
  .tickPadding(12)
  //.tickValues([timeScale.domain()[0], timeScale.domain()[1]]))
  .tickValues(timeScale.ticks(10).concat( timeScale.domain() )))
  .select(".domain")
  .select(function() {
    return this.parentNode.appendChild(this.cloneNode(true));
  })
  .attr("class", "halo");





var slider = svg.append("g")
  .attr("class", "slider")
  .call(brush);

slider.selectAll(".extent,.resize")
  .remove();

slider.select(".background")
  .attr("height", height);

var handle = slider.append("g")
  .attr("class", "handle")

handle.append("path")
  .attr("transform", "translate(0," + height / 2 + ")")
  .attr("d", "M 0 -20 V 20")

handle.append('text')
  .text(startingValue.format('h:mm a'))
  //.text(startingValue)
  .attr("transform", "translate(" + (-18) + " ," + (height / 2 - 25) + ")");

slider.call(brush.event)

function brushed() {
  var value = brush.extent()[0];
  //var value_hour = value.hours();


  if (d3.event.sourceEvent) { // not a programmatic event
    value = timeScale.invert(d3.mouse(this)[0]);
    brush.extent([value, value]);
  }


  handle.attr("transform", "translate(" + timeScale(value) + ",0)");
  handle.select('text').text(formatDate(value));


    var hour = value.getHours();
   console.log("Brush " + value);
    updatePieChart(hour, line, station, day);
    getDataLine(hour, line, station, day);
    //updatePieChartSB(hour, line, station, day);
}









//hour = brushed();

//LIFE SAVER
//http://bl.ocks.org/zanarmstrong/ddff7cd0b1220bc68a58
//http://bl.ocks.org/mbostock/6452972
