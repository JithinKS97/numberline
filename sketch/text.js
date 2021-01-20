class Text {
    constructor({ x,y, size }) {
        this.x = x;
        this.y = y
        this.trans = 0;
        this.show = false;
        this.text = ""
        this.step = 35
        this.size = size
    }

    display() {
       this.showStep();
       fill(255, 255,255, this.trans)
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
            if(this.trans<255) {
                this.trans+=this.step;
            } else {
                this.finishShow();
            }
        } else {
            if(this.trans>-step) {
                this.trans-=this.step;
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