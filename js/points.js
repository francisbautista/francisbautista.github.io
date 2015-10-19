var map = L.map('map', 'mapbox.dark').setView([14.55465, 121.02659], 15);


var geojsonMarkerOptions = {
    color: 'rgb(6, 162, 190)',
    fillColor: 'rgb(6, 162, 190)',
    fillOpacity: 0.6,
    radius: 5
};

var customOptions = {
  'maxWidth': '500',
  'className' : 'custom'
}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.name && feature.properties.name) {
        layer.bindPopup(feature.properties.amenity + ": "+feature.properties.name);
    }
}

var customOptions = {
  'maxWidth': '500',
  'className' : 'custom'
}

L.geoJson(points, {

	style: function (feature) {
		return feature.properties && feature.properties.name;
	},

	onEachFeature: onEachFeature,

  filter: function (feature, layer) {
		if (feature.properties) {
			// If the property "amenity" exists and is null, return false (don't render amenity features that are null)
			return feature.properties.amenity !== undefined ? feature.properties.amenity : null;
		}
    else if (feature.properties) {
			// If the property "amenity" exists and is null, return false (don't render amenity features that are null)
			return feature.properties.underConstruction !== undefined ? !feature.properties.underConstruction : true;
		}
		return false;
	},

	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, {
      color: 'rgb(6, 162, 190)',
      fillColor: 'rgb(6, 162, 190)',
      fillOpacity: 0.6,
      radius: 5
		}).bindPopup(customOptions);
	}
}).addTo(map);



L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token={accessToken}', {
    // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 20,
    id: 'francisbautista.cifswiqrh0b41uwkr15e0tnf3',
    accessToken: 'pk.eyJ1IjoiZnJhbmNpc2JhdXRpc3RhIiwiYSI6ImNpZnN3aXNhbzBiZDh1amx4YTVwODliY2QifQ.Du-sSfOon7A7Jk-1AmM41w'
}).addTo(map);
