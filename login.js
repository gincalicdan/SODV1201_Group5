
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        var name = document.getElementById('name').value;
        var password = document.getElementById('password').value;

        var users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Users in localStorage:', users); // Log the users array
        
        var loggedInUser = users.find(user => user.name === name && user.password === password);

        if (loggedInUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            
            // Redirect based on user role using if and else statements
            if (loggedInUser.role === 'owner') {
                window.location.href = 'properties.html?name=';
                localStorage.setItem('username', name);
            } else if (loggedInUser.role === 'coworker') {
                window.location.href = 'coworker.html?name=';
                localStorage.setItem('username', name);
            } else {
                document.getElementById('login-message').innerText = 'Invalid user role';
                document.getElementById('login-message').style.color = 'red';
            }
        } else {
            document.getElementById('login-message').innerText = 'Invalid username or password! Please try again.';
            document.getElementById('login-message').style.color = 'red';
        }
    });
});
