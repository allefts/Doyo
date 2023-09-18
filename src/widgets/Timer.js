const timerTemplate = document.createElement("template");

export class TimerWidget extends HTMLElement {
  constructor() {
    super();
    this.append(timerTemplate.content.cloneNode(true));

    this.min = 0;
    this.sec = 0;
    this.currState = false;
  }

  connectedCallback() {
    this._renderDefault();
    this.minuteEl = this.querySelector("#timer-minute");
    this.secondEl = this.querySelector("#timer-second");
    this.startStopButton = this.querySelector("#start-stop-btn");

    this.minuteEl.addEventListener(
      "keypress",
      this._handleChangeTime.bind(this, "min")
    );

    this.secondEl.addEventListener(
      "keypress",
      this._handleChangeTime.bind(this, "sec")
    );

    this.startStopButton.addEventListener("click", () => {
      console.log(this.min, this.sec);
    });
  }

  _handleChangeTime(timeType, e) {
    if (e.which < 48 || e.which > 57) {
      e.preventDefault();
      console.log("Invalid Number...");
    } else {
      if (intVal > 59) {
        e.target.value = 59;
      } else if (intVal < 0) {
        e.target.value = 0;
      }

      console.log(timeType);
      console.log(this);

      if (timeType === "min") {
        this.min = e.target.value;
      } else if (timeType === "sec") {
        this.sec = e.target.value;
      }
    }
  }

  _renderDefault() {
    this.innerHTML = `
    <style>
      #timer-container {
        display: grid;
        place-items: center;
      }

      #timer-minute, #timer-second {
        color: white;
        padding: .25rem;
        outline: none;
        background: transparent;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
      }

      // input[type=number] {
      //   -moz-appearance: textfield;
      // }
    </style>

    <div id="timer-container">
      <div>
        <input class="glass-card round" id="timer-minute" placeholder="00" type="number" min="0" max="59" step="1"/>
        <input class="glass-card round" id="timer-second" placeholder="00" type="number" min="0" max="60" step="1"/>
      </div>
      <div>
        <button id="start-stop-btn" >${
          !this.currState ? "Start" : "Stop"
        }</button>
        <button>Clear</button>
      </div>

      <div>
      </div>
    </div>
    `;
  }
}
