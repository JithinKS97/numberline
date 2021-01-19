let n, config, b, currentNo = 0, tick = 1, min= -10, max=10;

function setup() {
  createCanvas(1000, 400);

  const margin = width/20

  const numLineConfig = {
    x: margin,
    y: height/2,
    w: width - margin*2,
    min,
    max,
    tick
  }

  const ballConfig = {
    x:width/2,
    y:height/2
  }
  
  n = new Numberline(numLineConfig)
  b = new Ball(ballConfig);

  const nextButton = createButton("+1")
  nextButton.mousePressed(add(1))

  const prevButton = createButton("-1")
  prevButton.mousePressed(add(-1))

  nextButton.position(width/2, height)
  prevButton.position(width/2 - 50, height)
}

const add = (noToAdd) => () =>{
  if(currentNo+noToAdd <= max && currentNo+noToAdd >= min) {
    currentNo+=noToAdd;
    b.goToPix(n.getPix(currentNo))
  }
}

function draw() {
  background(0)
  n.display();
  b.display();
}