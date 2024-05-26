const user_details = [
    {
        username: "admin",
        password: "admin@123"
    },
    {
        username:"vaibhav19",
        password:"vaibhav@123"
    },
    {
        username:"sahilsan",
        password:"sahil@9211"
    }
];

// Function to get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get the username and password from the URL
const usernameFromURL = getURLParameter('username');
const passwordFromURL = getURLParameter('password');

// Function to authenticate user
function authenticate(username, password) {
    const validUser = user_details.find(user => user.username === username && user.password === password);
    console.log(validUser);
    if (validUser) {
        window.location.href = 'https://vaibhav-cls.github.io/Smart-Farming-App/menu.html';
    } else {
        alert('Invalid username or password');
    }
}

// Add event listener to the form
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the form if URL parameters are not present
    const username = usernameFromURL || document.getElementById('username').value;
    const password = passwordFromURL || document.getElementById('password').value;

    // Authenticate the user
    authenticate(username, password);
});

// If URL parameters are present, automatically authenticate
if (usernameFromURL && passwordFromURL) {
    authenticate(usernameFromURL, passwordFromURL);
}
