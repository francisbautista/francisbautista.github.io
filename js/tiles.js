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

var pointdata = L.geoJson(points, {

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
});

var urlDark = 'https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token={accessToken}';

var philMapDark = L.tileLayer(urlDark, {
    maxZoom: 20,
    id: 'francisbautista.cifswiqrh0b41uwkr15e0tnf3',
    accessToken: 'pk.eyJ1IjoiZnJhbmNpc2JhdXRpc3RhIiwiYSI6ImNpZnN3aXNhbzBiZDh1amx4YTVwODliY2QifQ.Du-sSfOon7A7Jk-1AmM41w'
});

var urlStreet = 'https://api.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token={accessToken}';

var philMapStreet = L.tileLayer(urlStreet, {
    maxZoom: 20,
    id: 'francisbautista.cifswiqrh0b41uwkr15e0tnf3',
    accessToken: 'pk.eyJ1IjoiZnJhbmNpc2JhdXRpc3RhIiwiYSI6ImNpZnN3aXNhbzBiZDh1amx4YTVwODliY2QifQ.Du-sSfOon7A7Jk-1AmM41w'
});

var heat = L.heatLayer(poiPoints,{
    radius: 11,
    blur: 19,
    maxZoom: 17,
    minOpacity: 0,
});


var map = L.map('map',{
    zoom: 15,
    center: [14.55465, 121.02659],
    layers: [philMapStreet, philMapDark]
  });

var baseMaps = {
    "Philippines Light": philMapStreet,
    "Philippines Dark": philMapDark,
};

var overlayMaps = {
    "Points Of Interest": pointdata,
    "POI Heat":heat,
};
L.control.layers(baseMaps, overlayMaps).addTo(map);
