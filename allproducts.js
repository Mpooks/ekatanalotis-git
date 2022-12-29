async function allpr(){
    const d = document.getElementById("showprod");
    const f = document.getElementById("showp") 
    
    const response = await fetch('./allproducts.php');
        
    var data = await response.json();
;
  if (data.length===0){
    const st = document.createElement('h2');
      st.classList.add('producth2');
      st.textContent='There are no products in the database!';
      d.appendChild(st);
  }else{

    for (let j = 0; j < data.length; j++) {
      const v = document.createElement('div');
      v.classList.add('container');
      const im = document.createElement('img');
      im.classList.add('productimg');
      const response1 = await fetch(data[j].pimage);

    if (response1.status === 200) {
        im.src = data[j].pimage;
    }
      const na = document.createElement('h3');
      na.classList.add('producth3');
      na.textContent=data[j].pname;
      const pr = document.createElement('h4');
      if(data[j].pp==0)
      {
        pr.textContent='No price available';
      }else{
        pr.textContent=data[j].pp+'€';
      }
      
      pr.classList.add('producth4');
      d.appendChild(v);
      v.appendChild(im);
      v.appendChild(na);
      v.appendChild(pr);
    
  }
}
}