const noOfSteps = 25

class Ball {
    constructor({ x, y }) {
        this.x = x
        this.y = y
        this.distToTravel = 0;

        this.curveCenter = createVector()
        this.yJump = 0
    }

    display() {
        fill(220, 0, 150)
        circle(this.x, this.y + this.yJump, 15)
        this.move();
    }

    goToPix(target) {
        this.curveCenter = createVector(this.x + (target - this.x)/2, this.y)
        this.resetSteps();
        this.distToTravel = target - this.x;
        this.step = this.distToTravel/this.noOfSteps
    }

    move() {
        if(this.noOfSteps>0) {
            this.step = this.distToTravel/noOfSteps
            this.x+=this.step;
            this.noOfSteps--;

            this.yMap = map(this.noOfSteps, 0, noOfSteps, 0, PI)
            this.yJump = -25*sin(this.yMap)
        }
    }

    resetSteps() {
        this.noOfSteps = noOfSteps;
    }
}