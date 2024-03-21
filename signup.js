
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signup-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Retrieve form values
        let name = document.getElementById('name').value;
        let phone = document.getElementById('phone').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let confirmPassword = document.getElementById('confirmpassword').value;
        let role = document.getElementById('role').value;

        // Password validation - at least 6 characters long
        if (password.length < 6) {
            document.getElementById('signup-message').innerText = 'Password must be at least 6 characters long!';
            document.getElementById('signup-message').style.color = 'red';
            return; 
        }

        // Validate if passwords match
        if (password !== confirmPassword) {
            document.getElementById('signup-message').innerText = 'Passwords do not match!';
            document.getElementById('signup-message').style.color = 'red';
            return; 
        }

        // Phone number validation
        if (!isValidPhoneNumber(phone)) {
            document.getElementById('signup-message').innerText = 'Invalid phone number format!';
            document.getElementById('signup-message').style.color = 'red';
            return;
        }

        // Retrieve existing users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email already exists
        let existingUser = users.find(user => user.email === email);

        if (existingUser) {
            document.getElementById('signup-message').innerText = 'This email already exists. Try another!';
            document.getElementById('signup-message').style.color = 'red';
            return; 
        }

        // Create user object
        let userData = { name: name, phone: phone, email: email, password: password, role: role };

        // Add the new user data to the array
        users.push(userData);

        // Store the updated array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Set success message
        document.getElementById('signup-message').innerText = 'Signup successful!';
        document.getElementById('signup-message').style.color = 'green'; // Set text color to green for success message

        // Redirect to login page after a delay
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 2000); 
    });
});

function isValidPhoneNumber(phone) {
    // Regular expression for phone number format: (XXX) XXX-XXXX where X is a digit
    let phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
}