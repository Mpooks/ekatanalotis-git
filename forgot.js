var fform = document.getElementById('forgotp');

const fc=document.getElementById('cf');

 fform.onsubmit =  async function(event) {
    var email=document.getElementById('emailf').value;
    var pswrd=document.getElementById('passf').value;
    var user=document.getElementById('userf').value;
    var statusDiv = document.getElementById('statusf');
    var pswrdf = document.getElementById('passff').value;

    event.preventDefault();
    var formData = new FormData();
    formData.append('email', email);
    formData.append('user', user);
    formData.append('pass', pswrd);
    formData.append('rpass', pswrdf);
    const response = await fetch('./changepass.php',{ method: 'POST', body: formData });
    
    var data = await response.json();
    if (data.length==0) {
        statusDiv.innerHTML = 'Something went wrong, please try again.';
    }
    else{
        for (let i = 0; i < data.length; i++) {
         if(data[i]==0)
         {
            statusDiv.innerHTML = 'The new password must be different from the previous one.';
         }
         else if(data[i]==1)
         {
            statusDiv.innerHTML = 'Password cannot contain white space.';
         }
         else if(data[i]==2)
         {
            statusDiv.innerHTML = 'Password must contain at least 8 digits, one capital letter, one number, one special character.';
         }
         else if(data[i]==3)
         {
            statusDiv.innerHTML = 'You have succesfully changed your password. Proceed with login!';
         }
         else if(data[i]==4)
         {
            statusDiv.innerHTML = 'Passwords do not match.';
         }
         else if(data[i]==5)
         {
            statusDiv.innerHTML = 'This email does not correspond to this account.';
         }
         else if(data[i]==6)
         {
            statusDiv.innerHTML = 'This account does not exist.';
         }
    }
    }
}

fc.onclick=function(){
    var email=document.getElementById('emailf');
    var pswrd=document.getElementById('passf');
    var user=document.getElementById('userf');
    var statusDiv = document.getElementById('status');
    var pswrdf = document.getElementById('passff');
    user.value='';
    pswrd.value='';
    email.value='';
    pswrdf.value='';
    statusDiv.innerHTML='';
}

