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

// Get UI elements
const nativePicker = document.querySelector('.nativeDatePicker');
const fallbackPicker = document.querySelector('.fallbackDatePicker');
const fallbackLabel = document.querySelector('.fallbackLabel');

const yearSelect = document.querySelector('#year');
console.log(yearSelect.value)
const monthSelect = document.querySelector('#month');

// Hide fallback initially
fallbackPicker.style.display = 'none';
fallbackLabel.style.display = 'none';

// Test whether a new date input falls back to a text input or not
const test = document.createElement('input');

try {
  test.type = 'month';
} catch (e) {
  console.log(e.description);
}

// If it does, run the code inside the if () {} block
if (test.type === 'text') {
  // Hide the native picker and show the fallback
  nativePicker.style.display = 'none';
  fallbackPicker.style.display = 'block';
  fallbackLabel.style.display = 'block';

  // Populate the years dynamically
  // (the months are always the same, therefore hardcoded)
  populateYears();
}

function populateYears() {
  // Get the current year as a number
  const date = new Date();
  const year = date.getFullYear();

  // Make this year, and the 100 years before it available in the year <select>
  for (let i = 0; i <= 100; i++) {
    const option = document.createElement('option');
    option.textContent = year - i;
    yearSelect.appendChild(option);
  }
}
function val() {
    d = document.getElementById("month").value;
    console.log(monthSelect.value);

}

function val1() {
    d = document.getElementById("year").value;
    console.log(yearSelect.value);

}
