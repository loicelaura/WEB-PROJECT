document.addEventListener('DOMContentLoaded', () => {
    const refreshButton = document.getElementById('refresh-button');
    const dataForm = document.getElementById('data-form');
  
    refreshButton.addEventListener('click', () => {
      fetch('/get-data')
        .then(response => response.json())
        .then(data => {
          document.getElementById('hash-rate').textContent = data.hashRate;
          document.getElementById('earnings').textContent = data.earnings;
          document.getElementById('system-health').textContent = data.systemHealth;
        })
        .catch(error => console.error('Error fetching data:', error));
    });
  
    dataForm.addEventListener('submit', event => {
      event.preventDefault();
  
      const formData = new FormData(dataForm);
      const data = {
        hashRate: formData.get('hashRate'),
        earnings: formData.get('earnings'),
        systemHealth: formData.get('systemHealth'),
      };
  
      fetch('/submit-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.text())
        .then(result => {
          console.log('Success:', result);
        })
        .catch(error => console.error('Error submitting data:', error));
    });
  });
  
