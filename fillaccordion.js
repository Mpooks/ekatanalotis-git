async function fillacc(){

    const select = document.getElementById("cats");
    
    const response = await fetch('./categoriesfordropdown.php');
        
    var data = await response.json();
    if (data.length==0) {
    }
    else{
    for (let i = 0; i < data.length; i++) {
      const fd=document.createElement('div');
      const fp=document.createElement('p');
      fp.classList.add('second-level-menu');
      fp.textContent=data[i].cname;
      fd.appendChild(fp);
      const slp=document.createElement('div');
      slp.classList.add('second-level-panel');
      const al2=document.createElement('div');
      al2.classList.add('accordion-lvl2');
      const fs=document.createElement('div');
      fs.style.cssText = 'border-bottom: solid #f4f4f4 1px';
      const ml3=document.createElement('div');
      ml3.classList.add('mobile-accordion-lvl3');
      const sd=document.createElement('div');

      var formData1 = new FormData();
      formData1.append('cs', data[i].cid);
      const response1 = await fetch('./subcatfordd.php',{ method: 'POST', body: formData1 });
        
      var data1 = await response1.json();
      if (data1.length==0) {
    }
    else{
      for (let j = 0; j < data1.length; j++) {
      const sp=document.createElement('p');
      sp.classList.add('third-level-menu');
      sp.textContent=data1[j].subname;
      sd.appendChild(sp);
      const d3=document.createElement('div');
      d3.classList.add('third-level-panel');
      const a3=document.createElement('div');
      a3.classList.add('accordion-lvl3');
      const ld=document.createElement('div');
      ld.style.cssText+='border-bottom: solid #f4f4f4 1px';
      
      var formData2 = new FormData();
      formData2.append('sc', data1[j].sub_id);
      const response2 = await fetch('./prodfordd.php',{ method: 'POST', body: formData2 });
        
      var data2 = await response2.json();
      if (data2.length==0) {
    }
    else{
      for (let k = 0; k < data2.length; k++) {
      const pr=document.createElement('p');
      pr.classList.add('fad-accordion');
      pr.style.cssText+='padding: 18px 18px 6px; margin: 12px 0';
      pr.textContent=data2[k].pname;
      ld.appendChild(pr);
      }
    }
    a3.appendChild(ld);
    d3.appendChild(a3);
    sd.appendChild(d3);
}
ml3.appendChild(sd);
fs.appendChild(ml3);
al2.appendChild(fs);
slp.appendChild(al2);
fd.appendChild(slp);

}
select.appendChild(fd);
}
}
var acc1 = document.getElementsByClassName("first-level-menu");
    var panel1 = document.getElementsByClassName('first-level-panel');
    for (var i = 0; i < acc1.length; i++) {
    acc1[i].onclick = function() {
    var setClasses = !this.classList.contains('active');
    setClass(acc1, 'active', 'remove');
    setClass(panel1, 'show', 'remove');
    if (setClasses) {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
    console.log('ax travixtika  ')
    }
    }
    }
    function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
    }
    }

    var acc2 = document.getElementsByClassName("second-level-menu");
    var panel2 = document.getElementsByClassName('second-level-panel');
    for (var i = 0; i < acc2.length; i++) {
    acc2[i].onclick = function() {
    var setClasses = !this.classList.contains('active');
    setClass(acc2, 'active', 'remove');
    setClass(panel2, 'show', 'remove');
    if (setClasses) {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("show");
    console.log('ax de travixtika  ')
    }
    }
    }
    function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
    }
    }

        var acc3 = document.getElementsByClassName("third-level-menu");
        var panel3 = document.getElementsByClassName('third-level-panel');
        for (var i = 0; i < acc3.length; i++) {
        acc3[i].onclick = function() {
        var setClasses = !this.classList.contains('active');
        setClass(acc3, 'active', 'remove');
        setClass(panel3, 'show', 'remove');
        if (setClasses) {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
        console.log('ax de travixtika  ')
        }
        }
        }
        function setClass(els, className, fnName) {
        for (var i = 0; i < els.length; i++) {
        els[i].classList[fnName](className);
        }
        }
}


