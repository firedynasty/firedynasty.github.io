// Creating map object
var myMap = L.map("map", {
  center: [40.757507, -73.987772],
  zoom: 11
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
var link = "static/data/nyc_yelp_over_918.geojson";


var man = []


// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a GeoJSON layer with the retrieved data
  // this beomes blue and then you can style it however which way you need in the other logic files
  console.log(data);
  
  man = data;

  console.log(man)
for(var i = 0; i < man['features'].length; i++ ) {
  L.marker(man['features'][i]['geometry']['coordinates'])
  .bindPopup("<h3>"+"<a href=\""+ man['features'][i]['properties']['url'] + "\""+" target=\"_blank\">" + man['features'][i]['properties']['name'] + "</a> </h3> <hr> <h5>Rating " + man['features'][i]['properties']['rating'] + "</h5>")
  .addTo(myMap);
}

});

