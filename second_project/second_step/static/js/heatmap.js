var restaurants = [{'name': 'Man vs Fries',
'rating': 4.0,
'review_count': 39,
'coordinates_list': [37.7474, -122.41794],
'categories_list': ['Mexican', 'Pop-Up Restaurants']},
{'name': 'Tacos El Patrón',
'rating': 4.0,
'review_count': 409,
'coordinates_list': [37.748949, -122.416138],
'categories_list': ['Tacos']},
{'name': 'RakiRaki by Junya Watanabe',
'rating': 4.5,
'review_count': 11,
'coordinates_list': [37.7444, -122.420922],
'categories_list': ['Ramen', 'Sushi Bars']},
{'name': 'Basa Seafood Express',
'rating': 4.5,
'review_count': 713,
'coordinates_list': [37.75276, -122.41338],
'categories_list': ['Seafood', 'Sandwiches', 'Burgers']},
{'name': 'Marlena Restaurant',
'rating': 5.0,
'review_count': 36,
'coordinates_list': [37.746616, -122.413345],
'categories_list': ['American (New)']},
{'name': 'United Dumplings',
'rating': 4.5,
'review_count': 51,
'coordinates_list': [37.739223, -122.416008],
'categories_list': ['Chinese', 'Asian Fusion', 'Noodles']},
{'name': 'Chicken as Cluck',
'rating': 4.0,
'review_count': 153,
'coordinates_list': [37.7505862896473, -122.395178442908],
'categories_list': ['Chicken Shop', 'Food Delivery Services']},
{'name': 'El Farolito',
'rating': 4.0,
'review_count': 4970,
'coordinates_list': [37.75265, -122.41812],
'categories_list': ['Mexican']},
{'name': 'The Front Porch',
'rating': 4.0,
'review_count': 2875,
'coordinates_list': [37.7438, -122.422035],
'categories_list': ['Southern', 'Cajun/Creole', 'American (Traditional)']},
{'name': 'Yamo',
'rating': 4.0,
'review_count': 1988,
'coordinates_list': [37.7619463343878, -122.419764563536],
'categories_list': ['Burmese', 'Chinese']},
{'name': 'Bac Lieu Restaurant',
'rating': 4.5,
'review_count': 198,
'coordinates_list': [37.745267, -122.420402],
'categories_list': ['Vietnamese', 'Noodles', 'Soup']},
{'name': 'Señor Sisig',
'rating': 4.0,
'review_count': 192,
'coordinates_list': [37.757154, -122.421326],
'categories_list': ['Filipino']},
{'name': 'Farmhouse Kitchen Thai Cuisine',
'rating': 4.0,
'review_count': 2649,
'coordinates_list': [37.76026094, -122.4112048],
'categories_list': ['Thai', 'Comfort Food']},
{'name': 'SF Chickenbox',
'rating': 4.5,
'review_count': 94,
'coordinates_list': [37.7597582, -122.4212092],
'categories_list': ['Chicken Shop', 'Sandwiches']},
{'name': 'Aria Korean Street Food',
'rating': 4.0,
'review_count': 875,
'coordinates_list': [37.78655, -122.41795],
'categories_list': ['Korean', 'Tapas/Small Plates', 'Chicken Shop']},
{'name': 'The Bird',
'rating': 4.0,
'review_count': 1901,
'coordinates_list': [37.78724, -122.39995],
'categories_list': ['Chicken Shop', 'Sandwiches']},
{'name': 'La Taqueria',
'rating': 4.0,
'review_count': 4147,
'coordinates_list': [37.75088, -122.41805],
'categories_list': ['Mexican']},
{'name': 'Saucy Bandits',
'rating': 5.0,
'review_count': 11,
'coordinates_list': [37.740006, -122.409366],
'categories_list': ['Vegan', 'Southern', 'Burgers']},
{'name': 'Bayshore Taqueria',
'rating': 4.5,
'review_count': 244,
'coordinates_list': [37.7430959, -122.4053719],
'categories_list': ['Mexican']},
{'name': 'Pho Nation',
'rating': 5.0,
'review_count': 12,
'coordinates_list': [37.73166, -122.4056],
'categories_list': ['Vietnamese']}]

var restaurantMarkers = [];

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < restaurants.length; i++) {
  restaurantMarkers.push(
  L.marker(restaurants[i].coordinates_list)
    .bindPopup("<h3>" + restaurants[i].name + "</h3> <hr> <h5>Rating " + restaurants[i].rating + "</h5> <h5>Review Count: " + restaurants[i].review_count + "</h5> <h5>Categories: " + restaurants[i].categories_list + "</h5>")
  );
}

var restaurantLayer = L.layerGroup(restaurantMarkers);

//from 1.3.1_Markers


var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";

var test_json = []

d3.json(url, function(response) {

  console.log(response);

  test_json = response;
  
  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }

  var baseMaps = {
    Light: light
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  });

  var overlayMaps = {
    Heat: heat,
    Restaurant: restaurantLayer
  }

  var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 13,
    layers: [light]
  });
  

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

});
