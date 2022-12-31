const data = {
    labels: ['2022-08-03', '2022-08-04', '2022-10-06', '2022-10-07', '2022-12-04', '2022-12-05', '2023-01-04'],
    datasets: [{
      label: 'Weekly Sales',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: [
        'rgba(255, 26, 104, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(0, 0, 0, 0.2)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
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
          beginAtZero: true
        }
      }
    }
  };


  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  const yearSelect = document.getElementById('year');
  
  for (let i = 0; i <= 100; i++) {
    const option = document.createElement('option');
    option.textContent = year - i;
    option.value = year - i;
    yearSelect.appendChild(option);
  }


function filterChart(){

  console.log(yearSelect.value);
  const monthSelect = document.getElementById('month');
  console.log(monthSelect.value);




  const lastDay = (y,m) => {
    return new Date(y, m, 0).getDate()
  };

  lastDay(yearSelect.value, monthSelect.value);
console.log(lastDay(yearSelect.value, monthSelect.value));
  const startDate = `${monthSelect.value}-01`;
  const endDate = `${monthSelect.value}-${lastDay(yearSelect.value, monthSelect.value)}`; 
  console.log(endDate);
  
  var e = myChart.config.options.scales.x.min = startDate;
  console.log(e)
  var b = myChart.config.options.scales.x.max = endDate;
  console.log(b)
  myChart.update();
}


function reset(){
  myChart.config.options.scales.x.min = '2022-01-01';
  myChart.config.options.scales.x.max = '2022-12-31';
  myChart.update();
}

