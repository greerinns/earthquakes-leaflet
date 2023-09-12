# earthquakes-leaflet
This JavaScript file under logic js contains code through the html.index file to create an interactive map that displays earthquake data using Leaflet library. The map is populated with markers representing earthquakes, and each marker provides information about the location, magnitude, and depth of the earthquake.

## Prerequisites
- Leaflet library: Make sure you have included the Leaflet library in your HTML file before using this JavaScript code.
Usage
- Include the Leaflet library in your HTML file.
- Add a <div> element with the id "map-id" where you want the map to be displayed in the html.
- Include this JavaScript file in your HTML file using the <script> tag.
- Open your HTML file in a web browser to see the interactive map.
## Functions
### getColor(depth): 
This function takes a depth value as a parameter and returns a color based on the depth range. The color is determined as follows:
- If the depth is greater than or equal to 100, the color returned is 'green'.
- If the depth is between 50 and 99 (inclusive), the color returned is 'yellow'.
- If the depth is between 10 and 49 (inclusive), the color returned is 'orange'.
- If the depth is between 0 and 9 (inclusive), the color returned is 'red'.
- If the depth is less than 0, the color returned is 'purple'.
  
### getCatColor(label)
This function takes a label value as a parameter and returns a color based on the label. The color is determined as follows:
- If the label is "Depth >= 100", the color returned is 'green'.
- If the label is "Depth >= 50", the color returned is 'yellow'.
- If the label is "Depth >= 10", the color returned is 'orange'.
- If the label is "Depth >= 0", the color returned is 'red'.
- If the label is not matched with any of the above conditions, the color returned is 'purple'.
### createMap(earthquakes)
This function creates the map object and adds the necessary layers to it. It takes an array of earthquake markers called "earthquakes" as a parameter.
- It creates a background tile layer using OpenStreetMap and assigns it to the variable "streetmap".
- It creates a baseMaps object to hold the streetmap layer.
- It creates an overlayMaps object to hold the earthquake layer.
- It creates the map object on the element with the id "map-id" and sets the initial center coordinates and zoom level.
- It adds the streetmap and earthquakes layers to the map.
- It creates a layer control and adds it to the map, allowing the user to toggle between the base map and overlay map layers.

### createMarkers(res)
This function is called after retrieving earthquake data from an API. It takes the JSON response as a parameter and creates markers for each earthquake.
- It retrieves the list of earthquakes from the JSON response.
- It initializes an empty array called "eqMarkers" to hold the earthquake markers.
- It loops through the earthquake array and creates a circle marker for each earthquake.
- Each marker's size is determined by the earthquake's magnitude, and its color is determined by the earthquake's depth using the getColor function.
- A popup is bound to each marker, displaying information about the location, magnitude, and depth of the earthquake.
- The marker is added to the eqMarkers array.
- Finally, it calls the createMap function with a layer group created from the eqMarkers array.

## Data Source
The earthquake data is retrieved from the USGS Earthquake Catalog API (https://earthquake.usgs.gov). The code performs an API call to retrieve the earthquake data in GeoJSON format.





