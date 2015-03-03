//GLOBAL VALUES
var line = 0;
var station = 0;
var day = 0;
var hour = 7;

//function getData(hour, line, station, day, fn)

init(hour, line, station, day);
getDataLine(hour, line, station, day);
// init_sb(hour);

function reset(){
	var line = 0;
	var station = 0;
	var day = 0;
	var hour = 7;
	updatePieChart(hour, line, station, day)
}


//GLOBAL VALUES