import { WeatherWidget } from "./widgets/Weather.js";

export const STATES = ["loading", "done", "error"];

customElements.define("ats-weather-widget", WeatherWidget);
