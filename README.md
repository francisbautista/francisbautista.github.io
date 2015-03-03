
# A Statistical Representation of Traffic Volume for a Specific Station per Time
*CS 159.32: Data Visualization Final Project by Francis Bautista and Eyana Mallari*
<center>
![System Screenshot](/fig/screenshot.png)
</center>

[francisbautista.github.io](http://francisbautista.github.io)

### Introduction
This project leverages historical traffic volume data collated by the MMDA and Dr. Reina Reyes to give a statistical representation of the **traffic volume** for a **specific station** for a **given line** at a **certain time**. It uses a donut-chart with day and time selectors to represent the statistical breakdown of the chances for the Northbound and Southbound traffic volumes.

It includes a run chart plotting the value of High Medium Low percentages versus time. This allows users to linearly predict traffic volume statistics as time progresses. A toggle selector for the northbound and southbound data is available.

It works with a d3.js front-end with data supplied from the [MMDA-Interaksyon](http://mmdatraffic.interaksyon.com/) website parsed and formatted using the included Python scripts.

### Directions for Use
1. Users select the line from the Line Dropdown
2. Users will then be able to select specific stations from the Station Dropdown
3. Day Select will drill-down to the specific day of the week, as traffic data varies as the week progresses.
4. Users can use the Time Slider to view traffic trends at a specific hour.
5. The run chart presents H M L statistics in red, yellow, and green lines respectively. This will allow for more linear prediction of traffic versus time.
6. A Toggle select is included to be able to view trendlines for North and Southbound directions for traffic.

### Technical Components

This application uses the Javascript D3 library for the visualization of the statistical data. The Papa Parse library was used to aid CSV parsing for client-side operations.

A python script `selection_engine.py` was used to drill-down through the initial data set, and create cubes that were necessary in generating the derived statistical counts. It has 4 major functions and 3 helper functions for printing. The 4 major functions are broken down as follows:

* **line_selection_engine()**
    * used to drill down to each line
* **station_selection_engine()**
    * used to drill down to each station
* **day_isolation_engine()**
    * used to isolate data for days of the week per station
* **day_summary_engine()**
    * used to collate and generate percentage statistics for the High Medium Low data for the specific days within the station

### Resources Used
* [Numpy Array Docs](http://docs.scipy.org/doc/numpy/reference/arrays.ndarray.html)
* [Numpy Loadtxt Docs](http://docs.scipy.org/doc/numpy/reference/generated/numpy.loadtxt.html)
* [D3 API Reference](https://github.com/mbostock/d3/wiki/API-Reference)
* [D3 Wiki](https://github.com/mbostock/d3/wiki)
* [MMDA-Interaksyon Data](http://mmdatraffic.interaksyon.com/)
* [Proto.io Button](https://proto.io/freebies/onoff/)
