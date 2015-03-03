/*
Authors: Francis Bautista and Eyana Mallari
Description: Data visualization of historical traffic data to give percentage predictions of traffic volumes.
Created At: February 28, 2015
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

$('#myonoffswitch').change(function(){
	 if (this.checked){
		$('#visualisationNB').fadeToggle("slow");
		$('#visualisationSB').hide();
	}
	else {
		$('#visualisationSB').fadeToggle("slow");
		$('#visualisationNB').hide();
	}

});

var line = $('select[name=line_select]').val();
var station = $('select[name=station_select]').val();
var day = $('button').data('int');

$(function() {
	//hour = brush.extent()[0].getHours();

	console.log(brush.extent()[0]);
	console.log(brush.extent()[0].toDate());

    $("span.line_name").html("Edsa").show();
    $("span.station_name").html("Balintawak").show();
    $("span.when").html("On Mondays").show();

    //$("button#default-day").css("background-color", "rgba(255,255,255,0.9)");

    $("span.line_name").css("color", "#33691E");
	$("span.line_name").css("background-color", "rgba(255, 249, 196,0.8)");

	$("span.station_name").css("color", "#33691E");
	$("span.station_name").css("background-color", "rgba(255, 249, 196,0.8)");

	$("span.when").css("color", "#33691E");
	$("span.when").css("background-color", "rgba(255, 249, 196,0.8)");
});


$('select[name=line_select]').change(function() {
	$("button#default-day").css("background-color", "rgba(255,255,255,0.4)");


	var val = $(this).find(':selected').data('name');

    if (this.value !==  '') {
		$("span.line_name").html(val).show();

		var temp = $('select[name=station_select]').val();

		if (temp !== ''){
			$("span.station_name").hide();
		}

    	$("span.line_name").css("color", "#33691E");
		$("span.line_name").css("background-color", "rgba(255, 249, 196,0.8)");

		$("span.station_name").css("color", "#aaa");
		$("span.station_name").css("background-color", "rgba(141, 142, 142, 0.2)");

		$("span.when").css("color", "#aaa");
		$("span.when").css("background-color", "rgba(141, 142, 142, 0.2)");

		$("span.station_name").html("Select Station").show();
    	$("span.when").html("Select Day").show();

		$($('select[name=station_select]').removeAttr('disabled')).focus();
    }
    else {
        $("span.line_name").hide();
        $('select[name=station_select]').attr('disabled', 'disabled');
    }

    line = this.value;


});

$('select[name=station_select]').change(function() {
	$("button#default-day").css("background-color", "rgba(255,255,255,0.4)");
	var val = $(this).find(':selected').data('name');

    if (this.value != '') {
    	$("span.station_name").show();
		$("span.station_name").html(val).show;
		$("span.station_name").css("color", "#33691E");
		$("span.station_name").css("background-color", "rgba(255, 249, 196,0.8)");
		//$("span.line_name").fadeIn("slow");
    }
    else {
        $("span.station_name").hide();
    }

    station = this.value;

});


$('button.when-btn').click(function() {
	//$("button#default-day").css("background-color", "rgba(255,255,255,0.4)");
	var val = $(this).data('label');
	$("span.when").html(val).show();
	$("span.when").css("color", "#33691E");
	$("span.when").css("background-color", "rgba(255, 249, 196,0.8)")

	day = $(this).data('int');

	from_brush = brush.extent()[0];

	if (from_brush instanceof Date){
		hour = from_brush.getHours();
	} else{
		hour = from_brush.toDate().getHours();
	}


	// console.log(.toDate());
	// hour = brush.extent()[0].getHours();

	console.log("Day " + day);

	console.log("Brush " + from_brush);
	updatePieChart(hour, line, station, day);
	getDataLine(hour, line, station, day);
});
