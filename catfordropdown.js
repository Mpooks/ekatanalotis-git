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
}