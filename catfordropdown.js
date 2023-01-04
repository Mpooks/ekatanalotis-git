async function categoriesfd(){
const select = document.getElementById("selectcat");
const select2 = document.getElementById("fad");

const v = document.createElement('select');
select2.appendChild(v);

const response = await fetch('./categoriesfordropdown.php');
    
var data = await response.json();
console.log(data);
for (let i = 0; i < data.length; i++) {
  console.log(i);
  const op = document.createElement('option');
  op.value=data[i].cname;
  op.text=data[i].cname;
  select.appendChild(op);
  v.appendChild(op);
}

}