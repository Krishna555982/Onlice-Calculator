let runningTotal = 0;
let buffer = "0";
let previousOperator;
let memory = 0; // Added memory storage

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
        case 'c': // Added keyboard support for 'C'
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
        case 'Enter': // Added Enter key support
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        case '←':
        case 'Backspace': // Added Backspace key support
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, buffer.length - 1);
            }
            break;
        case '√': // Square Root Function
            buffer = Math.sqrt(parseFloat(buffer)).toString();
            break;
        case '%': // Percentage Function
            buffer = (parseFloat(buffer) / 100).toString();
            break;
        case 'M+':
            memory += parseInt(buffer) || 0;
            break;
        case 'M-':
            memory -= parseInt(buffer) || 0;
            break;
        case 'MR':
            buffer = memory.toString();
            break;
        case 'MC':
            memory = 0;
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        if (intBuffer === 0) {
            buffer = "Error"; // Prevents division by zero
            runningTotal = 0;
            return;
        }
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        if (!event.target.classList.contains('calc-button')) return; // Ensures only buttons are processed
        buttonClick(event.target.innerText);
    });

    // Keyboard support
    document.addEventListener('keydown', function (event) {
        const keyMap = {
            '/': '÷',
            '*': '×',
            '-': '-',
            '+': '+',
            'Enter': '=',
            'Backspace': '←',
            'c': 'C',
            'C': 'C',
            'r': '√',
            'R': '√',// Square Root with 'r'
            '%': '%'
        };
        const key = keyMap[event.key] || event.key;
        buttonClick(key);
    });
}

init();
