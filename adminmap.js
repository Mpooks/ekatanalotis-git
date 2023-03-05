function notclose(){
  alert("You have to be in a 50m radius to add an offer!");
}
var pclat,pclng;
const wantedd=50;
const mymap = L.map('mapid');       //kataskevazoume to map
const redIcon = new L.Icon({iconUrl:'marker-icon-2x-red.png',iconSize: [25, 41],
iconAnchor: [12, 41],popupAnchor: [1, -34],});
const violetIcon = new L.Icon({iconUrl:'marker-icon-2x-violet.png',iconSize: [25, 41],
iconAnchor: [12, 41],popupAnchor: [1, -34],});

mymap.setView([38.25972,21.74328] , 16);   //thetoume suntetagmenes kai to zoom

mymap.addLayer(
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
  );  // eisagwgi dedomenwn sto map mas mesw tou link

let marker, circle;
let markersLayer = L.layerGroup(); 
function dist(plat,plng){
  if ((pclat == plat) && (pclng == plng)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * pclat/180;
    var radlat2 = Math.PI * plat/180;
    var theta = pclng-plng;
    var radtheta = Math.PI * theta/180;
    var distance = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (distance > 1) {
      distance = 1;
    }
    distance = Math.acos(distance);
    distance = distance * 180/Math.PI;
    distance = distance * 60 * 1.1515;
    distance = (distance * 1.609344)*1000;
    return distance;
  }
}
function setcc(clat,clng){
  pclat=clat;
  pclng=clng;

}
async function mapd(){
    setmap();
    
    navigator.geolocation.getCurrentPosition(success, error);        //vazoume watchposition kai oxi to current position giati theloume sunexi enhmerwsi tou location

    function success(pos) {
        if (marker) {                           // meta apo kathe update diagrafei to palio marker an uparxei                   
            mymap.removeLayer(marker);
            mymap.removeLayer(circle);
        }
    
        const clat=pos.coords.latitude;    //geografiko platos 
        const clng=pos.coords.longitude;      //geografiko mikos 
        marker = L.marker(L.latLng(clat,clng), {icon:violetIcon}).addTo(mymap);                             // thetei kuklo kai marker sto map meta apo reload
        circle = L.circle([clat, clng], { radius: 50 }).addTo(mymap);
        circle.setStyle({color: 'violet'});
        setcc(clat,clng);
        setmap();
      }
      function error(err) {
        
        if (err.code === 1) {
            alert("Please allow geolocation access");
        } else {
            alert("Cannot get current location");
        }
    
    }
    
    let controlSearch = new L.Control.Search({
      position: "topright",
      layer: markersLayer,
      propertyName: "title",
      initial: false,
      zoom: null,
      marker: false,
    });
    
    mymap.addControl(controlSearch);
  }
    async function setmap(){
    const response = await fetch('./shopsformap.php');
        
    var data = await response.json();
    mymap.addLayer(markersLayer);
    markersLayer.clearLayers();

    if (JSON.stringify(data)=='{}') {
    
    }
    else{
    for (i in data) {
      let title = data[i].sname;
      let lat=parseFloat(data[i].latitude);
      let long=parseFloat(data[i].longitude);
      let sid=data[i].shopid;
      
      var md=dist(lat,long);
      var formData1= new FormData();
      formData1.append('s', data[i].shopid);
      const response1 = await fetch('./findoffers.php',{ method: 'POST', body: formData1 });
            
      var data1 = await response1.json();
      if (data1.length==0) {
        if(md>wantedd || isNaN(md)){
        let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<button class="noofbut" onclick="notclose()"> Add </button>','<h3 class="popuph3">'+data[i].sname+'</h3>']
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
      }
      else{
        let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<a href="#offerd"><button class="noofbut" onclick="getsid('+sid+')"> Add </button></a>','<h3 class="popuph3">'+data[i].sname+'</h3>']
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
      }
        
      }
      else{
        var str='';
        for(j in data1){
          var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
          str=str.concat(a);
        }
        if(md>wantedd || isNaN(md)){
          let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<button class="but" onclick="notclose()"> Add </button>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
          marker.addTo(markersLayer);
        }
        else{
          let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<a href="#offerd"><button class="but" onclick="getsid('+sid+')"> Add </button></a>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
          marker.addTo(markersLayer);
        }
         
    }
    
    }
    }
    
    
    var is = document.getElementById('searchtext9');
    var el = document.querySelector(".search-button");
    var searchc = document.querySelector(".search-cancel");
    searchc.onclick = async function(event){
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
      let sid=data[i].shopid;
      
      var md=dist(lat,long);
      
      var formData1= new FormData();
      formData1.append('s', data[i].shopid);
      const response1 = await fetch('./findoffers.php',{ method: 'POST', body: formData1 });
            
      var data1 = await response1.json();
      if (data1.length==0) {
        if(md>wantedd || isNaN(md)){
          let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<button class="noofbut" onclick="notclose()"> Add </button>','<h3 class="popuph3">'+data[i].sname+'</h3>']
    
          let marker = L.marker(L.latLng(lat,long), {title: title});
          marker.bindPopup(template[2] + template[0] + template[1] );
          marker.addTo(markersLayer);
        }else{
        let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<a href="#offerd"><button class="noofbut" onclick="getsid('+sid+')"> Add </button></a>','<h3 class="popuph3">'+data[i].sname+'</h3>']
    
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
        }
      }
      else{
        var str='';
        for(j in data1){
          var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
          str=str.concat(a);
        }
        if(md>wantedd || isNaN(md)){
          let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<button class="but" onclick="notclose()"> Add </button>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
          marker.addTo(markersLayer);
        }else{
          let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<a href="#offerd"><button class="but" onclick="getsid('+sid+')"> Add </button></a>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
          marker.addTo(markersLayer);
        }
      }
    
      }
      }
    }
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
      let sid=data[i].shopid;
      
      var md=dist(lat,long);
    
      var formData1= new FormData();
      formData1.append('s', data[i].shopid);
      const response1 = await fetch('./findoffers.php',{ method: 'POST', body: formData1 });
            
      var data1 = await response1.json();
      if (data1.length==0) {
        if(md>wantedd || isNaN(md)){
          let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<button class="noofbut" onclick="notclose()"> Add </button>','<h3 class="popuph3">'+data[i].sname+'</h3>']
    
          let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
        }else{
        let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<a href="#offerd"><button class="noofbut" onclick="getsid('+sid+')"> Add </button></a>','<h3 class="popuph3">'+data[i].sname+'</h3>']
    
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
        }
      }
      else{
        var str='';
        for(j in data1){
          var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
          str=str.concat(a);
        }
        if(md>wantedd || isNaN(md)){
          let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<button class="but" onclick="notclose()"> Add </button>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
          marker.addTo(markersLayer);
        }else{
          let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<a href="#offerd"><button class="but" onclick="getsid('+sid+')"> Add </button></a>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
          marker.addTo(markersLayer);
        }
      }
    
      }
      }
    
      }else{
        var c = document.getElementById('searchtext9').value;
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
          let sid=data[i].shopid;
          let col=data[i].color;
          var md=dist(lat,long);
          if(col==0){
          var formData1= new FormData();
          formData1.append('sH', data[i].shopid);
          formData1.append('shopis', title);
    
            const response1 = await fetch('./offersfromsearchshop.php',{ method: 'POST', body: formData1 });
                
            var data1 = await response1.json();
              var str='';
              for(j in data1){
                var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
                str=str.concat(a);
              }
    
            let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
            if(md>wantedd || isNaN(md)){
              let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<button class="but" onclick="notclose()"> Add </button>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
               marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
               marker.addTo(markersLayer);
            }else{
            let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<a href="#offerd"><button class="but" onclick="getsid('+sid+')"> Add </button></a>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
               marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
               marker.addTo(markersLayer);
            }
            
          }else{
          let marker = L.marker(L.latLng(lat,long));
          if(md>wantedd || isNaN(md)){
            let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<button class="noofbut" onclick="notclose()"> Add </button>','<h3 class="popuph3">'+data[i].sname+'</h3>']
          marker.bindPopup(template[2] + template[0] + template[1] );
          marker.addTo(markersLayer);
          }else{
          let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<a href="#offerd"><button class="noofbut" onclick="getsid('+sid+')"> Add </button></a>','<h3 class="popuph3">'+data[i].sname+'</h3>']
          marker.bindPopup(template[2] + template[0] + template[1] );
          marker.addTo(markersLayer);
          }
        }
        
        
        }
        }
    
        }
      }
    
    is.addEventListener("keypress", async function(event) {
        document.getElementById('selectcat').value='black';
        var c = document.getElementById('searchtext9').value;
        if (event.key === "Enter") {
    
          el.click();
        }
      });
    
    
    var sel = document.getElementById('selectcat');
    sel.onchange = async function getSelected(){
      document.getElementById('searchtext9').value=null;
        var se = document.getElementById('selectcat').value;
        if(se!=='black'){
        var formData = new FormData();
        formData.append('select', se);
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
          let sid=data[i].shopid;
          
          var md=dist(lat,long);
        
          var formData1= new FormData();
          formData1.append('sH',sid);
          formData1.append('select', se);
          const response1 = await fetch('./offersfromsearchcat.php',{ method: 'POST', body: formData1 });
                
          var data1 = await response1.json();
          if (data1.length==0) {
            if(md>wantedd || isNaN(md)){
              let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<button class="noofbut" onclick="notclose()"> Add </button>','<h3 class="popuph3">'+data[i].sname+'</h3>']
    
              let marker = L.marker(L.latLng(lat,long), {title: title});
              marker.bindPopup(template[2] + template[0] + template[1]);
              marker.addTo(markersLayer);
            }else{
            let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<a href="#offerd"><button class="noofbut" onclick="getsid('+sid+')"> Add </button></a>','<h3 class="popuph3">'+data[i].sname+'</h3>']
    
            let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1]);
        marker.addTo(markersLayer);
            }
          }
          else{
            var str='';
            for(j in data1){
              var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
              str=str.concat(a);
            }
            if(md>wantedd || isNaN(md)){
              let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<button class="but" onclick="notclose()"> Add </button>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
              let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
              marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
              marker.addTo(markersLayer);
            }else{
              let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<a href="#offerd"><button class="but" onclick="getsid('+sid+')"> Add </button></a>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
              let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
              marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
              marker.addTo(markersLayer);
            }
        }
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
      let sid=data[i].shopid;
      
      var md=dist(lat,long);
    
      var formData1= new FormData();
      formData1.append('s', data[i].shopid);
      const response1 = await fetch('./findoffers.php',{ method: 'POST', body: formData1 });
            
      var data1 = await response1.json();
      if (data1.length==0) {
        if(md>wantedd || isNaN(md)){
          let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<button class="noofbut" onclick="notclose()"> Add </button>','<h3 class="popuph3">'+data[i].sname+'</h3>']
    
          let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
        }else{
        let template = [ `<div class="row" id="rowr"><h2 class="popuph2">No offers!</h2></div>`,'<a href="#offerd"><button class="noofbut" onclick="getsid('+sid+')"> Add </button></a>','<h3 class="popuph3">'+data[i].sname+'</h3>']
    
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
        }
      }
      else{
        var str='';
        for(j in data1){
          var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
          str=str.concat(a);
        }
        if(md>wantedd || isNaN(md)){
          let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<button class="but" onclick="notclose()"> Add </button>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
          marker.addTo(markersLayer);
        }else{
          let template = ['<button class="but" id="'+sid+'" onclick="gotoeva('+sid+','+md+')"> Review </button>','<a href="#offerd"><button class="but" onclick="getsid('+sid+')"> Add </button></a>','<h2 class="popuph3">'+title+'</h2>','<div class="row" id="rowr">'+str+'</div>','<button class="but" onclick="gotodel('+sid+')"> Delete </button>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1] + template[4]);
          marker.addTo(markersLayer);
        }
    }
              }
              }
    
    }
    }
    }
  
 