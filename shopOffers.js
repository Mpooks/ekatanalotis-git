const ldo = new Array();
async function liked(){

    const response2 = await fetch('./isliked.php');
    var data2=await response2.json();
    if (data2.length===0){

    }else{
    for (let v = 0; v < data2.length; v++) {
        ldo.push(data2[v]);
    }
}
}
async function allof(){
    const so = document.getElementById("showoff");
    const f = document.getElementById("showo");
    const title = document.getElementById("shopt");
    const response3 = await fetch('./getshopname.php');
    
    var data3 = await response3.json();
    for(let k=0;k<data3.length;k++){
      title.innerHTML=data3[k].sname;
    }

    
    const response = await fetch('./shopsoffers.php');
        
    var data = await response.json();
  if (data.length===0){
    const st = document.createElement('h2');
      st.classList.add('offerh2');
      st.textContent='There are no offers from other users to review in this shop!';
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
      buttoni.textContent='Details';
      buttoni.id=data[j].pid;
      buttoni.addEventListener("click", function(){
        op(data[j].sc,data[j].ofID,data[j].pname,data[j].pr,data[j].ld,data[j].lw,data[j].d,data[j].lik,data[j].disl,data[j].st,data[j].imagep,data[j].username);
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
async function op(score,oDP,p,pr,ld,lw,d,like,disl,st,pim,us){
    const im=document.getElementById("offid");
    im.src = pim;
    const pn=document.getElementById("pname");
    pn.textContent=p;
    const datt=document.getElementById("dat");
    datt.textContent='Offer date: '+d;
    const prr=document.getElementById("price");
    prr.textContent='Price: '+pr+'€';
    const ltdd=document.getElementById("ltd");
    ltdd.textContent='20% less than yesterday: '+ld;
    const ltww=document.getElementById("ltw");
    ltww.textContent='20% less than last week: '+lw;
    const inss=document.getElementById("ins");
    inss.textContent=st;
    inss.onclick = async function(){
        if(inss.textContent=='YES')
        {
            inss.textContent='NO';
            var formData = new FormData();
            formData.append('p',oDP);
            const response = await fetch('./changestock.php',{ method: 'POST', body: formData });
            document.getElementById("likeb").disabled = true;
            document.getElementById("dislikeb").disabled = true;
        }
        else{
            inss.textContent='YES';
            var formData = new FormData();
            formData.append('p',oDP);
            const response = await fetch('./changestock.php',{ method: 'POST', body: formData });
            document.getElementById("likeb").disabled = false;
            document.getElementById("dislikeb").disabled = false;
        }
    }
    
    const usernn=document.getElementById("usern");
    usernn.textContent='Username: '+us;
    const sco=document.getElementById("scoree");
    sco.textContent='Total score: '+score;
    const ll=document.getElementById("likes");
    ll.textContent='Likes: '+like;
    const dsl=document.getElementById("dislikes");
    dsl.textContent='Dislikes: '+disl;
    const lbut=document.getElementById("likeb");
    const dlbut=document.getElementById("dislikeb");
    dlbut.className='beforebd';
    lbut.className='beforebl';


    if(inss.textContent=='YES'){
        document.getElementById("likeb").disabled = false;
        document.getElementById("dislikeb").disabled = false;
    }else{
        document.getElementById("likeb").disabled = true;
        document.getElementById("dislikeb").disabled = true;
    }

    if(ldo.length!==0){
        for (i = 0; i < ldo.length; i++) {
            if (ldo[i].liked_offer === oDP) {
                if(ldo[i].actionl=='LIKE'){
                    lbut.classList.add('afterbl');
                    lbut.classList.remove('beforebl');
                }else if(ldo[i].actionl=='DISLIKE'){
                    dlbut.classList.add('afterbd');
                    dlbut.classList.remove('beforebd');
                }
            }
        }
        
    }
    lbut.onclick = async function(){
        if(dlbut.classList.contains('afterbd')){
            dlbut.classList.add('beforebd');
            dlbut.classList.remove('afterbd');
            var formData = new FormData();
            formData.append('o',oDP);
            const response = await fetch('./removedislike.php',{ method: 'POST', body: formData });
        }
        if(lbut.classList.contains('afterbl')){
            lbut.classList.add('beforebl');
            lbut.classList.remove('afterbl');
            var formData = new FormData();
            formData.append('o',oDP);
            const response = await fetch('./removelike.php',{ method: 'POST', body: formData });
        }else{
            lbut.classList.add('afterbl');
            lbut.classList.remove('beforebl');
            var formData = new FormData();
            formData.append('o',oDP);
            const response = await fetch('./addlike.php',{ method: 'POST', body: formData });
        }
    }

    dlbut.onclick = async function(){
        if(lbut.classList.contains('afterbl')){
            lbut.classList.add('beforebl');
            lbut.classList.remove('afterbl');
            var formData = new FormData();
            formData.append('o',oDP);
            const response = await fetch('./removelike.php',{ method: 'POST', body: formData });
        }
        if(dlbut.classList.contains('afterbd')){
            dlbut.classList.add('beforebd');
            dlbut.classList.remove('afterbd');
            var formData = new FormData();
            formData.append('o',oDP);
            const response = await fetch('./removedislike.php',{ method: 'POST', body: formData });
        }else{
            dlbut.classList.add('afterbd');
            dlbut.classList.remove('beforebd');
            var formData = new FormData();
            formData.append('o',oDP);
            const response = await fetch('./adddislike.php',{ method: 'POST', body: formData });
        }
    }

    window.location.href  = "?#offerd";
  }
}
  async function clf(){
    const so=document.getElementById('showoff');
    so.innerHTML='';
    ldo.length=0;
    liked();
    allof();
    
  }


  



 

  




       

      




