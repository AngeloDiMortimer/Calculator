const calKeys = document.querySelector('.all-buttons');
const previousOp = document.querySelector('#previous-operand');
const currentOp = document.querySelector('#current-operand');
const calculator = document.querySelector('.calculator');
let displayValue = '';


calKeys.addEventListener('click', (e) => {
    if (!e.target.closest('button')) return; //checks if the buttons have been pressed and not the container

    const key = e.target; //the button pressed
	const keyValue = key.textContent; //the textContent inside the button pressed
	const { type } = key.dataset; //stores the dataset of the html attributes of the button pressed
	const { previousKeyType } = calculator.dataset; //stores the dataset of the calculator so it can see which number was pressed previously
    
    if (type === 'number') { //types the numbers on screen
        handleNumber(keyValue);
        previousOp.textContent = displayValue;
    }

    if (type === 'operator' && previousKeyType !== 'operator') { //types operators on screen
        handleoperator(key.value);
        previousOp.textContent = displayValue;
    }

    if (type === 'reset') { //resets all displayed numbers
        displayValue = '';
        currentOp.textContent = '\u00A0'; //nbsp; in HTML
        previousOp.textContent = '0';
    }

    if (type === 'backspace') { //deletes a single number or operator on screen each time is pressed
        let containerValue = displayValue.replace(/.$/, '');;
        displayValue = containerValue;
        if (displayValue === '') { //if there's nothing on screen it defaults to 0
            previousOp.textContent = '0';
        } else { //else it shows the current value 
            previousOp.textContent = displayValue;
        }
    }

    if (type === 'equal') { //performs the calculation
        const finalResult = handleCalculation(displayValue);
        currentOp.textContent = finalResult;
    }

    calculator.dataset.previousKeyType = type;
});

const handleNumber = (num) => {
    displayValue += num;
};

const handleoperator = (op) => {
    displayValue += op;
};


const calculation = (firstNumber, operator, secondNumber) => {

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if(operator === '+') return firstNumber + secondNumber;
    if(operator === '-') return firstNumber - secondNumber;
    if(operator === 'x') return firstNumber * secondNumber;
    if(operator === '/') return firstNumber / secondNumber;
    if(operator === '%') return firstNumber % secondNumber;
};

const handleCalculation = (displayValue) => {
    displayValue = displayValue.match(/[^\d()]+|[\d.]+/g); //splits the display value into an array separated by the operators

    const operators = ['/', 'x', '%', '+', '-'];
    let firstNumber;
    let secondNumber;
    let operator;
    let operatorIndex;
    let result;

    for (var i = 0; i < operators.length; i++) {
        while(displayValue.includes(operators[i])) {
            operatorIndex = displayValue.findIndex(item => item === operators[i]);
            firstNumber = displayValue[operatorIndex - 1];
            operator = displayValue[operatorIndex];
            console.log(operator);
            secondNumber = displayValue[operatorIndex + 1];
            result = calculation(firstNumber, operator, secondNumber);
            displayValue.splice(operatorIndex - 1, 3, result);
        }
    }
    console.log(result);
    return result;

}