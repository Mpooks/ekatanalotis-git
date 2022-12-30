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

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  function filterChart(date){
    const year = date.value.substring(0, 4);
    const month = date.value.substring(7, 10);
    const lastDay = (y,m) => {
       return new Date(y, m, 0).getDate()
    };


    
    const startDate = `${date.value}-01`; 
    const endDate = `${date.value}-${lastDay(year, month)}`;
    myChart.config.options.scales.x.min = startDate;
    myChart.config.options.scales.x.max = endDate;
    myChart.update();
  }

  function reset(){
    myChart.config.options.scales.x.min = '2022-01-01';
    myChart.config.options.scales.x.max = '2022-12-12';
    myChart.update();
  }