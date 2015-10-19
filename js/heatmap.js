// var map = L.map('map', 'mapbox.dark').setView([14.55465, 121.02659], 15);
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token={accessToken}', {
//     // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 20,
//     id: 'francisbautista.cifswiqrh0b41uwkr15e0tnf3',
//     accessToken: 'pk.eyJ1IjoiZnJhbmNpc2JhdXRpc3RhIiwiYSI6ImNpZnN3aXNhbzBiZDh1amx4YTVwODliY2QifQ.Du-sSfOon7A7Jk-1AmM41w'
// }).addTo(map);


var heat = L.heatLayer(poiPoints,{
    radius: 11,
    blur: 19,
    maxZoom: 17,
    minOpacity: 0,
}).addTo(map);
