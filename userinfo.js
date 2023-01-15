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

    for (let i = 0; i < ndata.length; i++) {
      if(ndata[i]==0)
      {
        statusDiv.innerHTML = "You have successfully updated your information!";
      }
      else if(ndata[i]==1){
        statusDiv.innerHTML = "This username is already taken!";
      }
      else if(ndata[i]==2){
        statusDiv.innerHTML = 'Password must contain at least 8 digits, one capital letter, one number, one special character.';
      }
      else{
        statusDiv.innerHTML = "Your credentials have not changed!";
      }
    }
  }
    
}
async function likedof(){
  const liked = document.getElementById("tbliked");
  const lbod = document.getElementById("lbod");
  
  const response = await fetch('./likedoffers.php');
      
  var data = await response.json();

  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement('tr');
    const tdo=document.createElement('td');
    tdo.textContent=data[i].oid;
    const tdp=document.createElement('td');
    tdp.textContent=data[i].prid;
    const tds=document.createElement('td');
    tds.textContent=data[i].shid;
    const tda=document.createElement('td');
    tda.textContent=data[i].act;
      tr.appendChild(tdo);
      tr.appendChild(tdp);
      tr.appendChild(tds);
      tr.appendChild(tda);
      lbod.appendChild(tr)
      liked.appendChild(lbod);
  }
}

async function myof(){
  const liked = document.getElementById("tbo");
  const lbod = document.getElementById("obod");
  
  const response = await fetch('./myoffers.php');
      
  var data = await response.json();

  for (let i = 0; i < data.length; i++) {
    const tr = document.createElement('tr');
    const tdo=document.createElement('td');
    tdo.textContent=data[i].offer_id;
    const tdp=document.createElement('td');
    tdp.textContent=data[i].product_id;
    const tds=document.createElement('td');
    tds.textContent=data[i].sid;
    const tdd=document.createElement('td');
    tdd.textContent=data[i].offer_date;
    const tdli=document.createElement('td');
    tdli.textContent=data[i].likes;
    const tddsl=document.createElement('td');
    tddsl.textContent=data[i].dislikes;
      tr.appendChild(tdo);
      tr.appendChild(tdp);
      tr.appendChild(tds);
      tr.appendChild(tdd);
      tr.appendChild(tdli);
      tr.appendChild(tddsl);
      lbod.appendChild(tr)
      liked.appendChild(lbod);
  }
}

