async function gotoev(sid){
    var formData = new FormData();
    sid=parseInt(sid);
    formData.append('sh', sid);
    const response = await fetch('./setcurrentshop.php',{ method: 'POST', body: formData });
    window.location='evaluationUser.html?#';
}

async function gotoeva(sid){
  var formData = new FormData();
  sid=parseInt(sid);
  formData.append('sh', sid);
  const response = await fetch('./setcurrentshop.php',{ method: 'POST', body: formData });
  window.location='evaluationAdmin.html?#';
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