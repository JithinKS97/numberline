let n, config

function setup() {
  createCanvas(640, 400);
  const margin = width/20
  config = {
    x: margin,
    y: height/2,
    w: width - margin*2
  }
  
  n = new Numberline(config)
}

function draw() {
  background(0)
  n.display();
}