document.getElementById('form1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    var formData = new FormData(this);

    // Send form data to API endpoint using fetch
    // fetch('http://192.168.0.136:5146/api/W1', {
    fetch('http://locahost:5145/api/W1', {
        method: 'POST',
        body: formData
        /*headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)*/
    
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Form data submitted successfully:', data);
        // Optionally, do something with the response data
    })
    .catch(error => {
        console.error('There was a problem with form submission:', error);
        // Optionally, handle error
    });
});

//GET
document.addEventListener('DOMContentLoaded', function() {
    // fetch('http://localhost:5146/api/W1')
    fetch('http://localhost:5145/api/W1')
        .then(response => response.json())
        .then(data => {
            console.log('Data from API:', data);

            // Sort the data by ID in ascending order and limit to 3 reviews
            const sortedData = data.sort((a, b) => b.id - a.id).slice(0, 5);

            const reviewSection = document.querySelector('.review-section');

            sortedData.forEach(review => {
                // Create review container
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');

                // Create review header
                const reviewHeaderDiv = document.createElement('div');
                reviewHeaderDiv.classList.add('review-header');

                // Create customer details div
                const customerDetailsDiv = document.createElement('div');
                customerDetailsDiv.classList.add('customer-details');

                // Create and set customer name
                const customerName = document.createElement('h2');
                customerName.textContent = review.name;

                const customerExp = document.createElement('h4');
                customerExp.textContent = "Rating: " + review.exp;

                // Append customer name to customer details div
                customerDetailsDiv.appendChild(customerName);

                customerDetailsDiv.appendChild(customerExp);

                // Append customer details to review header
                reviewHeaderDiv.appendChild(customerDetailsDiv);

                // Create and set review text
                const reviewText = document.createElement('p');
                reviewText.classList.add('review-text');
                reviewText.textContent = review.rev;

                // Append review header and text to review container
                reviewDiv.appendChild(reviewHeaderDiv);
                reviewDiv.appendChild(reviewText);

                // Append review container to review section
                reviewSection.appendChild(reviewDiv);
            });
        })
        .catch(error => console.error('Error fetching reviews:', error));
});