export class SketchpadWidget extends HTMLElement {
  constructor() {
    super();

    this.canvas;
    this.ctx;
    this.mouse = {
      x: 0,
      y: 0,
    };
  }

  connectedCallback() {
    this.render();
    this.canvas = this.querySelector("#sketchpad-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.ctx.strokeStyle = "red";

    //Setting mouse coords on move
    this.canvas.addEventListener(
      "mousemove",
      (e) => {
        this.mouse.x = e.pageX - this.offsetLeft;
        this.mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    //Click down to start drawing
    this.canvas.addEventListener(
      "mousedown",
      (e) => {
        this.ctx.beginPath();
        this.ctx.moveTo(this.mouse.x, this.mouse.y);

        this.canvas.addEventListener(
          "mousemove",
          this.onPaint.bind(this),
          false
        );
      },
      false
    );

    //End Drawing
    this.canvas.addEventListener(
      "mouseup",
      this.canvas.removeEventListener(
        "mousemove",
        this.onPaint.bind(this),
        false
      ),
      false
    );
  }

  onPaint() {
    this.ctx.lineTo(this.mouse.x, this.mouse.y);
    this.ctx.stroke();
  }

  render() {
    this.innerHTML = `
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
