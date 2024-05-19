function fetchWeatherData(latitude, longitude) {
    const apiKey = '91508ca96fefaf58f39ed1b7e029abe0';
    const apiUrl = `https://api.opeweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the data and display it on the page
            const weatherData = `
                <p>Location: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Description: ${data.weather[0].description}</p>
            `;
            document.getElementById('weather-data').innerHTML = weatherData;
        })
        .catch(error => {
            console.error('There was a problem fetching the weather data:', error);
            document.getElementById('weather-data').innerHTML = 'Error fetching weather data';
        });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherData(latitude, longitude);
        }, error => {
            console.error('Error getting user location:', error);
            document.getElementById('weather-data').innerHTML = 'Error getting user location';
        });
    } else {
        console.error('Geolocation is not supported by this browser');
        document.getElementById('weather-data').innerHTML = 'Geolocation is not supported';
    }
}

// Fetch weather data for the user's location when the page loads
getLocation();
