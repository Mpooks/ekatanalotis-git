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
  zoom: null,
  marker: false,
});

mymap.addControl(controlSearch);

if (JSON.stringify(data)=='{}') {

}
else{
for (i in data) {
  let title = data[i].sname;
  let lat=parseFloat(data[i].latitude);
  let long=parseFloat(data[i].longitude);
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

    marker.bindPopup("This is the Transamerica Pyramid").openPopup();

}



function error(err) {

    if (err.code === 1) {
        alert("Please allow geolocation access");
    } else {
        alert("Cannot get current location");
    }

}
var redIcon = new L.Icon({iconUrl:'marker-icon-2x-red.png',iconSize: [25, 41],
iconAnchor: [12, 41],popupAnchor: [1, -34],});

var is = document.getElementById('searchtext9');
var el = document.querySelector(".search-button");
el.onclick = async function(event) {
  document.getElementById('selectcat').value='black';
  if(is.value.length===0){
    markersLayer.clearLayers();
          const response = await fetch('./shopsformap.php');
          var data = await response.json();
          if (JSON.stringify(data)=='{}') {

          }
          else{
          for (i in data) {
            let title = data[i].sname;
            let lat=parseFloat(data[i].latitude);
            let long=parseFloat(data[i].longitude);
              let marker = L.marker(L.latLng(lat,long));

            marker.bindPopup("title: " + title);
            marker.addTo(markersLayer);
          }
          }

    }else{
      var c = document.getElementById('searchtext9').value;
    console.log(c);
    var formData = new FormData();
    formData.append('shop', c);
    const response = await fetch('./searchpersname.php',{ method: 'POST', body: formData });
    markersLayer.clearLayers();
    
    var data = await response.json();
  
    if (JSON.stringify(data)=='{}') {
  
    }
    else{
    for (i in data) {
    let title = data[i].sname;
    let lat=parseFloat(data[i].latitude);
    let long=parseFloat(data[i].longitude);
    let col=data[i].color;
    if(col=='0'){
      let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
      marker.bindPopup("title: " + title);
    marker.addTo(markersLayer);
    }else{
      let marker = L.marker(L.latLng(lat,long));
      marker.bindPopup("title: " + title);
    marker.addTo(markersLayer);
    }
    
    }
    }

    }
  }

is.addEventListener("keypress", async function(event) {
    document.getElementById('selectcat').value='black';
    var c = document.getElementById('searchtext9').value;
    if(c.length === 0){
        markersLayer.clearLayers();
          const response = await fetch('./shopsformap.php');
          var data = await response.json();
          if (JSON.stringify(data)=='{}') {

          }
          else{
          for (i in data) {
            let title = data[i].sname;
            let lat=parseFloat(data[i].latitude);
            let long=parseFloat(data[i].longitude);
            let marker = L.marker(L.latLng(lat,long), {title: title });
            marker.bindPopup("title: " + title);
            marker.addTo(markersLayer);
          }
          }

    }else{
    if (event.key === "Enter") {

      el.click();
    }
  }
  });


var sel = document.getElementById('selectcat');
sel.onchange = async function getSelected(){
  document.getElementById('searchtext9').value=null;
    var s = document.getElementById('selectcat').value;
    console.log(s);
    if(s!=='black'){
    var formData = new FormData();
    formData.append('select', s);
    const response = await fetch('./searchpercat.php',{ method: 'POST', body: formData });
    markersLayer.clearLayers();
    
    var data = await response.json();
  
    if (JSON.stringify(data)=='{}') {
  
    }
    else{
    for (i in data) {
    let title = data[i].sname;
    let lat=parseFloat(data[i].latitude);
    let long=parseFloat(data[i].longitude);
    let marker = L.marker(L.latLng(lat,long), {title: title });
    marker.bindPopup("title: " + title);
    marker.addTo(markersLayer);
    }
    }
  
  }else{
    markersLayer.clearLayers();
          const response = await fetch('./shopsformap.php');
          var data = await response.json();
          if (JSON.stringify(data)=='{}') {

          }
          else{
          for (i in data) {
            let title = data[i].sname;
            let lat=parseFloat(data[i].latitude);
            let long=parseFloat(data[i].longitude);
            let marker = L.marker(L.latLng(lat,long), {title: title });
            marker.bindPopup("title: " + title);
            marker.addTo(markersLayer);
          }
          }

}
}
}