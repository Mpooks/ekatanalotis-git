async function mapd(){
 
    const response = await fetch('./shopsformap.php');
        
    var data = await response.json();
    
    const mymap = L.map('mapid');       //kataskevazoume to map
    
    mymap.setView([38.25972,21.74328] , 16);   //thetoume suntetagmenes kai to zoom
    
    mymap.addLayer(
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      );  // eisagwgi dedomenwn sto map mas mesw tou link
      var redIcon = new L.Icon({iconUrl:'marker-icon-2x-red.png',iconSize: [25, 41],
      iconAnchor: [12, 41],popupAnchor: [1, -34],});
    let marker, circle, zoomed;
        
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
      let sid=data[i].shopid;
      
    
      var formData1= new FormData();
      formData1.append('s', data[i].shopid);
      const response1 = await fetch('./findoffers.php',{ method: 'POST', body: formData1 });
            
      var data1 = await response1.json();
      if (data1.length==0) {
        let template = [ `<div class="row"><h2 class="popuph2">No offers!</h2></div>`,`<button class="noofbut" onclick="gotol()"> New offer </button>`,'<h3 class="popuph3">'+data[i].sname+'</h3>']
    
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
      }
      else{
        var str='';
        for(j in data1){
          var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
          str=str.concat(a);
        }
          let template = ['<button class="but" onclick="gotol()"> Review </button>',`<button class="but" onclick="gotol()"> New offer </button>`,'<h2 class="popuph3">'+title+'</h2>','<div class="row">'+str+'</div>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1]);
         marker.addTo(markersLayer);
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
      
    
      var formData1= new FormData();
      formData1.append('s', data[i].shopid);
      const response1 = await fetch('./findoffers.php',{ method: 'POST', body: formData1 });
            
      var data1 = await response1.json();
      if (data1.length==0) {
        let template = [ `<div class="row"><h2 class="popuph2">No offers!</h2></div>`,`<button class="noofbut" onclick="gotol()"> New offer </button></a>`,'<h3 class="popuph3">'+data[i].sname+'</h3>']
    
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
      }
      else{
        var str='';
        for(j in data1){
          var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
          str=str.concat(a);
        }
          let template = ['<button class="but" id="'+sid+'" onclick="gotol()"> Review </button>',`<button class="but" onclick="gotol()"> New offer </button>`,'<h2 class="popuph3">'+title+'</h2>','<div class="row">'+str+'</div>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1]);
         marker.addTo(markersLayer);
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
      
    
      var formData1= new FormData();
      formData1.append('s', data[i].shopid);
      const response1 = await fetch('./findoffers.php',{ method: 'POST', body: formData1 });
            
      var data1 = await response1.json();
      if (data1.length==0) {
        let template = [ `<div class="row"><h2 class="popuph2">No offers!</h2></div>`,`<button class="noofbut" onclick="gotol()"> New offer </button>`,'<h3 class="popuph3">'+data[i].sname+'</h3>']
    
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
      }
      else{
        var str='';
        for(j in data1){
          var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
          str=str.concat(a);
        }
          let template = ['<button class="but" id="'+sid+'" onclick="gotol()"> Review </button>',`<button class="but" onclick="gotol()"> New offer </button>`,'<h2 class="popuph3">'+title+'</h2>','<div class="row">'+str+'</div>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1]);
         marker.addTo(markersLayer);
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
            let template = ['<button class="but" id="'+sid+'" onclick="gotol()"> Review </button>',`<button class="but" onclick="gotol()"> New offer </button>`,'<h2 class="popuph3">'+title+'</h2>','<div class="row">'+str+'</div>'];
               marker.bindPopup(template[2] + template[3] + template[0] + template[1]);
               marker.addTo(markersLayer);  
            
          }else{
          let marker = L.marker(L.latLng(lat,long));
          let template = [ `<div class="row"><h2 class="popuph2">No offers!</h2></div>`,`<button class="noofbut" onclick="gotol()"> New offer </button>`,'<h3 class="popuph3">'+data[i].sname+'</h3>']
          marker.bindPopup(template[2] + template[0] + template[1]);
             marker.addTo(markersLayer);
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
          
        
          var formData1= new FormData();
          formData1.append('sH',sid);
          formData1.append('select', se);
          const response1 = await fetch('./offersfromsearchcat.php',{ method: 'POST', body: formData1 });
                
          var data1 = await response1.json();
          if (data1.length==0) {
            let template = [ `<div class="row"><h2 class="popuph2">No offers!</h2></div>`,`<button class="noofbut" onclick="gotol()"> New offer </button>`,'<h3 class="popuph3">'+data[i].sname+'</h3>']
    
            let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
            marker.addTo(markersLayer);
          }
          else{
            var str='';
            for(j in data1){
              var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
              str=str.concat(a);
            }
              let template = ['<button class="but" id="'+sid+'" onclick="gotol()"> Review </button>',`<button class="but" onclick="gotol()"> New offer </button>`,'<h2 class="popuph3">'+title+'</h2>','<div class="row">'+str+'</div>'];
              let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
              marker.bindPopup(template[2] + template[3] + template[0] + template[1]);
             marker.addTo(markersLayer);
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
     
    
      var formData1= new FormData();
      formData1.append('s', data[i].shopid);
      const response1 = await fetch('./findoffers.php',{ method: 'POST', body: formData1 });
            
      var data1 = await response1.json();
      if (data1.length==0) {
        let template = [ `<div class="row"><h2 class="popuph2">No offers!</h2></div>`,`<button class="noofbut" onclick="gotol()"> New offer </button>`,'<h3 class="popuph3">'+data[i].sname+'</h3>']
    
        let marker = L.marker(L.latLng(lat,long), {title: title});
        marker.bindPopup(template[2] + template[0] + template[1] );
        marker.addTo(markersLayer);
      }
      else{
        var str='';
        for(j in data1){
          var a='<div class="container"><p class="ps">'+data1[j].pname+'</p><p class="popp">Price: '+data1[j].pr+'</p><p class="popp">20% less than yesterday: '+data1[j].ld+'</p><p class="popp">20% less than last week: '+data1[j].lw+'</p><p class="popp">Offer date: '+data1[j].d+'</p><p class="popp">Likes: '+data1[j].lik+'</p><p class="popp">Dislikes: '+data1[j].disl+'</p><p class="popp">In stock: '+data1[j].st+'</p></div>';
          str=str.concat(a);
        }
          let template = ['<button class="but" id="'+sid+'" onclick="gotol()"> Review </button>',`<button class="but" onclick="gotol()"> New offer </button>`,'<h2 class="popuph3">'+title+'</h2>','<div class="row">'+str+'</div>'];
          let marker = L.marker(L.latLng(lat,long), {icon:redIcon});
          marker.bindPopup(template[2] + template[3] + template[0] + template[1]);
         marker.addTo(markersLayer);
    }
              }
              }
    
    }
    }
    }