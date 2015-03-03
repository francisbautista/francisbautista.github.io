



$('select[name=line_select]').change(function() {
	line = this.value;
	parseData("data/line_stations_fixed.csv", getStations);	
	
});

function getStations(data) {
	var result_obj = $.grep(data, function(e){ return e.lineID == line; });
	var result_json = [];
		for (var i in result_obj){
			x = JSON.stringify(result_obj[i])
			result_json.push(x);
		}
	optionWriter(result_obj);

}

function getEdsaStations() {
	var result_obj = $.grep(data, function(e){ return e.lineID == 0; });
	var result_json = [];
		for (var i in result_obj){
			x = JSON.stringify(result_obj[i])
			result_json.push(x);
		}
	optionWriter(result_obj);

}

function optionWriter(result){
	$('select[name=station_select]').empty();

	var station_select = $('select[name=station_select]'); 
	station_select.append('<option value="'+""+'">'+"Select Station"+'</option>');
	$.each(result, function(key, value) {   
	     station_select
	         .append($("<option></option>")
	         .val(value.stationID)
	         .text(value.stationName)
	         .data("name",value.stationName)); 
	});

	// $.each(result, function (index, value) {
	// 	//console.log(value);
	//     station_select.append('<option value="'+value.stationID+'">'+value.stationName+'</option>');
	// });

}

function parseData(url, callBack) {
	
    Papa.parse(url, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            callBack(results.data);
        }
    });
}






// sed -e 's/,\s\+/,/g' s5d03.csv > s5d03_nospace.csv

