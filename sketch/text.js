class Text {
    constructor({ x,y, size }) {
        this.x = x;
        this.y = y
        this.alpha = 0;
        this.show = false;
        this.text = ""
        this.alphaStep = 35
        this.size = size
    }

    display() {
       this.showStep();
       fill(255, 255,255, this.alpha)
       textSize(this.size)
       textAlign(CENTER)
       text(this.text, this.x, this.y)
    }

    showText(text) {
        return new Promise((resolve)=>{
            this.show = true;
            this.text = text;
            this.finishShow = resolve
        })
    }

    hideText() {
        return new Promise((resolve)=>{
            this.show = false;
            this.finishHide = resolve
        })
    }

    showStep = () => {
        if(this.show) {
            const isStillVisible = this.alpha<255
            if(isStillVisible) {
                this.alpha+=this.alphaStep;
            } else {
                this.finishShow();
            }
        } else {
            if(this.alpha>-step) {
                this.alpha-=this.alphaStep;
            } else {
                if(this.finishHide) {
                    this.finishHide();
                }
            }
        }
    }

    clear() {
        this.text = ""
    }
}