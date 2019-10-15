function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let err = 0;
    for (let i = 0; i < expr.length; i++) {

        if (expr[i] === '(') {
            err++;
        }
        if (expr[i] === ')') {
            err--;
            
        }
    }
    if (err !== 0) {
        throw new Error("ExpressionError: Brackets must be paired");
    }


    expr = expr.replace(/ /g, '').match(/\d+|\D/g);

  

    //проверка на скобки 
    for (let i = 0; i < expr.length; i++) {
        let test = [];
        let backIndex;
        if (expr[i] === "(") {
            let index = expr.indexOf(expr[i]);
            let bigBrackets = expr.slice(index, expr.length);
        
            let counter = 0;
            for (let i = 0; i < bigBrackets.length; i++) {
                if (bigBrackets[i] === '(') {
                    counter++;
                }
                if (bigBrackets[i] === ')') {
                    counter--;
                    if (counter === 0) {
                        backIndex = i;

                        test = bigBrackets.slice(1, backIndex);
                        break
                    }
                }

            }

            expr.splice(index, backIndex + 1, expressionCalculator(test.join('')))
        }
    }
    return calc(expr)


    function calc(array) {
        for (let i = 0; i < array.length; i++) {
            //умножение
            if (array[i] === '*') {
                let result = +array[i - 1] * +array[i + 1];
                array.splice(array.indexOf(array[i]) - 1, 3, result);
                i--;
            }
            //деление
            if (array[i] === '/') {
                if (+array[i + 1] === 0) {
                    throw new Error("TypeError: Division by zero.")
                }
                let result = +array[i - 1] / +array[i + 1];
                array.splice(array.indexOf(array[i]) - 1, 3, result);
                i--;
            }
        }

        for (let i = 0; i < array.length; i++) {
            //сложение
            if (array[i] === '+') {
                let result = +array[i - 1] + +array[i + 1];
                array.splice(array.indexOf(array[i]) - 1, 3, result);
                i--;
            }
            //вычитание
            if (array[i] === '-') {
                let result = +array[i - 1] - +array[i + 1];
                array.splice(array.indexOf(array[i]) - 1, 3, result);
                i--;
            }
        }
        return array[0]
    }

}

module.exports = {
    expressionCalculator

}

//console.log(expressionCalculator("1 + 2) * 3"))