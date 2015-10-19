var map = L.map('map', 'mapbox.dark').setView([14.55465, 121.02659], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'francisbautista.cifswiqrh0b41uwkr15e0tnf3',
    accessToken: 'pk.eyJ1IjoiZnJhbmNpc2JhdXRpc3RhIiwiYSI6ImNpZnN3aXNhbzBiZDh1amx4YTVwODliY2QifQ.Du-sSfOon7A7Jk-1AmM41w'
}).addTo(map);

var someGeojsonFeature = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [121.02659,14.55465],
    }
},
{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [121.02749,14.55865],
    }
}
]
var geojsonMarkerOptions = {
    color: 'rgb(6, 162, 190)',
    fillColor: 'rgb(6, 162, 190)',
    fillOpacity: 0.6,
    radius: 10
};

var customOptions = {
  'maxWidth': '500',
  'className' : 'custom'
}

L.geoJson(someGeojsonFeature, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup("1700 GMT+8: This is a really cool pop-up", customOptions);
    }
}).addTo(map);
