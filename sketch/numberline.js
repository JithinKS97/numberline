class Numberline {
  constructor(config) {
    const { x,y,w, min, max, tick } = config

    this.x = x;
    this.y = y;
    this.w = w
    this.min = min
    this.max = max
    this.tick = tick
  }
  
  display() {
    stroke(255)
    strokeWeight(2)
    line(this.x, this.y, this.x+this.w, this.y)
    this.markCoords();
  }

  markCoords() {
    const range = this.w
    const noOfTicks = (this.max - this.min)/this.tick
    const tickWidth = range/noOfTicks
    
    for(
      let x=this.x, n = this.min; 
      x<= this.x + this.w; 
      x+=tickWidth, n += this.tick
    ) {
      noStroke();
      fill(255)

      circle(x,this.y, 6)      

      textAlign(CENTER)
      textSize(15);
      text(n, x, this.y+20);
    }
  }

  getXCoords() {

  }

  getXPixel() {
    
  }
}