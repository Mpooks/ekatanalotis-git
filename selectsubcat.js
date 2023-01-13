async function categoriesfd(){
    const select = document.getElementById("selectcat");
    
    const response = await fetch('./categoriesfordropdown.php');
        
    var data = await response.json();
    for (let i = 0; i < data.length; i++) {
      const op = document.createElement('option');
      op.value=data[i].cname;
      op.text=data[i].cname;
      select.appendChild(op);
    }
var sel = document.getElementById('selectcat');
var subs = document.getElementById('selectsubcat');

sel.onchange = async function getSelected(){
subs.innerHTML = "<option value=\"blacks\" class=\"dropdown_content\">Subcategories</option>";
var se = document.getElementById('selectcat').value;
if(se!=='black'){
var formData1 = new FormData();
formData1.append('select', se);
const response1 = await fetch('./cidfromcname.php',{ method: 'POST', body: formData1 });

var data1 = await response1.json();

for (let j = 0; j < data1.length; j++) {
  const op = document.createElement('option');
  op.value=data1[j].subname;
  op.text=data1[j].subname;
  subs.appendChild(op);
}

}
}
}