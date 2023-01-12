async function allof(){
    const so = document.getElementById("showoff");
    const f = document.getElementById("showo");
    const title = document.getElementById("shopt");
    const response2 = await fetch('./getshopname.php');
    var data2 = await response2.json();
    for(let k=0;k<data2.length;k++){
      title.innerHTML=data2[k].sname;
    }
    
    const response = await fetch('./shopoffdel.php');
        
    var data = await response.json();
  if (data.length===0){
    const st = document.createElement('h2');
      st.classList.add('offerh2');
      st.textContent='There are no offers active in this shop!';
      so.appendChild(st);
  }else{
    
    for (let j = 0; j < data.length; j++) {
      const v = document.createElement('div');
      v.classList.add('container');
      const p = document.createElement('h3');
      p.classList.add('offerh3');
      p.textContent=data[j].pname;
      const pr = document.createElement('p');
      pr.classList.add('offerp');
      pr.textContent='Price:'+data[j].pr+'€';
      const ld = document.createElement('p');
      ld.classList.add('offerp');
      ld.textContent='20% less than yesterday:'+data[j].ld;
      const lw = document.createElement('p');
      lw.classList.add('offerp');
      lw.textContent='20% less than last week:'+data[j].lw;
      const d = document.createElement('p');
      d.classList.add('offerp');
      d.textContent='Offer date:'+data[j].d;
      const like = document.createElement('p');
      like.classList.add('offerp');
      like.textContent='Likes:'+data[j].lik;
      const disl = document.createElement('p');
      disl.classList.add('offerp');
      disl.textContent='Dislikes:'+data[j].disl;
      const st = document.createElement('p');
      st.classList.add('offerp');
      st.textContent='In stock:'+data[j].st;

      const buttoni=document.createElement('button');
      buttoni.classList.add('offerbutton');
      buttoni.textContent='Delete';
      buttoni.type='button';
      buttoni.addEventListener("click", function(){
        del(data[j].ofID);
    });

      so.appendChild(v);
      v.appendChild(p);
      v.appendChild(pr);
      v.appendChild(d);
      v.appendChild(ld);
      v.appendChild(lw);
      v.appendChild(st);
      v.appendChild(like);
      v.appendChild(disl);
      v.appendChild(buttoni);
    }
    
}
}

async function del(wp){
    const rr=document.getElementById('showoff');
    var nformData = new FormData();
     nformData.append('sh', wp);
     const response1 = await fetch('./deleteOff.php',{ method: 'POST', body: nformData });

     const response = await fetch('./shopoffdel.php');
    rr.innerHTML='';    
    var data = await response.json();
  if (data.length===0){
    const st = document.createElement('h2');
      st.classList.add('offerh2');
      st.textContent='There are no offers active in this shop!';
      rr.appendChild(st);
  }else{
    
    for (let j = 0; j < data.length; j++) {
      const v = document.createElement('div');
      v.classList.add('container');
      const p = document.createElement('h3');
      p.classList.add('offerh3');
      p.textContent=data[j].pname;
      const pr = document.createElement('p');
      pr.classList.add('offerp');
      pr.textContent='Price:'+data[j].pr+'€';
      const ld = document.createElement('p');
      ld.classList.add('offerp');
      ld.textContent='20% less than yesterday:'+data[j].ld;
      const lw = document.createElement('p');
      lw.classList.add('offerp');
      lw.textContent='20% less than last week:'+data[j].lw;
      const d = document.createElement('p');
      d.classList.add('offerp');
      d.textContent='Offer date:'+data[j].d;
      const like = document.createElement('p');
      like.classList.add('offerp');
      like.textContent='Likes:'+data[j].lik;
      const disl = document.createElement('p');
      disl.classList.add('offerp');
      disl.textContent='Dislikes:'+data[j].disl;
      const st = document.createElement('p');
      st.classList.add('offerp');
      st.textContent='In stock:'+data[j].st;

      const buttoni=document.createElement('button');
      buttoni.classList.add('offerbutton');
      buttoni.textContent='Delete';
      buttoni.type='button';
      buttoni.addEventListener("click", function(){
        del(data[j].ofID);
    });

      rr.appendChild(v);
      v.appendChild(p);
      v.appendChild(pr);
      v.appendChild(d);
      v.appendChild(ld);
      v.appendChild(lw);
      v.appendChild(st);
      v.appendChild(like);
      v.appendChild(disl);
      v.appendChild(buttoni);
    }
    
}
 }



  



 

  




       

      




