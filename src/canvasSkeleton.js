class CanvasSkeleton {
  constructor(width, height, canvas) {
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.setCanvasSize();

    this.ctx = this.canvas.getContext("2d");
  }
  
  
  setCanvasSize() {
    this.canvas.setAttribute('height', this.height);
    this.canvas.setAttribute('width', this.width);
  }
  
  reset() { // Clear everything
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  initCanvas() { // Draw a white background
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
    
  run() { // we're gonna override this basically everywhere.
    this.initCanvas();
    return this.canvas;
  } 
}

export default CanvasSkeleton;