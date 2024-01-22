export class SketchpadWidget extends HTMLElement {
  constructor() {
    super();

    this.isDrawing = false;
    this.canvas;
    this.ctx;
  }

  connectedCallback() {
    this.render();
    this.canvas = this.querySelector("#sketchpad-canvas");
    this.ctx = this.canvas.getContext("2d");

    //Setting mouse coords on move
    this.canvas.addEventListener("mousemove", this.draw);

    //Click down to start drawing
    this.canvas.addEventListener("mousedown", (e) => {});

    //End Drawing
    this.canvas.addEventListener("mouseup", (e) => {});
  }

  draw(e) {}

  render() {
    this.innerHTML = `
    <style>
      #sketchpad-canvas {
        width: 100%;
        height: 100%;
        border: 1px solid green;
      }
    </style>

    <div>
        <div class="toolbar">
            <p>Toolbar</p>
        </div>
        <div class="sketchpad">
            <p>Canvas</p>
            <canvas id="sketchpad-canvas"></canvas>
        </div>
    </div>
    `;
  }
}
