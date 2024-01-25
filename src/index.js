import { WeatherWidget } from "./widgets/Weather.js";
import { TodoWidget } from "./widgets/Todo.js";
import { TimerWidget } from "./widgets/Timer.js";
import { SketchpadWidget } from "./widgets/Sketchpad.js";
import { CryptoWidget } from "./widgets/Crypto.js";

// export const STATES = ["loading", "done", "error"];

customElements.define("ats-weather-widget", WeatherWidget);
customElements.define("ats-todo-widget", TodoWidget);
customElements.define("ats-timer-widget", TimerWidget);
customElements.define("ats-sketchpad-widget", SketchpadWidget);
customElements.define("ats-crypto-widget", CryptoWidget);
