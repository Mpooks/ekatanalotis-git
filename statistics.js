const data = {
    labels: ['2022-08-03', '2022-08-04', '2022-10-06', '2022-10-07', '2022-12-04', '2022-12-05', '2023-01-04'],
    datasets: [{
      label: 'Total Oferrs',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        'rgba(25, 25, 112, 0.2)',

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
                unit: 'day'
            }
        },
        y: {
          beginAtZero: true,
          suggestedmin: '0',
          suggestedmax: '20'
        }
      }
    }
  };


  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  const weekChart = new Chart(
    document.getElementById('weekChart'),
    config
  );


  const yearSelect = document.getElementById('year');
  year= new Date().getFullYear();
  
  for (let i = 0; i <= 100; i++) {
    const option = document.createElement('option');
    option.textContent = year - i;
    option.value = year - i;
    yearSelect.appendChild(option);
  }


function filterChart(){

  const monthSelect = document.getElementById('month');
  console.log(monthSelect);
  console.log(monthSelect.value);



  const lastDay = (y,m) => {
    return new Date(y, m, 0).getDate()
  };

  var y=yearSelect.value;
  var m=monthSelect.value;
  const date=y.toString()+'-'+m.toString();

  lastDay(yearSelect.value, monthSelect.value);
  const startDate = `${date}-01`;
  const endDate = `${date}-${lastDay(yearSelect.value, monthSelect.value)}`; 
  console.log(endDate);
  console.log(startDate);
  myChart.config.options.scales.x.min = startDate;
  myChart.config.options.scales.x.max = endDate;
  myChart.update();
}

function filterYearChart(){

  console.log(yearSelect.value);
  const monthSelect = document.getElementById('month');
  console.log(monthSelect.value);

  const lastDay = (y,m) => {
    return new Date(y, m, 0).getDate()
  };

  var y=yearSelect.value;
  var m=monthSelect.value;
  const date=y.toString()+'-'+m.toString();

  lastDay(yearSelect.value, monthSelect.value);
  const startDate = `${date}-01`;
  const endDate = `${date}-${lastDay(yearSelect.value, monthSelect.value)}`; 
  console.log(endDate);
  console.log(startDate);
  myChart.config.options.scales.x.min = startDate;
  myChart.config.options.scales.x.max = endDate;
  myChart.update();
  
}


function reset(){
  myChart.config.options.scales.x.min = '2022-01-01';
  myChart.config.options.scales.x.max = '2022-12-31';
  myChart.update();
}

