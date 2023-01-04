const data = {
  labels: ['2022-08-03', '2022-08-04', '2022-10-06', '2022-10-07', '2022-12-04', '2022-12-05', '2023-01-04'],
  datasets: [{
    label: 'Total Offers per Month',
    data: [18, 12, 6, 9, 12, 3, 9],
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
            min: '2022-01-05',
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
    const year = date.value.substring(0, 4);
    const month = date.value.substring(5, 7);

    
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

  function reset(){
    myChart.config.options.scales.x.min = '2022-01-01';
    myChart.config.options.scales.x.max = '2022-12-31';
    myChart.update();
  }

