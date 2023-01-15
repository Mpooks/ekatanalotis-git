var form = document.getElementById('RegisterUser');
const regc=document.getElementById('cr');

form.onsubmit =  async function(event) {
   var email=document.getElementById('emailr').value;
   var cpswrd=document.getElementById('cpassr').value;
   var user=document.getElementById('userr').value;
   var pswrd=document.getElementById('passr').value;
   var statusDiv = document.getElementById('statusr');
   var uploadButton = document.getElementById('regg');


   event.preventDefault();
   var formData = new FormData();
   formData.append('email', email);
   formData.append('user', user);
   formData.append('pass', pswrd);
   formData.append('cpass', cpswrd);
   const response = await fetch('./register.php',{ method: 'POST', body: formData });
   
   var data = await response.json();
   if (data.length==0) {
       statusDiv.innerHTML = 'Something went wrong, please try again.';
   }
   else{
       for (let i = 0; i < data.length; i++) {
        if(data[i]==0)
        {
            document.location.href  = 'arxikhafterloginUser.html';
        }
        else if(data[i]==1)
        {
            statusDiv.innerHTML = 'This username is already in use.';
        }
        else if(data[i]==2)
        {
            statusDiv.innerHTML = 'This email is already in use.';
        }
        else if(data[i]==3)
        {
            statusDiv.innerHTML = 'This email and this username is already in use.';
        }
        else if(data[i]==4)
        {
            statusDiv.innerHTML = 'The form of the email is not valid.';
        }
        else if(data[i]==5)
        {
            statusDiv.innerHTML = 'Password cannot contain white space.';
        }
        else if(data[i]==6)
        {
            statusDiv.innerHTML = 'Password must contain at least 8 digits, one capital letter, one number, one special character.';
        }
        else if(data[i]==7)
        {
            statusDiv.innerHTML = 'Passwords do not match.';
        }
   }
   }
}

regc.onclick=function(){
    var email=document.getElementById('emailr');
    var cpswrd=document.getElementById('cpassr');
    var user=document.getElementById('userr');
    var pswrd=document.getElementById('passr');
    var statusDiv = document.getElementById('statusr');
    user.value='';
    pswrd.value='';
    email.value='';
    cpswrd.value='';
    statusDiv.innerHTML='';
}

