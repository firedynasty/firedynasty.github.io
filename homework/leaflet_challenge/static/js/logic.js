// Creating map object
var myMap = L.map("mapid", {
    center: [40.757507, -73.987772],
    zoom: 4
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Use this link to get the geojson data.
  var link = "static/data/significant_month.geojson";
  
  
  var holding_json = []
  

function getSize(d) {
  return d > 5   ? 8 :
         d > 0   ? 5 :
                   5;
  }


function getDepth(d) {
  return d > 100  ? '#800026' : 
         d > 25  ? '#FC4E2A' :
         d > 0   ? '#FED976' :
                   '#FFEDA0';
}


//https://gis.stackexchange.com/questions/308165/leaflet-differentiating-colors-dynamically



  
  // Grabbing our GeoJSON data..
  d3.json(link, function(data) {
    // Creating a GeoJSON layer with the retrieved data
    // this beomes blue and then you can style it however which way you need in the other logic files

    console.log(data);
    
    holding_json = data;

    magnitude_list = [];

    holding_json.features.forEach(function(image){
      magnitude_list.push(image.properties.mag)
    });

    depths_list = [];
    holding_json.features.forEach(function(image){
      depths_list.push(image.geometry.coordinates[2])
    });
    console.log('depths_list', depths_list);

    //10) [6.3, 4.36, 6.1, 6.1, 3.62, 4.39, 6.4, 6.3, 6.4, 6.1]
    //holding_json.features[0]['properties']['mag']

    console.log('magnitude_list', magnitude_list);

    var geoJsonMap = L.geoJSON(data, {

      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {radius: getSize(feature.properties.mag),
                                        fillColor: getDepth(feature.geometry.coordinates[2]),
                                        color: "#000",
                                        weight: 1,
                                        opacity: 1,
                                        fillOpacity: 0.8});
      },
      onEachFeature: function (feature, layer) {
        var popupText = "<h3>" + feature.properties.place + "</h3> <hr> <h5>" + new Date (feature.properties.time) + "</h5> <h5> Magnitude: " + feature.properties.mag  + "</h5> <h5> Depth: " + feature.geometry.coordinates[2] + "</h5>"
        layer.bindPopup(popupText);
        layer.on('mouseover', function() {layer.openPopup();});
        layer.on('mouseout', function() {layer.closePopup();});
      }
    }).addTo(myMap);
    
    var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,25,100],
        labels = ['<strong> Depth of Quake </strong>'],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades [i];
        to = grades[i+1]-1;

    labels.push(
        '<i style="background:' + getDepth(from + 1) + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;


        };

    legend.addTo(myMap);


  });
  