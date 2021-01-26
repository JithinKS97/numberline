class Text {
    constructor({ x,y, size }) {
        this.x = x;
        this.y = y
        this.alpha = 0;
        this.show = false;
        this.text = ""
        this.alphaStep = 35
        this.size = size
        this.highLightText
        this.fill = [255,255,255]
    }

    display() {
       this.showStep();
       fill(255, 255,255, this.alpha)
       textSize(this.size)
       textAlign(CENTER)
       if(this.highLightText) {
            const startIndex = this.text.indexOf(this.highLightText)
            const endIndex = startIndex + this.highLightText.length
            const parts = [
                [this.text.slice(0, startIndex), [...this.fill, this.alpha]],
                [this.text.slice(startIndex, endIndex), [255,0,0, this.alpha]],
                [this.text.slice(endIndex, this.text.length), [...this.fill, this.alpha]]
            ]
            drawColoredText(this.x, this.y ,parts)
       } else {
            text(this.text, this.x, this.y)
       }
    }

    showText(text, highLightText) {
        return new Promise((resolve)=>{
            this.highLightText = highLightText
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

function drawColoredText( x, y, text_array ) {
   fill(text_array[0][1]) 
   text(text_array[0][0], x-1.2*textWidth(text_array[0][0]), y);
    
   fill(text_array[1][1])
   text(text_array[1][0], x, y);
   
   fill(text_array[2][1])
   text(text_array[2][0], x+1.2*textWidth(text_array[2][0]), y)
}