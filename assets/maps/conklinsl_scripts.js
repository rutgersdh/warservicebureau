// jQuery available as $
// Leaflet available as L
// Turf available as turf
// Markdown-it available as markdownit
// d3 available as d3

// Some features in this demo rely on a local webserver for them to work on
// your computer. Luckily, it's not very hard to do with python.
//
// In the terminal, cd into the directory in which this file rests and run:
//
// python3 -m http:server 8888 fg notes => python3 -m http.server 8888
//
// or, if you don't have python 3:
//
// python -m SimpleHTTPServer 8888
//
// Now, point your browser to http://localhost:8888/
//
// If you have Windows, use "py" instead of "python3."

// Intialize the map as the variable "map"
// This also hides the + / - zoom controls.
const map = L.map("mapdiv", { zoomControl: true });

// Set a center point and zoom level for it:
const westernFront = L.latLng([49.197010, 2.840530]); 
const zoomLevel = 8;

// Now set the view of the map and add a tile layer:
map.setView(westernFront, zoomLevel);
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery &copy; <a href='https://www.mapbox.com/'>Mapbox</a>",
              maxZoom: 18,
              id: 'mapbox/light-v10',
              tileSize: 512,
              zoomOffset: -1,
              accessToken: 'pk.eyJ1IjoiZmdpYW5uZXR0aSIsImEiOiJPUzljekRRIn0.4OsInQ4xFjPVf9So906cew'
            }).addTo(map);

// If you prefer a different tile layer, see your options here:
// https://leaflet-extras.github.io/leaflet-providers/preview/
// Note that some may require registration. Then, where above we have
// "Stamen.Watercolor," paste in your chosen tiles, like
// "OpenStreetMap.Mapnik" or "Stamen.Toner"

// Add a marker for where we're at:
// const vingtNeufMarker = L.marker(vingtNeufRueDUlm).addTo(map);

// Now add a popup to it:
// vingtNeufMarker.bindPopup("<h3>Hello from 29 rue d’Ulm!</h3>");

// Use Markdown, instead:
// const md = markdownit({html: true}).use(markdownitFootnote);
// vingtNeufMarker.bindPopup(md.render("### Hello from 29 rue d’Ulm and the [NYU/PSL Workshop](https://wp.nyu.edu/nyupslgeo/workshop/)!"));

// Use d3 to parse the places.csv csv file.
//
// d3.csv() takes three attributes. First is the url to the csv file, which is
// just "places.csv" because the file is in the same folder as this file. The
// second function allows us to manipulate the data a bit, so we create an
// object out of it. Most importantly, we turn the latitude and longitude into
// numbers.
//
// That gives us a new object that we call "list." It's not an Array, but it
// behaves somewhat like one. The last member, however, is the header row.


d3.csv("../../assets/maps/conklinsl_places.csv", data => {
  return {
    label: data.label,
    latitude: +data.latitude,
    longitude: +data.longitude,
    description: data.description,
    type: data.type,
    letters: data.letters,
    mentions: data.mentions
  };
}, list => {
  // iterate over the list object
  list.forEach(place => {
    // We need to make sure that we ignore the object that only holds the headers.
    if(place.latitude){
      // We change the color and icon (see below) based on the value of the
      // "type" property.
      let color, popupContent;
      switch (place.type) {
      case "correspondent-location":
        color = "#1C207A";
        break;
      case "mentioned":
        color = "#7A761C";
        break;
      }
      // Create descriptive popups
      popupContent = "<h4>" + place.label + "</h4>";
      popupContent = popupContent + place.description + "<br />" + "<b>Mentions</b>: " + place.letters + "<br />";
      // And then we use the other properties to make add a circle marker to the map.
      L.circleMarker([place.latitude, place.longitude],
        { 
          radius: 7 * Math.sqrt(place.mentions),
          fillColor: color, 
          color: color,
          fillOpacity: 0.5 
        }).bindPopup(popupContent).addTo(map);
      // Alternatively, we can use icons from font-awesome.
      // L.marker([place.latitude, place.longitude],
      //   { icon: L.divIcon(
      //     { html: `<i style="color: ${color}" class="fa fa-${icon}"></i>`, iconSize: [30, 30] }
      //   )}
      // ).bindTooltip(place.nom).addTo(map);
    }
  });
});

// add correspLines
var correspLines = { "type": "FeatureCollection", 
        "features": [
        {"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.169722, 40.755556],[-74.447399, 40.500819]]},"properties": { "name": "conklinsl_01", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#elizabeth-j-lindsley-to-earl-reed-silvers-november-25-1917"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[3.1492, 49.3078],[-74.169722, 40.755556]]},"properties": { "name": "conklinsl_02", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#various-to-elizabeth-j-lindsley-june-17-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.169722, 40.755556],[-74.447399, 40.500819]]},"properties": { "name": "conklinsl_03", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#elizabeth-j-lindsley-to-earl-reed-silvers-nd"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[3.1492, 49.3078],[-74.169722, 40.755556]]},"properties": { "name": "conklinsl_04", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#j-b-pelletier-to-elizabeth-j-lindsley-august-5-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[3.1492, 49.3078],[-74.169722, 40.755556]]},"properties": { "name": "conklinsl_05", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#charles-peck-to-elizabeth-j-lindsley-august-16-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.169722, 40.755556],[-74.447399, 40.500819]]},"properties": { "name": "conklinsl_06", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#elisabeth-w-conklin-to-earl-reed-silvers-september-12-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.447399, 40.500819],[-74.169722, 40.755556]]},"properties": { "name": "conklinsl_07", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#earl-reed-silvers-to-elizabeth-j-lindsley-september-3-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-72.608333, 41.712222],[-74.447399, 40.500819]]},"properties": { "name": "conklinsl_08", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#elizabeth-j-lindsley-to-earl-reed-silvers-september-9-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.447399, 40.500819],[-74.169722, 40.755556]]},"properties": { "name": "conklinsl_09", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#earl-reed-silvers-to-elizabeth-j-lindsley-september-27-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.169722, 40.7625],[-74.447399, 40.500819]]},"properties": { "name": "conklinsl_10", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#elizabeth-j-lindsley-to-earl-reed-silvers-october-4-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.169722, 40.7625],[-74.447399, 40.500819]]},"properties": { "name": "conklinsl_11", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#elizabeth-j-lindsley-to-earl-reed-silvers-october-6-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.447399, 40.500819],[-74.169722, 40.7625]]},"properties": { "name": "conklinsl_12", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#earl-reed-silvers-to-elizabeth-j-lindsley-october-10-1918"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.447399, 40.500819],[-74.169722, 40.7625]]},"properties": { "name": "conklinsl_13", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#earl-reed-silvers-to-elisabeth-w-conklin-january-2-1919"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-98.493056, 29.45],[-74.447399, 40.500819]]},"properties": { "name": "conklinsl_14", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#elizabeth-j-lindsley-to-earl-reed-silvers-january-24-1919"}
},{"type": "Feature",
                                    "geometry": {
                                    "type": "LineString",
                                    "coordinates": [[-74.447399, 40.500819],[-98.493056, 29.45]]},"properties": { "name": "conklinsl_15", "link": "https://rutgersdh.github.io/warservicebureau/texts/conklinsl-annotated/#earl-reed-silvers-to-elizabeth-j-lindsley-january-31-1919"}
}
        ]
};

var myStyle = {
  "color": "#1C207A",
  "weight": 3,
  "opacity": 0.55
};

function onEachFeature(feature, layer) {
  var linePopup = '<p><b>Letter</b>: ';
  if (feature.properties && feature.properties.name && feature.properties.link) {
    linePopup += '<a href="' + feature.properties.link + '">' + feature.properties.name + '</p>';
  }
  layer.bindPopup(linePopup);
}

L.geoJSON(correspLines, {
  onEachFeature: onEachFeature,
  style: myStyle
}).addTo(map);

// add legend
function getColor(d) {
        return d === 'Correspondent Location'  ? "#1C207A" :
               d === 'Mentioned in Letters'  ? "#7A761C" :
                                    "#b7b7b7";
    }
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Categories</strong>'],
    categories = ['Correspondent Location','Mentioned in Letters'];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
            (categories[i] ? categories[i] : '+'));
        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(map);
