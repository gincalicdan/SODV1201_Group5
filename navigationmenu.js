document.addEventListener("DOMContentLoaded", function() {
    var header = document.getElementById("header");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            header.innerHTML = this.responseText;
            
            // Check if user is logged in
            var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if (loggedInUser) {
                // User is logged in, update navigation menu
                var nav = document.querySelector('nav ul');
                nav.innerHTML = ''; // Clear existing menu items
                
                var signoutLink = document.createElement('li');
                var signoutAnchor = document.createElement('a');
                signoutAnchor.textContent = 'Sign Out';
                signoutAnchor.setAttribute('href', '#');
                signoutAnchor.onclick = function() {
                    // Clear local storage and redirect to login page
                    localStorage.removeItem('loggedInUser');
                    window.location.href = 'login.html';
                };
                signoutLink.appendChild(signoutAnchor);
                nav.appendChild(signoutLink);
            }
        }
    };
    xhttp.open("GET", "navigationmenu.html", true);
    xhttp.send();
});
