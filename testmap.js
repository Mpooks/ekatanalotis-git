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
  let marker = L.marker(L.latLng(lat,long), {title: title });
  marker.bindPopup("title: " + title);
  marker.addTo(markersLayer);
}
}
  var form = document.getElementById('file-form');
  
  var uploadButton = document.getElementById('up');
  var delb = document.getElementById('del');
  

  uploadButton.onclick = async function(event) {
      event.preventDefault();
      var fileSelect = document.getElementById('myfile');
      var statusDiv = document.getElementById('status');

      statusDiv.innerHTML = 'Uploading . . . ';
      if(!(document.getElementById("myfile") && document.getElementById("myfile").value)) {
        statusDiv.innerHTML = "You must select a file first!";
      }else{
      var files = fileSelect.files;

      var formData = new FormData();

      var file = files[0]; 
      if (!file.type.match('json.*')) {
          statusDiv.innerHTML = 'You cannot upload this file because it’s not a JSON file.';
          return;
      }
      formData.append('myfile', file, file.name);

      const response = await fetch('./uploadfile.php',{ method: 'POST', body: formData });
    
      var ndata = await response.json();

      for (let i = 0; i < ndata.length; i++) {
        if(ndata[i]==0)
        {
          statusDiv.innerHTML = "You have successfully uploaded the file!";
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
        else if(ndata[i]==1){
          statusDiv.innerHTML = "An error occured please try again!";
        }
        else if(ndata[i]==2){
          statusDiv.innerHTML = "This file does not contain information about shops!";
        }
        else if(ndata[i]==3){
          statusDiv.innerHTML = "This file is corrupted! Please try again!";
        }
        else{
          statusDiv.innerHTML = "This file is empty!";
        }
      }
    }
  }
  delb.onclick = async function(event) {
    event.preventDefault();
    const response = await fetch('./deleteshops.php');
    
      var ndata = await response.json();
      for (let i = 0; i < ndata.length; i++) {
        if(ndata[i]==0)
        {
          alert("You have successfully deleted all the shops!");
          markersLayer.clearLayers();
        }
        else{
          alert("Something went wrong, please try again!");
        }
  }
}
}
