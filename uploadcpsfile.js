(function(){
    var cpsform = document.getElementById('cpsform');
  
    cpsform.onsubmit = async function(event) {
        event.preventDefault();
        var fileSelect = document.getElementById('cpsfile');
        var statusDiv = document.getElementById('cpsstatus');
  
        statusDiv.innerHTML = 'Uploading . . . ';
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

  })();
  