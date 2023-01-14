var fform = document.getElementById('forgotp');

const fc=document.getElementById('cf');

 fform.onsubmit =  async function(event) {

    var email=document.getElementById('emailf').value;
    var pswrd=document.getElementById('passf').value;
    var statusDiv = document.getElementById('status');
    var pswrdf = document.getElementById('emailff');

    event.preventDefault();
    var formData = new FormData();
    formData.append('email', user);
    formData.append('pass', pswrd);
    const response = await fetch('./authentication.php',{ method: 'POST', body: formData });
    
    var data = await response.json();
    if (data.length==0) {
        statusDiv.innerHTML = 'Not valid credentials.';
    }
    else{
        for (let i = 0; i < data.length; i++) {
        if((data[i].isadmin).localeCompare('YES')==0)
        {
        document.location.href = 'arxikhafterloginAdmin.html';
        }else{
        document.location.href  = 'arxikhafterloginUser.html';
        }
    }
    }
}

fc.onclick=function(){
    var user=document.getElementById('user');
    var pswrd=document.getElementById('pass');
    var statusDiv = document.getElementById('status');
    user.value='';
    pswrd.value='';
    statusDiv.innerHTML='';
}

