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
const atlantic = L.latLng([42.272885, -34.053704]); 
const zoomLevel = 3;

// Now set the view of the map and add a tile layer:
map.setView(atlantic, zoomLevel);
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


d3.csv("../../assets/maps/ainsworthwpe_places.csv", data => {
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
var correspLines = { 
    "type": "FeatureCollection", 
        "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                        [-76.3075, 37.003611],
                        [-74.447399, 40.500819]
                    ]
            },
            "properties": { 
                "name": "ainsworthwpe_02",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-june-30-1917"
            },
            "id": 1
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                        [-76.3075, 37.003611],
                        [-74.447399, 40.500819]
                    ]
            },
            "properties": { 
                "name": "ainsworthwpe_03",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-july-6-1917"
            },
            "id": 2
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                        [-74.002778, 40.463889],
                        [-74.447399, 40.500819]
                    ]
            },
            "properties": { 
                "name": "ainsworthwpe_04",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-nd"
            },
            "id": 3
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-74.447399, 40.500819],
                    [-74.002778, 40.463889]
                    ]
            },
            "properties": { 
                "name": "ainsworthwpe_05",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#earl-reed-silvers-to-william-p-e-ainsworth-february-21-1918"
            },
            "id": 4
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-74.010278, 40.706389],
                    [-74.447399, 40.500819]
                    ]
            },
            "properties": { 
                "name": "ainsworthwpe_06",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#george-c-ainsworth-to-earl-reed-silvers-may-27-1918"
            },
            "id": 5
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-74.447399, 40.500819],
                    [-74.010278, 40.706389]
                    ]
            },
            "properties": { 
                "name": "ainsworthwpe_07",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#earl-reed-silvers-to-george-c-ainsworth-may-29-1918"
            },
            "id": 6
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-4.5153352, 48.3756074],
                    [-74.281944, 40.605556]
                ]
            },
            "properties": { 
                "name": "ainsworthwpe_08",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-may-23-1918"
            },
            "id": 7
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-0.2677799, 44.9124896],
                    [-74.447399, 40.500819]
                    ]
            },
            "properties": { 
                "name": "ainsworthwpe_09",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-june-7-1918"
            },
            "id": 8
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-0.861100, 44.863900],
                    [-74.447399, 40.500819]
                ]
            },
            "properties": { 
                "name": "ainsworthwpe_10",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-august-3-1918"
            },
            "id": 9
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-74.447399, 40.500819],
                    [5.543611, 48.889167]
                ]
            },
            "properties": { 
                "name": "ainsworthwpe_11",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#earl-reed-silvers-to-william-p-e-ainsworth-october-4-1918"
            },
            "id": 10
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [5.141944, 49.2725],
                    [-74.447399, 40.500819]
                ]
            },
            "properties": { 
                "name": "ainsworthwpe_12",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-october-15-1918"
            },
            "id": 11
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [5.114167, 49.472778],
                    [-74.447399, 40.500819]
                ]
            },
             "properties": { 
                "name": "ainsworthwpe_13",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-november-14-1918"
            },
            "id": 12
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [5.114167, 49.472778],
                    [-74.2795625, 40.6092261] 
                ]
            },
            "properties": { 
                "name": "ainsworthwpe_14",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-george-c-ainsworth-november-22-1918"
            },
            "id": 13
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [5.4868113, 48.5166495],
                    [-74.447399, 40.500819]
                ]
            },
            "properties": { 
                "name": "ainsworthwpe_15",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-january-4-1919"
            },
            "id": 14
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [5.581944, 48.319722],
                    [-74.447399, 40.500819]
                ]
            },
            "properties": { 
                "name": "ainsworthwpe_16",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-march-5-1919"
            },
            "id": 15
        },{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [5.581944, 48.319722],
                    [-74.447399, 40.500819]
                ]
            },
            "properties": { 
                "name": "ainsworthwpe_17",
                "link": "https://rutgersdh.github.io/warservicebureau/texts/ainsworthwpe-annotated/#william-p-e-ainsworth-to-earl-reed-silvers-january-21-1919"
            },
            "id": 16
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
// Alternatively, we can contact a server and ask data from it.
//
// Pull in the Vélib station dataset ParisData provides
// const velibStationUrl = "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows=68";

// Shift into async mode and put it on the map:

/*

$.getJSON(velibStationUrl, stationData => {
  // Create a layer group for the stations
  const velibStationsLayer = L.layerGroup();

  // stationData has an array inside of it called "records" that
  // holds each station's data. Within each record, there's a "fields"
  // object that has three fields we're interested in: "name," "lat,"
  // and "lon."

  // iterate over the records array
  stationData.records.forEach( record => {
    // build an L.circleMarker to add to the velibStationMarkers array.
    const velibCircle = L.circleMarker([record.fields.lat, record.fields.lon], {
      radius: 15,
      color: "#eeeeee", // outline or stroke color
      weight: 2, // outline or stroke width
      fillColor: "#666666",
      fillOpacity: 0.5
    }).bindPopup(`<h3>${record.fields.name}</h3>`);
    velibStationsLayer.addLayer(velibCircle);
  });
  // And add it to the map
  velibStationsLayer.addTo(map);

  // Now convert the layer to GeoJSON so we can work on it with Turf.
  const velibStationsGeoJSON = velibStationsLayer.toGeoJSON();
  // In turf, let's buffer the points and then dissolve them together
  const bufferedStations = turf.dissolve(
    turf.buffer(
      velibStationsGeoJSON, 400, { units: "meters" }
    )
  );
  L.geoJSON(bufferedStations, {
    style() {
      return {
        color: "#ff0000",
        weight: 5,
        fillOpacity: 0.0
      };
    }
  }).addTo(map);
}); // close $.getJSON()

*/

// Or, we can use $.getJSON() on our own file of the Parisian Arrondisements.

/*
$.getJSON("paris_arr.geojson", geodata => {
  L.geoJSON(geodata, {
    style() {
      return {
        color: "#ff0000",
        weight: 5,
        fillOpacity: 0.0
      };
    }
  }).addTo(map);
});
*/

// Use jQuery to manipulate the html elements.
// Change the card header:
// $("#card-header-text").html("<strong>Workshop à rue d’Ulm</strong>");

// Change the card body to the body.md file: 

// $.ajax({ url: "body.md",
//   success(bodyMarkdown) {
//     $("#outlet-card-body").html(md.render(bodyMarkdown)); 
//   }
// });
