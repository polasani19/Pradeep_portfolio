const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

weatherForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;
    weatherResult.innerHTML = 'Loading...';

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        const { name, main, weather } = data;
        weatherResult.innerHTML = `
            <h2>${name}</h2>
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather icon">
            <div><strong>${main.temp}°C</strong></div>
            <div>${weather[0].description}</div>
        `;
    } catch (err) {
        weatherResult.innerHTML = `<span class="error">${err.message}</span>`;
    }
    cityInput.value = '';
});
