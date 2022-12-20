(function(){
  var form = document.getElementById('file-form');
  var fileSelect = document.getElementById('myfile');
  var uploadButton = document.getElementById('submit');
  var statusDiv = document.getElementById('status');

  form.onsubmit = function(event) {
      event.preventDefault();

      statusDiv.innerHTML = 'Uploading . . . ';
      var files = fileSelect.files;

      var formData = new FormData();

      var file = files[0]; 
      if (!file.type.match('json.*')) {
          statusDiv.innerHTML = 'You cannot upload this file because it’s not a JSON file.';
          return;
      }
      formData.append('myfile', file, file.name);

      var xhr = new XMLHttpRequest();

      xhr.open('POST', './uploadfile.php', true);
  
      xhr.onload = function () {
        if (xhr.status === 200) {
          statusDiv.innerHTML = 'Your upload is successful..';
        } else {
          statusDiv.innerHTML = 'An error occurred during the upload. Try again.';
        }
      };
      xhr.send(formData);
  }
})();
