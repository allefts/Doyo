import { reactive, html } from "https://esm.sh/@arrow-js/core";

const timerTemplate = document.createElement("template");

export class TimerWidget extends HTMLElement {
  constructor() {
    super();
    this.append(timerTemplate.content.cloneNode(true));

    this.intervalFunc;

    this.timeLeft = reactive({
      min: 0,
      sec: 0,
      running: false,
    });
  }

  connectedCallback() {
    this._renderDefault();
    this.minuteEl = this.querySelector("#timer-minute");
    this.secondEl = this.querySelector("#timer-second");
    this.startStopButton = this.querySelector("#start-stop-btn");
    this.clearButton = this.querySelector("#clear-btn");

    this.minuteEl.addEventListener("mouseover", () => this.minuteEl.focus());
    // this.minuteEl.addEventListener("keypress", (e) => e.preventDefault());
    this.minuteEl.addEventListener(
      "change",
      (e) => (this.timeLeft.min = parseInt(e.target.value))
    );

    // this.secondEl.addEventListener("keypress", (e) => e.preventDefault());
    this.secondEl.addEventListener("mouseover", () => this.secondEl.focus());
    this.secondEl.addEventListener(
      "change",
      (e) => (this.timeLeft.sec = parseInt(e.target.value))
    );

    this.startStopButton.addEventListener(
      "click",
      this.handleStartStop.bind(this)
    );
    this.startStopButton.style.color = "rgba(112, 224, 0, 1)";

    this.clearButton.addEventListener("click", () => this.clearTimer());
  }

  handleStartStop() {
    if (
      (this.timeLeft.min !== 0 && isNaN(this.timeLeft.min) !== true) ||
      (this.timeLeft.sec !== 0 && isNaN(this.timeLeft.sec) !== true)
    ) {
      //Change state Start || Stop
      this.timeLeft.running = !this.timeLeft.running;
      switch (this.timeLeft.running) {
        case true:
          this.startStopButton.style.color = "#ED1109";
          this.startTimer();
          break;
        case false:
          this.startStopButton.style.color = "rgba(112, 224, 0, 1)";
          this.stopTimer();
          break;
      }
    }
  }

  handleTimeChange() {
    if (this.timeLeft.sec > 0) {
      this.timeLeft.sec -= 1;
    } else if (this.timeLeft.sec === 0) {
      if (this.timeLeft.min > 0) {
        this.timeLeft.min -= 1;
        this.timeLeft.sec = 59;
      } else if (this.timeLeft.min === 0) {
        //Timer Finished
        console.log("Timer Finished");
        clearInterval(this.intervalFunc);
      }
    }
  }

  startTimer() {
    if (this.timeLeft.min > 60) this.timeLeft.min = 60;
    if (this.timeLeft.sec > 60) this.timeLeft.sec = 60;
    if (this.timeLeft.min < 0) this.timeLeft.min = 0;
    if (this.timeLeft.sec < 0) this.timeLeft.sec = 0;
    if (isNaN(this.timeLeft.sec) || isNaN(this.timeLeft.min)) {
      this.timeLeft.sec = 0;
      this.timeLeft.min = 0;
      return;
    }

    this.intervalFunc = setInterval(this.handleTimeChange.bind(this), 1000);
  }

  stopTimer() {
    // console.log("Stopping Timer");
    clearInterval(this.intervalFunc);
  }

  clearTimer() {
    // console.log("Clearing Timer");
    clearInterval(this.intervalFunc);
    this.timeLeft.min = 0;
    this.timeLeft.sec = 0;
    this.timeLeft.running = false;
    this.startStopButton.style.color = "rgba(112, 224, 0, 1)";
  }

  finishTimer() {}

  _renderDefault() {
    const timerContent = html`<style>
        #timer-container {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          height: 100%;
        }

        #timer-inputs {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }

        #timer-minute,
        #timer-second {
          max-width: 75px;
          color: white;
          font-size: 3rem;
          outline: none;
          border: none;
          padding: 0.25rem;
          text-align: center;
          caret-color: transparent;
          position: relative;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

        #start-stop-btn,
        #clear-btn {
          padding: 4px 8px;
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
          text-align: center;
          outline: none;
          cursor: pointer;
          transition: all 300ms ease;
          background: transparent;

          transition: all 300ms ease;
        }

        #start-stop-btn:hover,
        #clear-btn:hover {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.15)
          );
        }
      </style>

      <div id="timer-container">
        <div id="timer-inputs">
          <input
            class="glass-card round"
            id="timer-minute"
            placeholder="00"
            type="number"
            min="0"
            max="59"
            step="1"
            maxlength="2"
            value="${() => this.timeLeft.min}"
            disabled="${() => this.timeLeft.running}"
          />
          <input
            class="glass-card round"
            id="timer-second"
            placeholder="00"
            type="number"
            min="0"
            max="60"
            step="1"
            maxlength="2"
            value="${() => this.timeLeft.sec}"
            disabled="${() => this.timeLeft.running}"
          />
        </div>
        <div>
          <button class="glass-card round" id="start-stop-btn">
            ${() => (!this.timeLeft.running ? "Start" : "Stop")}
          </button>
          <button class="glass-card round" id="clear-btn">Clear</button>
        </div>
      </div>`;

    timerContent(this);
  }
}
