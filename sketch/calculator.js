class Calculator {
    constructor() {

    }

    calculate(exp) {       
        if(Number(exp[0])) {
            exp = "+" + exp;
        }
        let total = "0", symbol = null, steps = [];
        for(let i=0;i<exp.length;i++) {
            if(Number(exp[i])) {
                let currentNo = exp[i]
                while(Number(exp[i+1])) {
                    currentNo = exp[i] + exp[i+1]
                    i++;
                }
                total = eval(total+symbol+currentNo)
                steps.push(total)
            } else {
                symbol = exp[i]
            }
        }
        return steps
    }
}