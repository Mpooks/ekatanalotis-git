async function chartsWeek()
{
  const lab = new Array();
  const d = new Array();
  const search=document.getElementById('sb');
  const prev=document.getElementById('pb');
  const next=document.getElementById('nb');
search.onclick= async function(){
   lab.length=0;
   d.length=0;
    var sel = document.getElementById('selectcat');
    var subs = document.getElementById('selectsubcat');
    var cat=sel.value;
    var subcat=subs.value;
    if(cat=='black'){
        alert('You have to select a category first!');
    }
    else if(cat!='black'){
        if(subcat=='blacks'){
          var formData1 = new FormData();
formData1.append('select', cat);
const response = await fetch('./onlycatforstat.php',{ method: 'POST', body: formData1 });
      
  let data1 = await response.json();
  if (data1.length===0){
  
  }else{
  for (let v = 0; v < data1.length; v++) {
      lab.push(data1[v].offer_date);
      d.push(data1[v].tof);
  }
  }      
        }
        else{
          var formData1 = new FormData();
formData1.append('select', subcat);
const response = await fetch('./subcatforstat.php',{ method: 'POST', body: formData1 });
      
  let data1 = await response.json();
  if (data1.length===0){
  
  }else{
  for (let v = 0; v < data1.length; v++) {
      lab.push(data1[v].offer_date);
      d.push(data1[v].tof);
  }
  }    
        }

}
myChartWeek.update();
}

const data = {
  labels: lab,
  datasets: [{
    label: 'Average Discount per Week (%)',
    data: d,
    backgroundColor: [
      'rgba(1, 169, 172, 1)',
    ],
    borderColor: [
      'rgba(25, 25, 112, 1)',

    ],
    borderWidth: 1
  }]
};

currentDate = new Date();
    stDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - stDate) /
        (24 * 60 * 60 * 1000));
         
  var weekNumber = Math.ceil(days / 7);
  const [inistartDate,iniendDate,inilastday,inistartday,inimonth,inilastmonth,inilastyear]=getDateOfISOWeek(weekNumber,currentDate.getFullYear());

const config = {
  type: 'line',
  data,
  options: {
    scales: {
      x:{ 
        min: currentDate.getFullYear()+'-'+inistartDate,
        max: currentDate.getFullYear()+'-'+iniendDate,
        type: 'time',
        time: {
          unit: 'day',
        },
        ticks: {
          source: 'ticks',
          unitstepSize: 1,
          autoSkip: true,
      },
    },
    y: {
      beginAtZero: true,
      min: 0,
      max: 100,
      ticks: {
        // forces step size to be 50 units
        stepSize: 1
      }
    }
    }
  }
};

const bw=document.getElementById("wb");
const dateErr = document.getElementById('validw');

const myChartWeek = new Chart(
  document.getElementById('myChartWeek'),
  config
);
const winp=document.getElementById("wi");
winp.addEventListener("keypress", async function(event) {
if (event.key === "Enter") {
  dateErr.innerHTML = "";
  if(winp.value==null || winp.value==""){
    myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
    myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
    myChartWeek.update();
  }else{
  /*var regex_dates = /^[a-zA-Z!@#\$%\^\&*\)\(+=._]+$/;*/
  var regex_dates = /^\d{4}\-\d{1,2}$/;

  if(!regex_dates.test(winp.value))
  {
    myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
    myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
    myChartWeek.update();
    dateErr.innerHTML = "Invalid date.";
  }
  else{
    convert(winp);
  }
  }
}
});
function convert(datestr){
  const extra='0';
    if(datestr.value.includes('-')){
      var year = datestr.value.substring(0, 4);
      var week = datestr.value.substring(5, 7);
      if(datestr.value.substring(6, 7)===""){
        week=extra.concat(week);
        datestr.value=year+'-'+week;
      }
    }
    else{
      var year = datestr.value.substring(0, 4);
      var week = datestr.value.substring(5, 7);
      if(datestr.value.substring(5, 6)===""){
      week=extra.concat(week);
      datestr.value=year+'-'+week;
    }else{
      datestr.value=year+'-'+week;
      year = datestr.value.substring(0, 4);
      week = datestr.value.substring(5, 7);
    }
    }
    if(parseInt(week)>52){
      myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
    myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
    myChartWeek.update();
    dateErr.innerHTML = "Invalid date.";
    }else{

    const [startDate,endDate,lastday,startday,month,lastmonth,lastyear]=getDateOfISOWeek(week,year);
    myChartWeek.config.options.scales.x.min = year+'-'+startDate;
    myChartWeek.config.options.scales.x.max = lastyear+'-'+endDate;
    myChartWeek.update();

    var regex_date = /^\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(startDate) || !regex_date.test(endDate) ||  month <= 0 || month > 12 ||  lastmonth <= 0 || lastmonth > 12 || startday <= 0 || startday > 31 || lastday <= 0 || lastday > 31)
    {
      myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
      myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
      myChartWeek.update();
      dateErr.innerHTML = "Invalid date.";
    }

    if(datestr.value === ""){
      myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
      myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
      myChartWeek.update();
      dateErr.innerHTML = "Invalid date.";
  }
}
}
function convertforprornext(datestr,np){
  const extra='0';
    if(datestr.value.includes('-')){
      var year = datestr.value.substring(0, 4);
      var week = datestr.value.substring(5, 7);
      if(datestr.value.substring(6, 7)===""){
        week=extra.concat(week);
        datestr.value=year+'-'+week;
      }
    }
    else{
      var year = datestr.value.substring(0, 4);
      var week = datestr.value.substring(5, 7);
      if(datestr.value.substring(5, 6)===""){
      week=extra.concat(week);
      datestr.value=year+'-'+week;
    }else{
      datestr.value=year+'-'+week;
      year = datestr.value.substring(0, 4);
      week = datestr.value.substring(5, 7);
    }
    }
    if(parseInt(week)>52){
      myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
    myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
    myChartWeek.update();
    dateErr.innerHTML = "Invalid date.";
    }else{
      if(np==0){
        const [startDate,endDate,lastday,startday,month,lastmonth,lastyear,firstyear]=getlastweek(week,year);
        myChartWeek.config.options.scales.x.min = lastyear+'-'+startDate;
        myChartWeek.config.options.scales.x.max = firstyear+'-'+endDate;
        myChartWeek.update();
    
        var regex_date = /^\d{1,2}\-\d{1,2}$/;
    
        if(!regex_date.test(startDate) || !regex_date.test(endDate) ||  month <= 0 || month > 12 ||  lastmonth <= 0 || lastmonth > 12 || startday <= 0 || startday > 31 || lastday <= 0 || lastday > 31)
        {
          myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
          myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
          myChartWeek.update();
          dateErr.innerHTML = "Invalid date.";
        }
    
        if(datestr.value === ""){
          myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
          myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
          myChartWeek.update();
          dateErr.innerHTML = "Invalid date.";
      }
      newweek=parseInt(week)-1;
      if(newweek<10 && newweek>0){
        newweek='0'.concat(newweek.toString());
      }
      if(newweek==0){
        year=parseInt(year)-1;
        newweek=52;
        newweek=newweek.toString();
      }
      winp.value=year+'-'+newweek;
      }else{
        const [startDate,endDate,lastday,startday,month,lastmonth,firstyear,lastyear]=getnextweek(week,year);
    myChartWeek.config.options.scales.x.min = firstyear+'-'+startDate;
    myChartWeek.config.options.scales.x.max = lastyear+'-'+endDate;
    myChartWeek.update();

    var regex_date = /^\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(startDate) || !regex_date.test(endDate) ||  month <= 0 || month > 12 ||  lastmonth <= 0 || lastmonth > 12 || startday <= 0 || startday > 31 || lastday <= 0 || lastday > 31)
    {
      myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
      myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
      myChartWeek.update();
      dateErr.innerHTML = "Invalid date.";
    }

    if(datestr.value === ""){
      myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
      myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
      myChartWeek.update();
      dateErr.innerHTML = "Invalid date.";
  }
  newweek=parseInt(week)+1;
  if(newweek<10 && newweek>0){
    newweek='0'.concat(newweek.toString());
  }
  if(newweek>52){
    year=parseInt(year)+1;
    year=year.toString();
    newweek=1;
    newweek='0'.concat(newweek.toString());
  }
  winp.value=year+'-'+newweek;
      }
}
}



  function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    var lastday;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    var lastyear=y;
    lastday = ISOweekStart.getDate() + 6;
    var firstday=ISOweekStart.getDate();
    var month=ISOweekStart.getMonth() + 1; 
    var lastmonth=ISOweekStart.getMonth() + 1; 
    const isLeap = y => new Date(y, 1, 29).getDate() === 29;
    if(month==2){
      if(isLeap(y)==1){
      if(lastday>29)
    {
      lastmonth=month+1;
      lastday=lastday-29;
    }
  }else{
    if(lastday>28)
    {
      lastmonth=month+1;
      lastday=lastday-28;
    }
  }
    }
    else if(month==1 || month==3||month==5||month==7||month==8||month==10||month==12){
      if(lastday>31)
    {
      lastmonth=month+1;
      lastday=lastday-31;
      if(lastmonth>12){
        lastmonth=1;
        lastyear=parseInt(lastyear)+1;
      }
    }
    }
    else{
      if(lastday>30)
    {
      lastmonth=month+1;
      lastday=lastday-30;
    }
    }
    const extrafd='0';
    month=month.toString();
    lastmonth=lastmonth.toString();
    firstday=firstday.toString();
    lastday=lastday.toString();
    lastyear=lastyear.toString();
    if(month.substring(1, 2)===""){
      month=extrafd.concat(month);
    }
    if(lastmonth.substring(1, 2)===""){
      lastmonth=extrafd.concat(lastmonth);
    }
    if(lastday.substring(1, 2)===""){
      lastday=extrafd.concat(lastday);
    }
    if(firstday.substring(1, 2)===""){
      firstday=extrafd.concat(firstday);
    }
    ISOweekStart=month+'-'+firstday;
    var lastdate=lastmonth+'-'+lastday;
    return [ISOweekStart,lastdate,lastday,firstday,month,lastmonth,lastyear];
}
  bw.onclick= function reset(){
  myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+inistartDate;
  myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+iniendDate;
  myChartWeek.update();
  winp.value = "";
  dateErr.innerHTML="";
}
function getlastweek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  var lastday;
  if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  var firstday= ISOweekStart.getDate() - 7;
  lastday = ISOweekStart.getDate() -1;
  var month=ISOweekStart.getMonth() + 1; 
  var lastmonth=ISOweekStart.getMonth() + 1; 
  var firstyear=y;
  var lastyear=y;
  y=parseInt(y);
  const isLeap = y => new Date(y, 1, 29).getDate() === 29;
  if(month==3){
    if(isLeap(y)==1){
    if(firstday<=0)
  {
    month=month-1;
    firstday=22+ISOweekStart.getDate();
    if(lastday<=0){
      lastday=29;
      lastmonth=month;
    }
    if(lastday>29){
      lastmonth=month+1;
      lastday=lastday-29;
    }
  }
}else{
  if(firstday<=0)
  {
    month=month-1;
    firstday=21+ISOweekStart.getDate();
    if(lastday<=0){
      lastday=28;
      lastmonth=month;
    }
  if(lastday>28)
  {
    lastmonth=month+1;
    lastday=lastday-28;
  }
}
}
  }
  else if(month==1 || month==8||month==12){
    if(firstday<=0)
  {
    if(month==12){
      firstday=23+ISOweekStart.getDate();
    }
    if(month!=1){
    month=month-1;
    }
    else{
      month=12;
      lastyear=lastyear-1;
    }
    firstday=24+ISOweekStart.getDate();
    if(lastday<=0){
      lastday=31;
      lastmonth=month;
    }
    if(lastday>31)
  {
    lastmonth=month+1;
    lastday=lastday-31;
    if(lastmonth>12){
      lastmonth=1;
      firstyear=firstyear+1;
    }
  }
}
  }
  else if(month==2||month==6||month==9||month==11){
    if(firstday<=0)
  {
    month=month-1;
    firstday=24+ISOweekStart.getDate();
    if(lastday<=0){
      lastday=31;
      lastmonth=month;
    }
    if(lastday>31)
  {
    lastmonth=month+1;
    lastday=lastday-31;
  }
}
  }
  else if(month==4){
    if(firstday<=0)
  {
    month=month-1;
    firstday=24+ISOweekStart.getDate();
    if(lastday<=0){
      lastday=31;
      lastmonth=month;
    }
    if(lastday>31)
  {
    lastmonth=month+1;
    lastday=lastday-31;
  }
}
  }
  else if(month==10){
    if(firstday<=0)
  {
    month=month-1;
    firstday=24+ISOweekStart.getDate();
    if(lastday<=0){
      lastday=30;
      lastmonth=month;
    }
    if(lastday>30)
  {
    lastmonth=month+1;
    lastday=lastday-30;
  }
}
  }
  else{
    if(firstday<=0)
    {
      month=month-1;
      firstday=23+ISOweekStart.getDate();
      if(lastday<=0){
        lastday=30;
        lastmonth=month;
      }
      if(lastday>30)
    {
      lastmonth=month+1;
      lastday=lastday-30;
    }
  }
  }
  const extrafd='0';
  month=month.toString();
  lastmonth=lastmonth.toString();
  firstday=firstday.toString();
  lastday=lastday.toString();
  if(month.substring(1, 2)===""){
    month=extrafd.concat(month);
  }
  if(lastmonth.substring(1, 2)===""){
    lastmonth=extrafd.concat(lastmonth);
  }
  if(lastday.substring(1, 2)===""){
    lastday=extrafd.concat(lastday);
  }
  if(firstday.substring(1, 2)===""){
    firstday=extrafd.concat(firstday);
  }
  ISOweekStart=month+'-'+firstday;
  var lastdate=lastmonth+'-'+lastday;
  return [ISOweekStart,lastdate,lastday,firstday,month,lastmonth,lastyear,firstyear];
}
prev.onclick=function(){
  if(!(dateErr.innerHTML == "Invalid date.")){
if(winp.value == null || winp.value == ""){
  const [prevstartDate,prevendDate,lastday,firstday,month,lastmonth]=getlastweek(weekNumber,currentDate.getFullYear());
  myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+prevstartDate;
  myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+prevendDate;
  myChartWeek.update();
  currentDate = new Date();
  stDate = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate - stDate) /
      (24 * 60 * 60 * 1000));
       
var newweek = Math.ceil(days / 7);
year=currentDate.getFullYear();
  newweek=parseInt(newweek)-1;
  if(newweek<10 && newweek>0){
    newweek='0'.concat(newweek.toString());
  }
  if(newweek<0){
    newweek=52;
    newweek='0'.concat(newweek.toString());
    year=parseInt(year)-1;
    year=year.toString();
  }
  winp.value=year+'-'+newweek;
}else{
  convertforprornext(winp,0);
}
  }
  else{
    winp.value='';
  }
}

function getnextweek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  var lastday;
  var firstyear=y;
  var lastyear=y;
  if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  var firstday= ISOweekStart.getDate() +7;
  var month=ISOweekStart.getMonth() + 1; 
  var lastmonth=ISOweekStart.getMonth() + 1; 
  const isLeap = y => new Date(y, 1, 29).getDate() === 29;
  if(month==2){
    if(isLeap(y)==1){
    if(firstday>29)
  {
    month=month+1;
    firstday=firstday-29;
  }
  lastday = firstday + 6;
  if(lastday>29)
  {
    lastmonth=month+1;
    lastday=lastday-29;
  }
}else{
  if(firstday>28)
  {
    month=month+1;
    firstday=firstday-28;
  }
  lastday = firstday + 6;
  lastmonth=month;
  if(lastday>28)
  {
    lastmonth=month+1;
    lastday=lastday-28;
  }
}
  }
  else if(month==1 || month==3||month==5||month==7||month==8||month==10||month==12){
    if(firstday>31)
    {
      month=month+1;
      firstday=firstday-31;
      if(month>12){
        month=1;
        firstyear=parseInt(firstyear)+1;
        firstyear=firstyear.toString();

      }
    }
    lastday = firstday + 6;
    lastmonth=month;
    lastyear=firstyear;
    if(lastday>31)
  {
    lastmonth=month+1;
    lastday=lastday-31;
    if(lastmonth>12){
      lastmonth=1;
      lastyear=parseInt(lastyear)+1;
      lastyear=lastyear.toString();
    }
  }
  }
  else{
    if(firstday>30)
    {
      month=month+1;
      firstday=firstday-30;
    }
    lastday = firstday + 6;
    lastmonth=month;
    if(lastday>30)
  {
    lastmonth=month+1;
    lastday=lastday-30;
  }
  }
  const extrafd='0';
  month=month.toString();
  lastmonth=lastmonth.toString();
  firstday=firstday.toString();
  lastday=lastday.toString();
  if(month.substring(1, 2)===""){
    month=extrafd.concat(month);
  }
  if(lastmonth.substring(1, 2)===""){
    lastmonth=extrafd.concat(lastmonth);
  }
  if(lastday.substring(1, 2)===""){
    lastday=extrafd.concat(lastday);
  }
  if(firstday.substring(1, 2)===""){
    firstday=extrafd.concat(firstday);
  }
  ISOweekStart=month+'-'+firstday;
  var lastdate=lastmonth+'-'+lastday;
  return [ISOweekStart,lastdate,lastday,firstday,month,lastmonth,firstyear,lastyear];
}

next.onclick=function(){
  if(!(dateErr.innerHTML == "Invalid date.")){
  if(winp.value == null || winp.value == ""){
    const [nextstartDate,nextendDate,lastday,firstday,month,lastmonth]=getnextweek(weekNumber,currentDate.getFullYear());
    myChartWeek.config.options.scales.x.min = currentDate.getFullYear()+'-'+nextstartDate;
    myChartWeek.config.options.scales.x.max = currentDate.getFullYear()+'-'+nextendDate;
    myChartWeek.update();
    currentDate = new Date();
    stDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate - stDate) /
        (24 * 60 * 60 * 1000));
         
  var newweek = Math.ceil(days / 7);
    newweek=parseInt(newweek)+1;
    if(newweek<10){
      newweek='0'.concat(newweek.toString());
    }
    winp.value=currentDate.getFullYear()+'-'+newweek;
  }else{
    convertforprornext(winp,1);
  }
}
else{
  winp.value='';
}
}
}