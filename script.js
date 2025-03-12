setInterval(() => {
  let d = new Date();
  let hh = d.getHours();
  let mm = d.getMinutes();
  let ss = d.getSeconds();
  let digiTime = `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;

  let hAngle = (hh % 12) * 30 + mm * 0.5;
  let mAngle = mm * 6 + ss * 0.1;
  let sAngle = ss * 6;

  hour.style.transform = `rotate(${hAngle}deg)`;
  minute.style.transform = `rotate(${mAngle}deg)`;
  second.style.transform = `rotate(${sAngle}deg)`;
  document.getElementById("digital").innerText = `${digiTime}`;
}, 1000);

async function fetchWeatherByLocation(lat, lon) {
  const apiKey = 'd6b828ef708a4283843b8480b69d72bf';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}

function updateWeatherUI(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const condition = data.weather[0].description;

  document.getElementById('cityName').textContent = cityName;
  document.getElementById('temperature').textContent = `${temperature.toFixed(1)} °C`;
  document.getElementById('humidity').textContent = `${humidity} %`;
  document.getElementById('windSpeed').textContent = `${windSpeed} m/s`;
  document.getElementById('condition').textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
}

// Get user's location
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get location. Please enable location services.');
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};
