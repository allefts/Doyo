import { WeatherWidget } from "./widgets/Weather.js";
import { TodoWidget } from "./widgets/Todo.js";

// export const STATES = ["loading", "done", "error"];

customElements.define("ats-weather-widget", WeatherWidget);
customElements.define("ats-todo-widget", TodoWidget);
