function changePage(pageId) {
    // Get all page elements
    const pages = document.querySelectorAll('.page');

    // Get all sidebar buttons
    const sidebarButtons = document.querySelectorAll('.sidebar-btn');

    // Loop through pages and sidebar buttons
    pages.forEach(page => {
        if (page.id === pageId) {
            // Show the selected page
            page.classList.add('active');
        } else {
            // Hide other pages
            page.classList.remove('active');
        }
    });

    // Loop through sidebar buttons
    sidebarButtons.forEach(button => {
        if (button.dataset.page === pageId) {
            // Set the clicked button as active
            button.classList.add('active');
        } else {
            // Remove active class from other buttons
            button.classList.remove('active');
        }
    });
    // Handle logout functionality
    if (pageId === 'logout') {
        performLogout();
    }
}
function performLogout() {
    // Perform logout logic here
    // For example, redirect to the login page
    window.location.replace('/login.html');
}
document.addEventListener('DOMContentLoaded', function () {
    // Get the elements
    var initiatePromptBtn = document.getElementById('initiatePromptBtn');
    var popup = document.getElementById('popup');
    var closeBtn = document.getElementById('closeBtn');
    var payBtn = document.getElementById('payBtn');

    // Add event listener to the "Initiate Prompt" button
    initiatePromptBtn.addEventListener('click', function () {
        popup.style.display = 'block';
    });

    // Add event listener to the "Close" button
    closeBtn.addEventListener('click', function () {
        popup.style.display = 'none';
    });

    // Add event listener to the "Pay" button
    payBtn.addEventListener('click', function () {
        // Get the phone number and amount input values
        var phoneNumber = document.getElementById('phoneNumber').value;
        var amount = document.getElementById('amount').value;

        // Validate the phone number and amount
        if (phoneNumber.trim() === '') {
            alert('Please enter a valid phone number.');
            return;
        }

        if (amount.trim() === '') {
            alert('Please enter a valid amount.');
            return;
        }

        // Perform the M-Pesa STK push payment using the obtained values
        // ...
        // Add your code to initiate the payment with the provided phone number and amount

        // Clear the input fields
        document.getElementById('phoneNumber').value = '';
        document.getElementById('amount').value = '';

        // Close the popup
        popup.style.display = 'none';
    });
    document.addEventListener('DOMContentLoaded', function () {
        // Get the elements
        var initiatePromptBtn = document.getElementById('initiatePromptBtn');
        var popup = document.getElementById('popup');
        var closeBtn = document.getElementById('closeBtn');
        var paymentForm = document.getElementById('paymentForm');

        // Add event listener to the "Initiate Prompt" button
        initiatePromptBtn.addEventListener('click', function () {
            popup.style.display = 'block';
        });

        // Add event listener to the "Close" button
        closeBtn.addEventListener('click', function () {
            popup.style.display = 'none';
        });

        // Add event listener to the form submission
        paymentForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get the phone number and amount input values
            var phoneNumber = document.getElementById('phoneNumber').value;
            var amount = document.getElementById('amount').value;

            // Send the payment data to the server
            fetch('/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber: phoneNumber, amount: amount })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Handle the server response
                    // Display a success message or perform any necessary actions
                })
                .catch(error => {
                    console.error(error); // Handle the error
                    // Display an error message or perform any necessary actions
                });

            // Clear the input fields
            document.getElementById('phoneNumber').value = '';
            document.getElementById('amount').value = '';

            // Close the popup
            popup.style.display = 'none';
        });
    });

});

document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  
  var calendar = new FullCalendar.Calendar(calendarEl, {
    // Configure calendar options here
    // Example: initialView, events, etc.
  });
  
  calendar.render();
});

document.addEventListener('DOMContentLoaded', function() {
  var chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Transactions',
        data: [100, 200, 150, 300, 250, 400],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Payments',
        data: [200, 150, 250, 200, 300, 350],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  var ctx = document.getElementById('transactionChart').getContext('2d');
  var transactionChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
