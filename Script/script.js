class Calculator {
    
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear = () => {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }

    delete = () => {

    }

    appendNumber = (number) => {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation = (operation) => {

    }

    compute = () => {

    }

    updateDisplay = () => {
        this.currentOperandTextElement.innerText = this.currentOperand; //Updates display everytime a button is pressed
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const allClearButton = document.querySelector('[data-all-clear]');

const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

document.documentElement.addEventListener('keydown', (event) => {
    if ((event.key >= 0 && event.key <= 9) ) {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
});

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});


