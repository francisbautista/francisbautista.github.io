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

var cebupointdata = L.geoJson(cebupoints, {

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

var myLines = [{
    "type": "LineString",
    "coordinates": [[121.05298,14.5528],[121.04191,14.5577],[121.0347,14.5555],[121.02129,14.56152], [121.01727,14.5609 ], [121.01519,14.55776],[121.01637,14.55114], [121.02612,14.55112],[121.02752,14.55132],[121.02652,14.55042]]
// }, {
//     "type": "LineString",
//     "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
// }
}];



var myStyle = {
    "color": "rgb(71, 1, 244)",
    "weight": 5,
    "opacity": 0.85
};
var lines = L.geoJson(myLines, {
    style: myStyle
});

var map = L.map('map',{
    zoom: 15,
    center: [14.55465, 121.02659],
    layers: [philMapStreet, philMapDark]
  });

var baseMaps = {
    "Philippines Dark": philMapDark,
    "Philippines Light": philMapStreet
};

var overlayMaps = {
    "MNL Points Of Interest": pointdata,
    "CEBU Points Of Interest": cebupointdata,
    "POI Heat":heat,
    "Line":lines
};
L.control.layers(baseMaps, overlayMaps).addTo(map);
