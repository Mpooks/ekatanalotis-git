async function gotoev(sid,md){
    var formData = new FormData();
    sid=parseInt(sid);
    formData.append('sh', sid);
    const response = await fetch('./setcurrentshop.php',{ method: 'POST', body: formData });
    if(md<=300){
    window.location='evaluationUser.html?#';
    }
    else if(md>300){
      alert("You have to be in a 300m radius to add an offer!");
    }
}

async function gotoeva(sid,md){
  var formData = new FormData();
  sid=parseInt(sid);
  formData.append('sh', sid);
  const response = await fetch('./setcurrentshop.php',{ method: 'POST', body: formData });
  if(md<=300){
  window.location='evaluationAdmin.html?#';
}
else if(md>300){
  alert("You have to be in a 300m radius to add an offer!");
}
}


async function gotol(){
  alert("You have to login first!");
}

async function gotodel(sid){
  var formData = new FormData();
  sid=parseInt(sid);
  formData.append('sh', sid);
  const response = await fetch('./setcurrentshop.php',{ method: 'POST', body: formData });
  window.location='deleteoffer.html';
}

async function getsid(sid){
  var formData = new FormData();
  sid=parseInt(sid);
  formData.append('sh', sid);
  const response = await fetch('./setcurrentshop.php',{ method: 'POST', body: formData });
}