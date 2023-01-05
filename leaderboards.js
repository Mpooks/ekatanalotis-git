async function lboard(){
	const lb = document.getElementById("tbod");
	
	const response = await fetch('./leaderboard.php');
		
	var data = await response.json();
  
	for (let i = 0; i < data.length; i++) {
	  const tr = document.createElement('tr');
	  const tdr=document.createElement('td');
	  tdr.textContent=i+1;
	  const tdu=document.createElement('td');
	  tdu.textContent=data[i].username;
	  const tdp=document.createElement('td');
	  tdp.textContent=data[i].total_score;
		tr.appendChild(tdr);
		tr.appendChild(tdu);
		tr.appendChild(tdp);
		lb.appendChild(tr)
	}
var $table = document.getElementById("myTable");
var $n = 10;
var $rowCount = $table.rows.length;
var $firstRow = $table.rows[0].firstElementChild.tagName;
var $hasHead = ($firstRow === "TH");

var $tr = []; // array gia kathe grammi
var $i,$ii,$j = ($hasHead)?1:0; // counters gia na metrame apo to row 1 an yparxei head sto row 0
var $th = ($hasHead?$table.rows[(0)].outerHTML:""); // krataei to header
var $pageCount = Math.ceil($rowCount / $n);

if ($pageCount > 1) {

	for ($i = $j,$ii = 0; $i < $rowCount; $i++, $ii++)
		$tr[$ii] = $table.rows[$i].outerHTML;

	$table.insertAdjacentHTML("afterend","<div id='buttons' class='buttons'></div");
	sort(1);
}

function sort($p) {                                         // ($p) h selida pou epilegeis
	var $rows = $th,$s = (($n * $p)-$n);
	for ($i = $s; $i < ($s+$n) && $i < $tr.length; $i++)
		$rows += $tr[$i];
	
	$table.innerHTML = $rows;
	document.getElementById("buttons").innerHTML = pageButtons($pageCount,$p);
	document.getElementById("id"+$p).setAttribute("class","active");
}

function pageButtons($pCount,$cur) {

	var	$prevDis = ($cur == 1)?"disabled":"",
		$nextDis = ($cur == $pCount)?"disabled":"",
		$buttons = "<input type='button' class='prevbutton' value='Prev' onclick='sort("+($cur - 1)+")' "+$prevDis+">";
	for ($i=1; $i<=$pCount;$i++)
		$buttons += "<input type='button'id='id"+$i+"'value='"+$i+"' onclick='sort("+$i+")'>";
	$buttons += "<input type='button' class='nextbutton' value='Next' onclick='sort("+($cur + 1)+")' "+$nextDis+">";
	return $buttons;
}
}