const buttonsCalc = document.querySelector('.all-buttons');
const userInput = document.querySelector('#user-input');
const calculator = document.querySelector('.calculator');
const result = document.querySelector('#result');
let isEqualsPressed = false;
let equation = 0; //separate variable to calculate equation in the backend
let checkForDecimal = ''; //to store each number and check if decimal is pressed

buttonsCalc.addEventListener('click', (event) => {

    if(!event.target.closest('button')) return; //checks if the buttons have been pressed and not the container

    const key = event.target; //a button
    const keyValue = key.textContent; //the text containing said element (I.E: the number 1 button should just return 1 in this case)
    let inputDisplay = userInput.textContent; //the display screen of the calculator

    const {currentKey} = key.dataset;
    const {previousKey} = calculator.dataset; //dataset is used to access the HTML data attributes

    //if a number button has been pressed
    if(currentKey === 'number' && !isEqualsPressed) {
        /* 
            1. The default screen display is 0
            2. Replace the default display with user input if a number is pressed
            3. Else concat with an operator
            4. if the screen display is anything other than number concat the display
        */


        if (inputDisplay === '0') {
            userInput.textContent = (previousKey === 'operator') ? inputDisplay + keyValue : keyValue; 
            equation = (previousKey === 'operator') ? equation + key.value : key.value;
            checkForDecimal = checkForDecimal + keyValue;
        } else {
            //Check for length so that the numbers stay within the display box
            //else replace it with exponential
            if(checkForDecimal.length >= 19) {
                var replaceNumber = checkForDecimal;
                checkForDecimal = Number(checkForDecimal). toExponential(2);
                userInput.textContent = inputDisplay.replace(replaceNumber, checkForDecimal);
            }
        }
    }

});