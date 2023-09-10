const timerTemplate = document.createElement("template");

export class TimerWidget extends HTMLElement {
  constructor() {
    super();
    this.append(timerTemplate.content.cloneNode(true));
  }
}
