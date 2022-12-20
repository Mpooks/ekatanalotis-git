const mymap = L.map('mapid');       //kataskevazoume to map

mymap.setView([38.25972,21.74328] , 16);   //thetoume suntetagmenes kai to zoom

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);   // eisagwgi dedomenwn sto map mas mesw tou link

let marker, circle, zoomed;

navigator.geolocation.watchPosition(success, error);        //vazoume watchposition kai oxi to current position giati theloume sunexi enhmerwsi tou location


let controlSearch = new L.Control.Search({
  position: "topright",
  layer: featuresLayer,
  propertyName: "name",
  initial: false,
  zoom: 14,
  marker: false
});

mymap.addControl(controlSearch);

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