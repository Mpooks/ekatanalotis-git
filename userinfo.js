async function userinfo(){
    const form = document.getElementById("info");
    const btn= document.getElementById("changebtn");
    
    const response = await fetch('./userinfo.php');
        
    var data = await response.json();

    for (let i = 0; i < data.length; i++) {
      document.getElementById("email").value=data[i].email;
      document.getElementById("username").value=data[i].username;
      document.getElementById("passwrd").value=data[i].passw;
      document.getElementById("totals").value=data[i].total_score;
      document.getElementById("months").value=data[i].monthly_score;
      document.getElementById("totaltok").value=data[i].total_tokens;
      document.getElementById("lasttok").value=data[i].last_tokens;
    }
    
    btn.onclick = async function changeUserInfo(event){
     var user=document.getElementById('username').value;
     var email=document.getElementById('email').value;
     var pswrd=document.getElementById('passwrd').value;
     var statusDiv = document.getElementById('status');

     event.preventDefault();
     var nformData = new FormData();
     nformData.append('user', user);
     nformData.append('pass', pswrd);
     nformData.append('email', email);
     const response = await fetch('./updateprof.php',{ method: 'POST', body: nformData });
    
    var ndata = await response.json();

     console.log(ndata);
    for (let i = 0; i < ndata.length; i++) {
      if(ndata[i]==0)
      {
        statusDiv.innerHTML = "You have successfully updated your information!";
      }
      else{
        statusDiv.innerHTML = "This username is already taken!";
      }
    }
  }
    
}