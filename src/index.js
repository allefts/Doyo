import { WeatherWidget } from "./widgets/Weather.js";
import { TodoWidget } from "./widgets/Todo.js";
import { TimerWidget } from "./widgets/Timer.js";

// export const STATES = ["loading", "done", "error"];

customElements.define("ats-weather-widget", WeatherWidget);
customElements.define("ats-todo-widget", TodoWidget);
customElements.define("ats-timer-widget", TimerWidget);
