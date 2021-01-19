const noOfSteps = 15

class Ball {
    constructor({ x, y }) {
        this.x = x
        this.y = y
        this.distToTravel = 0;
    }

    display() {
        fill(220, 0, 150)
        circle(this.x, this.y, 15)
        this.move();
    }

    goToPix(target) {
        this.resetSteps();
        this.distToTravel = target - this.x;
        this.step = this.distToTravel/this.noOfSteps
    }

    move() {
        if(this.noOfSteps>0) {
            this.step = this.distToTravel/noOfSteps
            this.x+=this.step;
            this.noOfSteps--;
        }
    }

    resetSteps() {
        this.noOfSteps = noOfSteps;
    }
}