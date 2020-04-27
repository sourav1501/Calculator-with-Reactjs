export function evaluate(arrFormula) {
    const arrPostfix = infix2Postfix(arrFormula);
    return evaluatePostfix(arrPostfix);
  }
  
  export function isNotNumber(input) {
    return input === '(' || input === ')' || input === '+' || input === '-' || input === '*' || input === '/' || input === '%';
  }
  
  export function isNumber(input) {
    return !isNotNumber(input);
  }
  
  export function isOperator(input) {
    return input === '+' || input === '-' || input === '*' || input === '/' || input === '%';
  }
  
  export function getPriority(input) {
    if (input === '+' || input === '-') return 1;
    else if (input === '*' || input === '/' || input === '%') return 2;
    return 0;
  }
  
  export function infix2Postfix(arrFormula) {
    let result = [], stack = [];
  
    arrFormula.forEach(item => {
      if (isNumber(item)) {
        result.push(item);
      } else if (item === '(') {
        stack.push(item);
      } else if (item === ')') {
        while (stack.length > 0) {
          const pulledItem = stack.pop();
  
          if (pulledItem === '(') break;
          else result.push(pulledItem);
        }
      } else if (isOperator(item)) {
        while (stack.length > 0) {
          const peekedItem = stack[stack.length - 1];
  
          if (isOperator(peekedItem) && getPriority(peekedItem) >= getPriority(item)) {
            result.push(peekedItem);
            stack.pop();
          } else break;
        }
  
        stack.push(item);
      } else {
        console.log("Something else!!!");
      }
    });
  
    while (stack.length > 0) {
      result.push(stack.pop());
    }
  
    return result;
  }
  

  
  export function evaluatePostfix(arrPostfix) {
    let stack = [];
  
    arrPostfix.forEach(item => {
      if (isNumber(item)) {
        stack.push(item);
      } else if (isOperator(item)) {
        const num1 = Number.parseFloat(stack.pop()), num2 = Number.parseFloat(stack.pop());
        let result = '';
  
        switch (item) {
          case '+':
            result = num2 + num1;
            break;
          case '-':
            result = num2 - num1;
            break;
          case '*':
            result = num2 * num1;
            break;
          case '/':
            result = num2 / num1;
            break;
          case '%':
            result = num2 % num1;
            break;
          default:
            console.log('Something else!!!');
        }
  
        stack.push(result + '');
      } else {
        console.log("Something else!!!");
      }
    });
  
    return Number.parseFloat(stack[0]);
  }