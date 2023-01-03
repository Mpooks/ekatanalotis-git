async function gotoev(sid){
    var formData = new FormData();
    sid=parseInt(sid);
    formData.append('sh', sid);
    const response = await fetch('./setcurrentshop.php',{ method: 'POST', body: formData });
    window.location='evaluationUser.html';
  }