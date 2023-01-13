async function charts()
{
  const lab = new Array();
  const d = new Array();
  const response = await fetch('./monthoffersdata.php');
      
  let data1 = await response.json();
  if (data1.length===0){
  
  }else{
  for (let v = 0; v < data1.length; v++) {
      lab.push(data1[v].offer_date);
      d.push(data1[v].tof)
  }
  }

const data = {
  labels: lab,
  datasets: [{
    label: 'Total Offers per Week',
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


const config = {
  type: 'line',
  data,
  options: {
    scales: {
      x:{ 
        min: '2022-01-01',
        max: '2022-12-31',
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
      max: 20,
      ticks: {
        // forces step size to be 50 units
        stepSize: 1
      }
    }
    }
  }
};

const bw=document.getElementById("wb");
const dateErr = document.getElementById('valid');

const myChart = new Chart(
  document.getElementById('myChart'),
  config
);
const winp=document.getElementById("wi");
winp.addEventListener("keypress", async function(event) {
if (event.key === "Enter") {
  dateErr.innerHTML = "";
  convert(winp);
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

    const [startDate,endDate,lastday,startday,month,lastmonth]=getDateOfISOWeek(week,year);
    myChart.config.options.scales.x.min = year+'-'+startDate;
    myChart.config.options.scales.x.max = year+'-'+endDate;
    myChart.update();

    var regex_date = /^\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(startDate) || !regex_date.test(endDate) ||  month <= 0 || month > 12 ||  lastmonth <= 0 || lastmonth > 12 || startday <= 0 || startday > 31 || lastday <= 0 || lastday > 31)
    {
      myChart.config.options.scales.x.min = '2022-01-01';
      myChart.config.options.scales.x.max = '2022-12-31';
      myChart.update();
      dateErr.innerHTML = "Invalid date.";
    }

    if(datestr.value === ""){
      myChart.config.options.scales.x.min = '2022-01-01';
      myChart.config.options.scales.x.max = '2022-12-31';
      myChart.update();
      dateErr.innerHTML = "Invalid date.";
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
    console.log(lastmonth);
    console.log(lastday);
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
    return [ISOweekStart,lastdate,lastday,firstday,month,lastmonth];
}
  bw.onclick= function reset(){
  myChart.config.options.scales.x.min = '2022-01-01';
  myChart.config.options.scales.x.max = '2022-12-31';
  myChart.update();
}
}