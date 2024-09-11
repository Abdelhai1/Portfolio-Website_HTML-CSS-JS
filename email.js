import emailjs from '@emailjs/browser';

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', () => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);  
});

// Handle form submission and progress bar
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Show progress bar
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    progressBarContainer.style.display = 'block';
    progressBar.style.width = '0%';

    // Simulate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progress < 90) {
            progress += 10;
            progressBar.style.width = `${progress}%`;
        } else {
            clearInterval(progressInterval);
        }
    }, 200);

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Send the email using EmailJS
    emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, {
        name: name,
        email: email,
        message: message
    }).then(function (response) {
        clearInterval(progressInterval);
        progressBar.style.width = '100%';
        alert('Message sent successfully!');
        progressBarContainer.style.display = 'none';  // Hide progress bar after success
    }, function (error) {
        clearInterval(progressInterval);
        progressBarContainer.style.display = 'none';  // Hide progress bar on failure
        alert('Failed to send message. Please try again later.');
    });
});
