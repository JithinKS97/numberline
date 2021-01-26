let n,
  b1,
  b2,
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
  nextButton,

  bPrev

function setup() {
  createCanvas(1000, 400);
  initialize();
  expInput = createInput();

  const beginButton = createButton("Start");
  beginButton.mousePressed(onStartPress);

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

  ballConfig.fill = [220, 0, 150]
  b1 = new Ball(ballConfig);

  ballConfig.fill = [255, 255, 0]
  b2 = new Ball(ballConfig);

  c = new Calculator();
  t = new Text({ x:width/2 , y:70, size: 40 });
}

const add = (noToAdd) => async () => {

  const isExpressionNotEntered = steps.length === 0

  if (isExpressionNotEntered) {
    return;
  }

  const nextStep = step + noToAdd;
  const isStepWithinRange = nextStep >= 0 && nextStep < steps.length;
  
  if (isStepWithinRange) {
    moveAndShowCalculation(
      steps[step], 
      steps[step + noToAdd],
    );
    step += noToAdd;
  }
};

let b2Now = 0;

const moveAndShowCalculation = async (from, to) => {
  if (loading) {
    return;
  }

  loading = true;
  
  let isDoubleNegative = symbols[step] === "--"
  let expression
  if(isDoubleNegative) {
    expression = getExp(from, to, "--")
    if(to>from) {
      await t.showText(expression, "--")
      await new Promise(resolve => setTimeout(resolve, 1000));
      await t.hideText()
    }
    expression = getExp(from, to);
    if(to>from) {
      await t.showText(expression, "+")
    } else {
      await t.showText(expression)
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  } else {
    expression = getExp(from, to);
    await t.showText(expression)
  }

  await moveByApparition(b2, from)
  await moveBall(b1, from, to)
  
  await t.hideText();

  await showCalculation(from, to, isDoubleNegative)

  loading = false;
};

const showCalculation = async (from, to) => {
  
  const expression = getExp(from, to)
  const result = eval(expression)

  const calculationText =  expression + "=" + result
  await t.showText(calculationText);

  await new Promise(resolve => setTimeout(resolve, 1000));

  await t.hideText();

  await t.showText(result);
}

const moveBall = async (b1, from, to) => {
  let step = (to - from) / abs(to - from);
  let currentStep = from + step;

  let beforeDestination =
    step === 1 ? () => currentStep <= to : () => currentStep >= to;

  while (beforeDestination()) {
    await b1.jumpTo(n.getPix(currentStep));
    currentStep += step;
  }
}

const moveByApparition = async (b2, x) => {
  if(x) {
    await new Promise(resolve => setTimeout(resolve, 300));
    await b2.disappear();
    b2.x = n.getPix(x);
    await b2.appear();
    await new Promise(resolve => setTimeout(resolve, 200));
  }
}

let symbols;

const onStartPress = () => {
  loading = false;
  initialize();
  t.clear();
  steps = c.calculate(expInput.value()).map(res=>res.current);
  symbols = c.calculate(expInput.value()).map(res=>res.symbol);  
  if(!steps) {
    return;
  }
  steps = [0, ...steps]
  step = 0;
  b1.x = n.getPix(0);
  opText = "";
  t.clear();
  add(1)()
};

const getExp = (from, to, symbol) => {
  let p = from + "";
  let q = to - from > 0 ? (symbol?"--":"+") + (to - from) : "" + (to - from);
  return p+q
}

function draw() {
  background(0);
  n.display();
  b2.display();
  b1.display();
  t.display();
  enableDisableButtons();
}

const enableDisableButtons = () => {
  if(loading) {
    prevButton.attribute("disabled", true)
    nextButton.attribute("disabled", true)
  } else {
    const prevStepDoesNotExist = step!==0
    if(prevStepDoesNotExist) {
      prevButton.removeAttribute("disabled")
    } else {
      prevButton.attribute("disabled", true)
    }
    if(steps) {
      const nextStepDoesNotExist = step !== steps.length-1
      if(nextStepDoesNotExist) {
        nextButton.removeAttribute("disabled")
      } else {
        nextButton.attribute("disabled", true)
      }
    }
  }
}