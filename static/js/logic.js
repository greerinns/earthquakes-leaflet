// Create a function to create the map by taking in a layergroup array of markers called earthquakes
function getColor(depth) {
    return depth >= 100? 'green' :
      depth >= 50 ? 'yellow' : 
      depth >= 10 ? 'orange' :
      depth >= 0 ? 'red' : 
      depth = 'purple'
}
function getCatColor(label) {
    return label == "Depth >= 100"? 'green' :
      label == "Depth >= 50"? 'yellow' : 
      label == "Depth >= 10" ? 'orange' :
      label == "Depth >= 0" ? 'red' : 
      label = 'purple'
}

function createMap(earthquakes) {

// Create the  background tile layer
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

// Create a baseMaps object to hold the streetmap layer
    let baseMaps = {
        "World Map": streetmap
    };

  // Create an overlayMaps object to hold the earthquake layer
    let overlayMaps = {
        "Earthquakes": earthquakes
    };

 // Create the map object on map-id div
    let map = L.map("map-id", {
        center: [40.73, -74.0059],
        zoom: 3,
        layers: [streetmap, earthquakes]
    });

  // Create a layer control, and pass it baseMaps and overlayMaps objects 
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
// now we have a blank map with layer control


//legend
var legend = L.control({position: 'bottomleft'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    var labels=["Categories"];
    var categories = ["Depth >= 100","Depth >= 50","Depth >= 10","Depth >= 0", "Depth < 0"];
    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += labels.push(

                '<p style="color:'+ getCatColor(categories[i]) +'">'+categories[i]+ '</p>'
                )

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);
// //legend
}
// Create a function to make the markers out of the JSON response
function createMarkers(res) {

    // Pull the list of earthquakes from res as eqs
    let eqs = res.features;

    // Initialize an array to hold earthquake markers
    let eqMarkers = [];

        // Loop through the earthquake array
    for (let index = 0; index < eqs.length; index++) {
        // eq will be the earthquake object for the given loop
        let eq = eqs[index];

        // For each eq, create a marker, and bind a popup with the station's name.
        let eqMarker = L.circleMarker([eq.geometry.coordinates[1], eq.geometry.coordinates[0]], {
            radius : eq.properties.mag * 2,
            color  : getColor(eq.geometry.coordinates[2]),
            opacity : 1
          })
        .bindPopup("<h3>Location: " + eq.properties.place + "<h3>" + "<h3>Magnitude: " + eq.properties.mag + "</h3>" + "<h3>Depth: " + eq.geometry.coordinates[2] + "<h3>");

        // Add the marker to the bikeMarkers array.
        eqMarkers.push(eqMarker);
    }
  // Create a layer group that's made from the earthquake markers array, and pass it to the createMap function.
  createMap(L.layerGroup(eqMarkers));
}

// Perform an API call to the earthquake json to get the station information. Call createMarkers when it completes.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then(createMarkers);
