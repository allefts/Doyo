export class SketchpadWidget extends HTMLElement {
  constructor() {
    super();

    this.prevX;
    this.prevY;
    this.isDrawing = false;
    this.canvas;
    this.ctx;
    this.clearBtn;

    this.strokeThickness;
    this.strokeColor;
  }

  connectedCallback() {
    this.render();
    this.clearBtn = this.querySelector("#clear-btn");
    this.canvas = this.querySelector("#sketchpad-canvas");
    this.strokeThickness = this.querySelector("#thickness-inpt");
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext("2d");

    this.clearBtn.addEventListener("click", (e) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });

    //Setting mouse coords on move
    this.canvas.addEventListener("mousemove", this.draw.bind(this));

    //Click down to start drawing
    this.canvas.addEventListener("mousedown", (e) => {
      this.isDrawing = true;
      this.prevX = e.offsetX;
      this.prevY = e.offsetY;
    });

    //End Drawing
    this.canvas.addEventListener("mouseup", (e) => {
      this.isDrawing = false;
    });
  }

  draw(e) {
    if (!this.isDrawing) {
      return;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(e.offsetX, e.offsetY);

    this.ctx.lineWidth = this.strokeThickness.value;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "rgb(0,0,0)";
    this.ctx.stroke();

    this.prevX = e.offsetX;
    this.prevY = e.offsetY;
  }

  render() {
    this.innerHTML = `
    <style>
      #clear-btn {

      }

      .sketchpad-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;        
      }

      .sketchpad {
        width: 100%;
        height: 100%;
      }

      #sketchpad-canvas {
        width: 100%;
        height: 100%;
      }
    </style>

    <div class="sketchpad-container">
        <div class="toolbar">
          <button class="glass-card round" id="clear-btn">Clear</button>
          <input id="thickness-inpt" type="range" min="1" max="10" value="1"/>
        </div>
        <div class="sketchpad">
            <canvas class="glass-card round" id="sketchpad-canvas"></canvas>
        </div>
    </div>
    `;
  }
}
