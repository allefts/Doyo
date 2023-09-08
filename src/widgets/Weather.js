import { tempToEmoji } from "../utils/emojis.js";

const weatherTemplate = document.createElement("template");

export class WeatherWidget extends HTMLElement {
  constructor() {
    super();
    this.append(weatherTemplate.content.cloneNode(true));
    this.locationData = "No Location";
    this.currUnit = "F";
  }

  async connectedCallback() {
    this._renderDefault();
    const data = await this._getLocation();

    if (data.success) {
      this.locationData = data.success;
      this._processData();
      this._renderWeather();
      this._initUnits();
      this.setAttribute("active", "F");
    } else {
      this.locationData = "No data";
      this._renderDefault();
    }
  }

  async _getLocation() {
    const API_KEY = "ea280559dccb736c08acef4ce7ea1175";
    const data = await this._getPos();
    if (data.success) {
      const { latitude, longitude } = data.success;
      const ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
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
      temp: main.temp,
      feelsLike: main.feels_like,
      minTemp: main.temp_min,
      maxTemp: main.temp_max,
      main: weather[0].main,
      description: weather[0].description,
      icon: `https://openweathermap.org/img/w/${weather[0].icon}.png`,
      country: sys.country,
      sunrise: sys.sunrise,
      sunset: sys.sunset,
      wind: wind.speed,
    };
  }

  _handleUnitConversion(num) {
    switch (this.currUnit) {
      case "F":
        return Math.floor((num - 273.15) * (9 / 5) + 32);
      case "C":
        return Math.floor(num - 273.15);
    }
  }

  _initUnits() {
    this.unit1 = this.querySelector("#unit1");
    this.unit2 = this.querySelector("#unit2");
    this.temp = this.querySelector("#weather-data-temp");
    this.unit = this.querySelector("#unit");

    this.unit1.addEventListener("click", () => {
      this.unit1.classList.add("active");
      this.unit2.classList.remove("active");

      this.currUnit = "F";
      this.temp.textContent = this._handleUnitConversion(this.weatherData.temp);
      this.unit.innerHTML = "&#8457;";
    });

    this.unit2.addEventListener("click", () => {
      this.unit1.classList.remove("active");
      this.unit2.classList.add("active");

      this.currUnit = "C";
      this.temp.textContent = this._handleUnitConversion(this.weatherData.temp);
      this.unit.innerHTML = "&#8451;";
    });
  }

  static get observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "active":
        if (!oldVal) {
          this.unit1.classList.toggle("active");
        }
        break;
    }
  }

  _renderWeather() {
    this.innerHTML = `
    <style>
      #weather-content {
        width: 100%;
        height: 100%;
        padding: .25rem;

        display: flex;
        color: #ccc;

        position: relative;
      }

      #weather-content > * {
        flex: 1 0 30%;
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

      #weather-temp-container {
        display: flex;
      }

      #weather-data-location {
        text-align: center;
      }
      
      #weather-unit-toggle {
        position: absolute;
        bottom: 0;
        right: 0;
        
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-radius: 8px;
        width: 50px;

      }

      #weather-unit-toggle > * {
        flex: 1 0 50%;
      }

      #unit1, #unit2 {
        text-align: center;
        cursor: pointer;
        transition: all 300ms ease;
      }

      #unit1:hover, #unit2:hover, .active{
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.2),
          rgba(255, 255, 255, 0.15)
        );
      }
    </style>

    <div id="weather-content"> 
      <div id="weather-icon-container">
        <h1>${tempToEmoji(this.weatherData.main)}</h1>
      </div>
      <div id="weather-data-container">
        <div id="weather-temp-container">
          <h1 id="weather-data-temp">${this._handleUnitConversion(
            this.weatherData.temp
          )}</h1>
          <span id="unit">${
            this.currUnit === "F" ? "&#8457;" : "&#8451;"
          }</span>
        </div>
      </div>
      <div id="weather-data-location">
        <p>📍 ${this.weatherData.name}</p>
      </div>
      <div class="glass-card round" id="weather-unit-toggle">
         <span class="left-round" id="unit1">&#8457;</span>
         <span class="right-round" id="unit2">&#8451;</span>
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
