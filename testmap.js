async function mapd(){

const response = await fetch('./shopsformap.php');
    
var data = await response.json();

let mymap = L.map("mapid", {
  zoom: 15,
  center: L.latLng([38.246242, 21.7350847])
}); 

mymap.addLayer(
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
); 

let markersLayer = L.layerGroup(); 

mymap.addLayer(markersLayer);

markersLayer.addTo(mymap);
let controlSearch = new L.Control.Search({
  position: "topright",
  layer: markersLayer,
  propertyName: "title",
  initial: false,
  zoom: 15,
  marker: false
});

mymap.addControl(controlSearch);

if (JSON.stringify(data)=='{}') {

}
else{
for (i in data) {
  let title = data[i].sname;
  let lat=parseFloat(data[i].latitude);
  let long=parseFloat(data[i].longitude);
  console.log(title);
  let marker = L.marker(L.latLng(lat,long), {title: title });
  marker.bindPopup("title: " + title);
  marker.addTo(markersLayer);
}
}

}
