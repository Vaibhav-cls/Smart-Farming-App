function fetchWeatherData(latitude, longitude) { /*lat=${latitude}&lon=${longitude}*/
    const apiKey = '91508ca96fefaf58f39ed1b7e029abe0';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=raipur&appid=${apiKey}`;
    let location = document.getElementById("location");
    let temperature = document.getElementById("temp");
    let windSpeed = document.getElementById("windSpeed");
    let windDeg = document.getElementById("windDeg");
    let windGust = document.getElementById("windGust");
    let lon = document.getElementById("lon");
    let lat = document.getElementById("lat");
    let humidity = document.getElementById("humidity");
    let pressure = document.getElementById("pressure");
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process the data and display it on the page
            console.log(data);
            location.innerText = data.name || 'N/A';
            temperature.innerText = data.main && data.main.temp ? (data.main.temp - 273.15).toFixed(2) + '°C' : 'N/A';
            windSpeed.innerText = data.wind && data.wind.speed ? data.wind.speed + ' m/s' : 'N/A';
            windDeg.innerText = data.wind && data.wind.deg ? data.wind.deg + '°' : 'N/A';
            windGust.innerText = data.wind && data.wind.gust ? data.wind.gust + ' m/s' : 'N/A';
            lon.innerText = data.coord && data.coord.lon ? data.coord.lon : 'N/A';
            lat.innerText = data.coord && data.coord.lat ? data.coord.lat : 'N/A';
            humidity.innerText = data.main && data.main.humidity ? data.main.humidity + '%' : 'N/A';
            pressure.innerText = data.main && data.main.pressure ? data.main.pressure + ' hPa' : 'N/A';
            console.log("executing");
        })
        .catch(error => {
            console.error('There was a problem fetching the weather data:', error);
            document.getElementById('weather-data').innerText = 'Error fetching weather data';
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
