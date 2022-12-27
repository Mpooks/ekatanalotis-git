async function mapd(){

const response = await fetch('./shopsformap.php');
    
var data = await response.json();

const mymap = L.map('mapid');       //kataskevazoume to map

mymap.setView([38.25972,21.74328] , 16);   //thetoume suntetagmenes kai to zoom

mymap.addLayer(
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
  );  // eisagwgi dedomenwn sto map mas mesw tou link

let marker, circle, zoomed;

navigator.geolocation.watchPosition(success, error);        //vazoume watchposition kai oxi to current position giati theloume sunexi enhmerwsi tou location

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


function success(pos) {

    const lat = pos.coords.latitude;    //geografiko platos 
    const lng = pos.coords.longitude;      //geografiko mikos 
    const accuracy = pos.coords.accuracy;

    if (marker) {                           // meta apo kathe update diagrafei to palio marker an uparxei                   
        mymap.removeLayer(marker);
        mymap.removeLayer(circle);
    }
   

    marker = L.marker([lat, lng]).addTo(mymap);                             // thetei kuklo kai marker sto map meta apo reload
    circle = L.circle([lat, lng], { radius: accuracy }).addTo(mymap);
   

    if (!zoomed) {
        zoomed = mymap.fitBounds(circle.getBounds());       // menw sto idio zoom kathe fora pou allazw position
    }


    mymap.setView([lat, lng]);              //focus se kathe neo position meta apo update position

}



function error(err) {

    if (err.code === 1) {
        alert("Please allow geolocation access");
    } else {
        alert("Cannot get current location");
    }

}
}