let n, config

function setup() {
  createCanvas(1000, 400);
  const margin = width/20
  config = {
    x: margin,
    y: height/2,
    w: width - margin*2,
    min: -10,
    max: 10,
    tick: 1
  }
  
  n = new Numberline(config)
}

function draw() {
  background(0)
  n.display();
}