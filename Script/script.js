const calKeys = document.querySelector('.all-buttons');
const inputScreen = document.querySelector('#previous-operand');
const resultScreen = document.querySelector('#current-operand');
const calculator = document.querySelector('.calculator');
let displayValue = '';
let isEqualsPressed = false;


calKeys.addEventListener('click', (e) => {
    if (!e.target.closest('button')) return; //checks if the buttons have been pressed and not the container

    const key = e.target; //the button pressed
	const keyValue = key.textContent; //the textContent inside the button pressed
	const { type } = key.dataset; //stores the dataset of the html attributes of the button pressed
	const { previousKeyType } = calculator.dataset; //stores the dataset of the calculator so it can see which number was pressed previously
    
    if (type === 'number' && !isEqualsPressed) { //types the numbers on screen
        handleNumber(keyValue);
        inputScreen.textContent = displayValue;
    }

    if (type === 'operator' && previousKeyType !== 'operator' && !isEqualsPressed) { //types operators on screen
        handleoperator(key.value);
        inputScreen.textContent = displayValue;
    }

    if(type === 'decimal' && (previousKeyType === 'number' || displayValue === '') && !isEqualsPressed) {
        addDecimal();
        inputScreen.textContent = displayValue;
    }

    if (type === 'reset') { //resets all displayed numbers
        deleteData();
    }

    if (type === 'backspace') { //deletes a single number or operator on screen each time is pressed
        if (isEqualsPressed === true) {
            deleteData();
        } else {
            let containerValue = displayValue.replace(/.$/, '');;
            displayValue = containerValue;
            if (displayValue === '') { //if there's nothing on screen it defaults to 0
                inputScreen.textContent = '0';
            } else { //else it shows the current value 
                inputScreen.textContent = displayValue;
            }
        }
    }

    if (type === 'equal') { //performs the calculation
        isEqualsPressed = true;
        const finalResult = handleCalculation(displayValue);
        if (finalResult || finalResult === 0) {
            resultScreen.textContent = (!Number.isInteger(finalResult)) ? finalResult.toFixed(2) : 
            (finalResult.toString().length >= 10) ? finalResult.toExponential(2) : finalResult;
        } else {
            resultScreen.textContent = 'Math Error';
        }

    }

    calculator.dataset.previousKeyType = type;
});

const handleNumber = (num) => {
    displayValue += num;
};

const handleoperator = (op) => {
    displayValue += op;
};

const addDecimal = () => {
    if(displayValue === '') { 
        displayValue += '0';
        displayValue += '.';
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
};

const deleteData = () => {
    displayValue = '';
    resultScreen.textContent = '\u00A0'; //nbsp; in HTML
    inputScreen.textContent = '0';
    isEqualsPressed = false;
};



const calculation = (firstNumber, operator, secondNumber) => {

    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    if(operator === '+') return firstNumber + secondNumber;
    if(operator === '-') return firstNumber - secondNumber;
    if(operator === 'x') return firstNumber * secondNumber;
   
    if(operator === '/') {
        if(secondNumber === '0') {
            alert('It is not possible to divide by 0');
            return;
        }
        firstNumber / secondNumber;
    };
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
            secondNumber = displayValue[operatorIndex + 1];
            result = calculation(firstNumber, operator, secondNumber);
            displayValue.splice(operatorIndex - 1, 3, result);
        }
    }
    return result;

};