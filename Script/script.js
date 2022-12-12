const calKeys = document.querySelector('.all-buttons');
const previousOp = document.querySelector('#previous-operand');
const currentOp = document.querySelector('#current-operand');
const calculator = document.querySelector('.calculator');
let currentValue = '';


calKeys.addEventListener('click', (e) => {
    if (!e.target.closest('button')) return; //checks if the buttons have been pressed and not the container

    const key = e.target; //the button pressed
	const keyValue = key.textContent; //the textContent inside the button pressed
	const { type } = key.dataset; //stores the dataset of the html attributes of the button pressed
	const { previousKeyType } = calculator.dataset; //stores the dataset of the calculator so it can see which number was pressed previously
    
    if (type === 'number') { //types the numbers on screen
        handleNumber(keyValue);
        previousOp.textContent = currentValue;
    }

    if (type === 'operator' && previousKeyType !== 'operator') {
        handleoperator(keyValue);
        previousOp.textContent = currentValue;
    }

    calculator.dataset.previousKeyType = type;
});

const handleNumber = (num) => {
    currentValue += num;
};

const handleoperator = (op) => {
    currentValue += op;
};