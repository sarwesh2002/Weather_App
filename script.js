// this code will fetch weather data of cities

const API_KEY = "d94becc406184c2aa1981224251607";

function getComfortLevel(humidity) {
  if (humidity < 30) return "Dry";
  if (humidity <= 60) return "Comfortable";
  return "Humid";
}

async function getWeather(e, cityname) {
  if (e) e.preventDefault();

  const city = cityname || document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");

  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
    city
  )}&aqi=yes`;

  try {
    let res = await fetch(url);
    let data = await res.json();

    if (data.error) {
      alert(data.error.message);
      return;
    }

	console.log(data)
    // ✅ Update city heading
    document.getElementById(
      "cityTitle"
    ).textContent = `Weather for ${data.location.name}`;

    // ✅ Update Temperature
    document.getElementById("Temp_Main").textContent = `${data.current.temp_c}`;
    document.getElementById(
      "Temp_Actual"
    ).textContent = `${data.current.temp_c}°C`;
    document.getElementById(
      "Temp_FeelsLike"
    ).textContent = `${data.current.feelslike_c}°C`;
    document.getElementById("Temp_Min").textContent = "--"; // Min
    document.getElementById("Temp_Max").textContent = "--"; // Max

    // ✅ Update Humidity
    document.getElementById(
      "Humidity_Main"
    ).textContent = `${data.current.humidity}`;
    document.getElementById(
      "Humidity_Current"
    ).textContent = `${data.current.humidity}%`;
    document.getElementById("Humidity_Comfort").textContent = getComfortLevel(
      data.current.humidity
    );
    document.getElementById("Humidity_DewPoint").textContent = "--"; // Dew point
    document.getElementById("Humidity_Index").textContent = "--"; // Index

    // ✅ Update Wind
    document.getElementById(
      "Wind_Main"
    ).textContent = `${data.current.wind_kph}`;
    document.getElementById(
      "Wind_Speed"
    ).textContent = `${data.current.wind_kph} kph`;
    document.getElementById("Wind_Direction").textContent =
      data.current.wind_dir;
    document.getElementById(
      "Wind_Gust"
    ).textContent = `${data.current.gust_kph} kph`;
    document.getElementById("Wind_Chill").textContent = "--"; // Chill
  } catch (err) {
    console.log(err);
    alert("Failed to fetch weather data.");
  }
}

// for popular cities weather

const popularCities = [
  "Tokyo",
  "Bangkok",
  "New York",
  "London",
  "Osaka",
  "Shanghai",
  "Istanbul",
  "Paris",
  "Beijing",
  "Mumbai",
];

function updateCityRow(city, data) {
  let id = city.toLowerCase().replace(/\s+/g, "");

  document.getElementById(
    `${id}_temp`
  ).textContent = `${data.current.temp_c}°C`;
  document.getElementById(
    `${id}_humidity`
  ).textContent = `${data.current.humidity}%`;
  document.getElementById(
    `${id}_wind`
  ).textContent = `${data.current.wind_kph}kph`;
}

async function loadPopularCitiesWeather() {
  for (const city of popularCities) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
      city
    )}&aqi=yes`;
  

  try{
	let res = await fetch(url);
	let data = await res.json();

	if(!data.error){
		updateCityRow(city , data)
	}
  } catch(err){
	console.log(`Failed to fetch weather for ${city} `, err)
  }
  }
}
