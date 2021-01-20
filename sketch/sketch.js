let n,
  b,
  currentNo = 0,
  tick = 1,
  min = -10,
  max = 10,
  c,
  steps,
  step = 0,
  loading = false,
  opText,
  exp,
  expInput,
  calcText,
  t,
  prevButton,
  nextButton

function setup() {
  createCanvas(1000, 400);
  initialize();
  expInput = createInput();

  const beginButton = createButton("Start");
  beginButton.mousePressed(begin);

  nextButton = createButton("Next");
  nextButton.mousePressed(add(1));

  prevButton = createButton("Prev");
  prevButton.mousePressed(add(-1));
}

const initialize = () => {
  const margin = width / 20;

  const numLineConfig = {
    x: margin,
    y: height / 2,
    w: width - margin * 2,
    min,
    max,
    tick,
  };

  const ballConfig = {
    x: width / 2,
    y: height / 2,
  };

  n = new Numberline(numLineConfig);
  b = new Ball(ballConfig);
  c = new Calculator();
  t = new Text({ x:width/2 , y:70, size: 40 });
}

const add = (noToAdd) => async () => {
  if (steps.length === 0) {
    return;
  }
  if (step + noToAdd >= 0 && step + noToAdd < steps.length) {
    move(steps[step], steps[step + noToAdd]);
    step += noToAdd;
  }
};

const move = async (from, to) => {
  if (loading) {
    return;
  }

  loading = true;

  const step = (to - from) / abs(to - from);
  let currentStep = from + step;

  const beforeDestination =
    step === 1 ? () => currentStep <= to : () => currentStep >= to;

  await t.showText(getExp(to, from))

  while (beforeDestination()) {
    await b.jumpTo(n.getPix(currentStep));
    currentStep += step;
  }

  await t.hideText();
  await t.showText(getExp(to, from) + "=" + eval(getExp(to, from)));
  await new Promise(resolve => setTimeout(resolve, 1000));
  await t.hideText();
  await t.showText(eval(getExp(to, from)));

  loading = false;
};

const begin = () => {
  loading = false;
  initialize();
  t.clear();
  steps = c.calculate(expInput.value());
  steps = [0, ...steps]
  step = 0;
  b.x = n.getPix(0);
  opText = "";
  t.clear();
  add(1)()
};

const getExp = (to, from) => {
  let p = from + "";
  let q = to - from > 0 ? "+" + (to - from) : "" + (to - from);
  return p+q
}

function draw() {
  background(0);
  n.display();
  drawFromCircle();
  b.display();
  t.display();
  enableDisableButtons();
}

const drawFromCircle = () => {
  if(steps) {
    fill(255,255,0)
    circle(n.getPix(steps[1]), height/2, 15)
  }
}
const enableDisableButtons = () => {
  if(loading) {
    prevButton.attribute("disabled", true)
    nextButton.attribute("disabled", true)
  } else {
    prevButton.removeAttribute("disabled", true)
    nextButton.removeAttribute("disabled", true)
  }
}