var myMap = L.map("map", {
  center: [35.52, -102.67],
  zoom: 3,
});
function colorpicker(input){
  if (input<1) {
    return("Green")
  }
  else if (input<2) {
    return("GreenYellow")
  }
  else if (input<3) {
    return("Yellow")
  }
  else if (input<4){
    return("Orange")
  }
  else if (input<5){
    return("OrangeRed")
  }
  else{
    return("Red")
  }
}
//console.log(colorpicker(3))
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
function markersize(mag){
  return mag*10000
}
var EarthArray = [];
d3.json(url, function(response) {

  console.log(response);

  response = response.features;
  for (var i = 0; i < response.length; i++) {
    var location = response[i].geometry;
    var prop = response[i].properties
    //console.log(prop.mag)
    //console.log(location);
    //if (location) {
      //L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
    //}    
    //EarthArray.push(
    if (location){
      L.circle([location.coordinates[1], location.coordinates[0]], {
        stroke: false,
        fillOpacity: 0.75,
        color: colorpicker(prop.mag),
        fillColor: colorpicker(prop.mag),
        radius: markersize(prop.mag)
      }).bindPopup("<h3>Location: " + prop.place + "</h3> <hr> <h3>Magnitude: " + prop.mag + "</h3> <hr> <h3>Time: " + prop.time + "</h3>").addTo(myMap)}
  }
});
/*var earthquakes = L.layerGroup(EarthArray);
var overlayMaps = {
  "Earthquakes": earthquakes,
};
*/
// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
//Making legend
var legend = L.control({position: "bottomright"});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    /*for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colorpicker(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
*/
for (var i = 0; i < grades.length; i++) {
  div.innerHTML +=
      '<i style="background:' + colorpicker(grades[i]) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
}
    return div;
};
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    //this.update();
    return this._div;
};
info.addTo(myMap);
legend.addTo(myMap);
// Add the layer control to the map
/*L.control.layers(earthquakes, {
  collapsed: false
}).addTo(myMap);*/
