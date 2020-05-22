/*
console.log("Hello World with JavaScript");

const firstName = prompt("Siapa nama depanmu?");
const lastName = prompt("Siapa nama belakangmu?");
const language = prompt("Bisa berbahasa apa?");

const user = {
    name: {
        first: firstName,
        last: lastName,
    },
    language: language
};

if (user.language === "English") {
    alert("Nice to meet you " + user.name.first + " " + user.name.last + "!");
} else if (user.language === "French") {
    alert("Ravi de vous rencontrer " + user.name.first + " " + user.name.last + "!");
} else if (user.language === "Japanese") {
    alert("Hajimemashite " + user.name.first + " " + user.name.last + "!");
} else {
    alert("Senang bertemu dengan Anda " + user.name.first + " " + user.name.last + "!");
}
*/

const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    } else {
        if (calculator.displayNumber === '0') {
            calculator.displayNumber = digit;
        } else {
            calculator.displayNumber += digit;
        }
    }
}

function inverseNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber *= -1;
}

function handleOperator(operator) {
    if(!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert('Operator sudah diterapkan');
    }
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    calculator.displayNumber = result;
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;

        if(target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
        
        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}