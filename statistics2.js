const data = {
  labels: ['2022-11-14', '2022-11-21'],
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


const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'week',
          displayFormats: {
            week: 'yyyy-wW'
          }
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


function insert(weekDate){
  console.log(weekDate)
  console.log(weekDate.value)

  const DateTime = luxon.DateTime;
  console.log(luxon.DateTime.fromISO(weekDate.value))
  myChart.data.labels.push(DateTime.fromISO(weekDate.value));
  myChart.update();
}