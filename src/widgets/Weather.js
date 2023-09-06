const weatherTemplate = document.createElement("template");

export class WeatherWidget extends HTMLElement {
  constructor() {
    super();

    this.append(weatherTemplate.content.cloneNode(true));
    this.locationData = "No Location";
  }

  async connectedCallback() {
    this._renderDefault();
    const data = await this._getLocation();

    if (data.success) {
      this.locationData = data.success;
      this._processData();
      this._renderWeather();
    } else {
      this.locationData = "No Location";

      this._renderDefault();
    }
  }

  async _getLocation() {
    const API_KEY = "ea280559dccb736c08acef4ce7ea1175";
    const data = await this._getPos();
    if (data.success) {
      const { latitude, longitude } = data.success;
      const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;
      const res = await fetch(ENDPOINT, { method: "GET" });
      const weatherData = await res.json();
      if (weatherData.main && weatherData.weather) {
        return { success: weatherData };
      } else {
        return { error: "Failure to fetch weather data..." };
      }
    } else {
      return { error: "Failure to get coords..." };
    }
  }

  _getPos() {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          res({ success: coords });
        },
        (err) => {
          rej({ error: err });
        }
      );
    });
  }

  _processData() {
    const { main, weather, name, sys, wind } = this.locationData;
    this.weatherData = {
      name: name,
      temp: Math.floor(main.temp),
      feelsLike: Math.floor(main.feels_like),
      minTemp: Math.floor(main.temp_min),
      maxTemp: Math.floor(main.temp_max),
      main: weather[0].main,
      description: weather[0].description,
      country: sys.country,
      sunrise: sys.sunrise,
      sunset: sys.sunset,
      wind: wind.speed,
    };
  }

  _kTof(num) {
    return num - 272.15 * (9 / 5) + 32;
  }

  _renderWeather() {
    this.innerHTML = `
    <style>
      #weather-content {
        width: 100%;
        height: 100%;
        padding: .5rem;

        display: flex;
        color: #ccc;
      }

      #weather-content > * {
        flex: 1 0 33%;
      }

      #weather-icon-container {
        display: grid;
        place-items: center;
      }

      #weather-icon-container h1 {
        font-size: 3rem;
      }

      #weather-data-container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      #weather-data-temp {
        margin-bottom: .25rem;
      }

      #weather-data-location {
        text-align: center;
      }
    </style>

    <div id="weather-content"> 
      <div id="weather-icon-container">
        <h1>☀️</h1>
      </div>
      <div id="weather-data-container">
        <div>
          <h1 id="weather-data-temp">${this.weatherData.temp}&#8457;</h1> 
          <p>${this.weatherData.main}</p>
        </div>
      </div>
      <div id="weather-data-location">
        <p>${this.weatherData.name} 📍</p>
      </div>
    </div>
    `;
  }

  _renderDefault() {
    this.innerHTML = `
    <style>
      h1,
      h2,
      h3 {
        padding: 0;
        margin: 0;
        color: white;
      }

      #weather-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    </style>
     
    <div id="weather-content">
      <h1>☹️ No Location</h1>
    </div>
    `;
  }
}
