(function(){
    var pform = document.getElementById('priceform');
    pform.onsubmit = async function(event) {
        event.preventDefault();
        var fileSelect = document.getElementById('pfile');
        var statusDiv = document.getElementById('pstatus');
  
        statusDiv.innerHTML = 'Uploading . . . ';
        var files = fileSelect.files;
  
        var formData = new FormData();
  
        var file = files[0]; 
        if (!file.type.match('json.*')) {
            statusDiv.innerHTML = 'You cannot upload this file because it’s not a JSON file.';
            return;
        }
        formData.append('pfile', file, file.name);
  
        const response = await fetch('./uploadpfile.php',{ method: 'POST', body: formData });
      
        var ndata = await response.json();
  
        for (let i = 0; i < ndata.length; i++) {
          if(ndata[i]==0)
          {
            statusDiv.innerHTML = "You have successfully uploaded the file!";
          }
          else if(ndata[i]==1){
            statusDiv.innerHTML = "An error occured please try again!";
          }
          else if(ndata[i]==2){
            statusDiv.innerHTML = "This file does not contain information about product prices!";
          }
          else if(ndata[i]==3){
            statusDiv.innerHTML = "This file is corrupted! Please try again!";
          }
          else if(ndata[i]==4){
            statusDiv.innerHTML = "This file is empty!";
          }
          else{
            statusDiv.innerHTML = "You cannot add prices because you have no products in the database!";
          }
        }
    }
  })();
  