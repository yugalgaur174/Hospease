document.querySelector('#send').addEventListener('click', function() {
    // Get the input value from the textarea
    const prompt = document.getElementById('prompt').value;

    // Make a POST request to the backend
    fetch('http://localhost:3050/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })  // Send the prompt as the request body
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        // Display the response in the .response paragraph
        document.querySelector('.response').textContent = data.response;  // Show generated text
    })
    .catch(error => {
        console.error('Error:', error);
        document.querySelector('.response').textContent = 'An error occurred';
    });
});
