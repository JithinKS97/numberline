class Numberline {
  constructor(config) {
    const { x,y,w } = config
    this.x = x;
    this.y = y;
    this.w = w
  }
  
  display() {
    stroke(255)
    strokeWeight(10)
    line(this.x, this.y, this.x+this.w, this.y)
  }
}