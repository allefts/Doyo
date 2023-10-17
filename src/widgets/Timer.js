const timerTemplate = document.createElement("template");

export class TimerWidget extends HTMLElement {
  constructor() {
    super();
    this.append(timerTemplate.content.cloneNode(true));

    this.min = 0;
    this.sec = 0;
    this.currState = false;
    this.intervalFunc;
  }

  connectedCallback() {
    this._renderDefault();
    this.minuteEl = this.querySelector("#timer-minute");
    this.secondEl = this.querySelector("#timer-second");
    this.startStopButton = this.querySelector("#start-stop-btn");

    this.minuteEl.addEventListener("mouseover", () => this.minuteEl.focus());
    this.minuteEl.addEventListener("keypress", (e) => e.preventDefault());
    this.minuteEl.addEventListener(
      "change",
      (e) => (this.min = e.target.value)
    );

    this.secondEl.addEventListener("keypress", (e) => e.preventDefault());
    this.secondEl.addEventListener("mouseover", () => this.secondEl.focus());
    this.secondEl.addEventListener(
      "change",
      (e) => (this.sec = e.target.value)
    );

    this.startStopButton.addEventListener(
      "click",
      this.handleStartStop.bind(this)
    );
  }

  handleStartStop() {
    if (this.min !== 0 || this.sec !== 0) {
      //Change state Start || Stop
      this.currState = !this.currState;
      switch (this.currState) {
        case true:
          this.startTimer();
          break;
        case false:
          this.stopTimer();
          break;
      }
    }
    console.log(this.min, this.sec, this.currState);
  }

  startTimer() {
    console.log("Starting Timer");
    this.intervalFunc = setInterval(this.handleTimeChange.bind(this), 1000);
  }

  handleTimeChange() {
    if (this.sec > 0) {
      this.sec -= 1;
    } else if (this.sec === 0) {
      if (this.min > 0) {
        this.min -= 1;
        this.sec = 59;
      } else if (this.min === 0) {
        //Timer Finished
        console.log("Timer Finished!!");
        clearInterval(this.intervalFunc);
      }
    }
    console.log(this.min, this.sec);
  }

  stopTimer() {
    clearInterval(this.intervalFunc);
    console.log("Stopping Timer");
  }

  finishTimer() {}

  _renderDefault() {
    this.innerHTML = `
    <style>
      #timer-container {
        display: grid;
        place-items: center;
        height: 100%;
      }

      #timer-inputs {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5rem;
        
      }

      #timer-minute, #timer-second {
        max-width: 75px;
        color: white;
        font-size: 3rem;
        outline: none;
        border: none;
        padding: .25rem;
        text-align: center;
        caret-color: transparent;
        // background: transparent;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }

      input[type=number] {
        -moz-appearance: textfield;
      }
    </style>

    <div id="timer-container">
      <div id="timer-inputs">
        <input class="glass-card round" id="timer-minute" placeholder="00" type="number" min="0" max="59" step="1" maxlength="2"/>
        <input class="glass-card round" id="timer-second" placeholder="00" type="number" min="0" max="60" step="1" maxlength="2"/>
      </div>
      <div>
        <button id="start-stop-btn" >${
          !this.currState ? "Start" : "Stop"
        }</button>
        <button>Clear</button>
      </div>
    </div>
    `;
  }
}
