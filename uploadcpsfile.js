(function(){
    var ub=document.getElementById("cpsubmit");
    var db=document.getElementById("delcps");
    var dbc=document.getElementById("delcat");

  
    ub.onclick = async function(event) {
        event.preventDefault();
        var fileSelect = document.getElementById('cpsfile');
        var statusDiv = document.getElementById('cpsstatus');
  
        statusDiv.innerHTML = 'Uploading . . . ';
        statusDiv.innerHTML = 'Uploading . . . ';
      if(!(document.getElementById("cpsfile") && document.getElementById("cpsfile").value)) {
        statusDiv.innerHTML = "You must select a file first!";
      }else{
        var files = fileSelect.files;
  
        var formData = new FormData();
  
        var file = files[0]; 
        if (!file.type.match('json.*')) {
            statusDiv.innerHTML = 'You cannot upload this file because it’s not a JSON file.';
            return;
        }
        formData.append('cpsfile', file, file.name);
  
        const response = await fetch('./uploadcpsfile.php',{ method: 'POST', body: formData });
      
        var ndata = await response.json();
  
        for (let i = 0; i < ndata.length; i++) {
          if(ndata[i]==0)
          {
            statusDiv.innerHTML = "You have successfully uploaded the file!";
            allpri();
          }
          else if(ndata[i]==1){
            statusDiv.innerHTML = "An error occured please try again!";
          }
          else if(ndata[i]==2){
            statusDiv.innerHTML = "This file does not contain information about categories or products!";
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
    db.onclick = async function(event) {
      event.preventDefault();
      const response = await fetch('./deleteproducts.php');
      
        var ndata = await response.json();
        for (let i = 0; i < ndata.length; i++) {
          if(ndata[i]==0)
          {
            allpri();
            alert("You have successfully deleted all the products!");
          }
          else{
            alert("Something went wrong, please try again!");
          }
    }
  }
  dbc.onclick = async function(event) {
    event.preventDefault();
    const response = await fetch('./deletecat.php');
    
      var ndata = await response.json();
      for (let i = 0; i < ndata.length; i++) {
        if(ndata[i]==0)
        {
          alert("You have successfully deleted all the categories!");
        }
        else{
          alert("Something went wrong, please try again!");
        }
  }
}
 
  async function allpri(){
    const boxes = document.querySelectorAll('.row');

            boxes.forEach(box => {
            box.remove();
            });
    const f = document.getElementById("showp") 
    const d = document.createElement('div');
    d.classList.add('row');
    f.appendChild(d);
    const response = await fetch('./allproducts.php');
        
    var data = await response.json();

    if (data.length===0){
      const st = document.createElement('h3');
      st.classList.add('producth3');
      st.textContent='There are no products in the database!';
      d.appendChild(st);
    }else{
    for (let j = 0; j < data.length; j++) {
      const v = document.createElement('div');
      v.classList.add('container');
      const im = document.createElement('img');
      im.classList.add('productimg');
      const response1 = await fetch(data[j].pimage);

    if (response1.status === 200) {
        im.src = data[j].pimage;
    }
      const na = document.createElement('h3');
      na.classList.add('producth3');
      na.textContent=data[j].pname;
      const pr = document.createElement('h4');
      if(data[j].pp==0)
      {
        pr.textContent='No price available';
      }else{
        pr.textContent=data[j].pp+'€';
      }
      pr.classList.add('producth4');
      d.appendChild(v);
      v.appendChild(im);
      v.appendChild(na);
      v.appendChild(pr);
    
  }
}
}

})();
  
  