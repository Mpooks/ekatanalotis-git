async function logornot(){

    const response = await fetch('./logornot.php');
    var ndata = await response.json();

    for (let i = 0; i < ndata.length; i++) {
      if(ndata[i]==1)
      {
        document.location.href  = 'arxikh.html#logIn';
      }
    }

}