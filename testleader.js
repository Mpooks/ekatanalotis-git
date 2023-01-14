
let  table, sortCol;
let sortAsc = false;
const pageSize = 10;
let curPage = 1;
async function lboard(){

table = document.getElementById("tbod");
const response = await fetch('./leaderboard.php');
    
let data = await response.json();
renderTable();

document.querySelectorAll('#myTable thead tr th').forEach(t => {
    t.addEventListener('click', sort, false);
 });
 
 document.querySelector('#nextButton').addEventListener('click', nextPage, false);
 document.querySelector('#prevButton').addEventListener('click', previousPage, false);
function renderTable() {
 let result = '';
 data.filter((row, index) => {
       let start = (curPage-1)*pageSize;
       let end =curPage*pageSize;
       if(index >= start && index < end) return true;
 }).forEach(function(value,index){
    result += `<tr>
    <td>${value.rank1}</td>
    <td>${value.username}</td>
    <td>${value.total_score}</td>
    <td>${value.last_tokens}</td>
    <td>${value.total_tokens}</td>
    </tr>`;
 });
 table.innerHTML = result;
}

function sort(e) {
 let thisSort = e.target.dataset.sort;
 if(sortCol === thisSort) sortAsc = !sortAsc;
 sortCol = thisSort;
 data.sort((a, b) => {
   if(a[sortCol] < b[sortCol]) return sortAsc?1:-1;
   if(a[sortCol] > b[sortCol]) return sortAsc?-1:1;
   return 0;
 });
 renderTable();
}

function previousPage() {
 if(curPage > 1) curPage--;
 renderTable();
}

function nextPage() {
 if((curPage * pageSize) < data.length) curPage++;
 renderTable();
}
}