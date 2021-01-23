class Calculator {
    calculate(exp) {      

        try {
            eval(exp)
        } catch(err) {
            console.log("Invalid expression")
            return;
        }
        
        if(Number(exp[0])) {
            exp = "+" + exp;
        }
        let total = "0", symbol = null, steps = [];
        for(let i=0;i<exp.length;i++) {
            if(Number(exp[i])) {
                let currentNo = exp[i]
                while(Number(exp[i+1]) || exp[i+1] === "0") {
                    currentNo = exp[i] + exp[i+1]
                    i++;
                }
                total = eval(total+symbol+currentNo)
                steps.push(total)
            } else {
                // takes care of 2 consecutive negatives
                if(exp[i]==="-" && exp[i+1]==="-") {
                    symbol = "+"
                    i=i+1
                    continue;
                }
                symbol = exp[i]
            }
        }
        return steps
    }
}