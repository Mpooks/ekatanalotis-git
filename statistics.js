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
    label: 'Total Offers per Month',
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

  // config 
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

  const bm=document.getElementById("mb");
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  const dateErr = document.getElementById('valid');
  const minp=document.getElementById("mi");
  minp.addEventListener("keypress", async function(event) {
  if (event.key === "Enter") {
    dateErr.innerHTML = "";
    filterChart(minp);
  }
  });
  function filterChart(date){
    console.log(date.value);
    const extra='0';
    if(date.value.includes('-')){
      var year = date.value.substring(0, 4);
      var month = date.value.substring(5, 7);
      if(date.value.substring(6, 7)===""){
        month=extra.concat(month);
        date.value=year+'-'+month;
      }
    }
    else{
    var year = date.value.substring(0, 4);
    var month = date.value.substring(4, 6);
    if(date.value.substring(5, 6)===""){
      month=extra.concat(month);
      date.value=year+'-'+month;
    }else{
      date.value=year+'-'+month;
      year = date.value.substring(0, 4);
      month = date.value.substring(5, 7);
    }
    }
    
    const lastDay = (y,m) => {
      return new Date(y, m, 0).getDate()
    };

    lastDay(year, month);

    const startDate = `${date.value}-01`; 
    const endDate = `${date.value}-${lastDay(year, month)}`;
    console.log(endDate);
    console.log(startDate);
    myChart.config.options.scales.x.min = startDate;
    myChart.config.options.scales.x.max = endDate;
    myChart.update();

    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

    if(!regex_date.test(startDate) || !regex_date.test(endDate) || year < 1000 || year > 3000 || month == 0 || month > 12)
    {
      myChart.config.options.scales.x.min = '2022-01-01';
      myChart.config.options.scales.x.max = '2022-12-31';
      myChart.update();
      dateErr.innerHTML = "Invalid date.";
    }

    if(date.value === ""){
      myChart.config.options.scales.x.min = '2022-01-01';
      myChart.config.options.scales.x.max = '2022-12-31';
      myChart.update();
      dateErr.innerHTML = "Invalid date.";
  }
    
  }
  bm.onclick= function reset(){
    myChart.config.options.scales.x.min = '2022-01-01';
    myChart.config.options.scales.x.max = '2022-12-31';
    myChart.update();
  }
}

