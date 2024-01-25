export class SketchpadWidget extends HTMLElement {
  constructor() {
    super();

    this.isDrawing = false;
    this.strokeColor = "#ffffff";
    this.timelineArr = [];
    this.timelineStep = -1;

    this.prevX;
    this.prevY;
    this.canvas;
    this.ctx;
    this.clearBtn;
    this.downloadBtn;
    this.undoBtn;
    this.strokeThickness;
  }

  connectedCallback() {
    this.render();
    this.clearBtn = this.querySelector("#clear-btn");
    this.downloadBtn = this.querySelector("#download-btn");
    this.undoBtn = this.querySelector("#undo-btn");
    this.canvas = this.querySelector("#sketchpad-canvas");
    this.colorPicker = this.querySelector("#color-picker");
    this.strokeThickness = this.querySelector("#thickness-inpt");
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.ctx = this.canvas.getContext("2d");

    this.downloadBtn.addEventListener("click", (e) => {
      const link = document.createElement("a");
      link.download = "sketchpad.png";
      link.href = this.canvas.toDataURL();
      link.click();
      link.delete;
    });

    this.clearBtn.addEventListener("click", (e) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.timelineStep = -1;
      this.timelineArr = [];
    });

    this.undoBtn.addEventListener("click", this.undo.bind(this));

    this.colorPicker.addEventListener("change", (e) => {
      this.ctx.strokeColor = e.target.value;
    });

    //Setting mouse coords on move
    this.canvas.addEventListener("mousemove", this.draw.bind(this));

    //Click down to start drawing
    this.canvas.addEventListener("mousedown", (e) => {
      this.isDrawing = true;
      this.prevX = e.offsetX;
      this.prevY = e.offsetY;
    });

    //End Stroke
    this.canvas.addEventListener("mouseup", (e) => {
      this.isDrawing = false;

      this.timelineStep++;
      if (this.timelineStep < this.timelineArr.length)
        this.timelineArr.length = this.timelineStep;
      this.timelineArr.push(this.canvas.toDataURL());
    });
  }

  draw(e) {
    if (!this.isDrawing) {
      return;
    }

    if (e.offsetX === 441) this.isDrawing = !this.isDrawing;

    this.ctx.beginPath();
    this.ctx.moveTo(this.prevX, this.prevY);
    this.ctx.lineTo(e.offsetX, e.offsetY);

    this.ctx.lineWidth = this.strokeThickness.value;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = this.colorPicker.value;
    this.ctx.stroke();

    this.prevX = e.offsetX;
    this.prevY = e.offsetY;
  }

  undo() {
    if (this.timelineStep > 0) {
      this.timelineStep--;
      let newPic = new Image();
      newPic.src = this.timelineArr[this.timelineStep];
      newPic.onload = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(newPic, 0, 0);
      };
    }
  }

  render() {
    this.innerHTML = `
    <style>
      .toolbar {
        display: flex;
        justify-content: space-between;
        margin-bottom: .5rem;
        flex-flow: row wrap;
      }

      #undo-btn, #clear-btn, #download-btn {
        font-size: .9rem;
      }

      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .sketchpad {
        width: 100%;
        height: 100%;
      }

      #sketchpad-canvas {
        width: 100%;
        height: 99.5%;
      }
    </style>

    <div class="container">
        <div class="toolbar">
          <input id="thickness-inpt" type="range" min="1" max="11" value="6"/>
          <input class="glass-card" id="color-picker" type="color" value="#ffffff "/>
          <button class="glass-card round btn" id="undo-btn">↺</button>
          <button class="glass-card round btn" id="clear-btn">🗑️</button>
          <button class="glass-card round btn" id="download-btn">💾</button>
        </div>
        <div class="sketchpad">
            <canvas class="glass-card round" id="sketchpad-canvas"></canvas>
        </div>
    </div>
    `;
  }
}
