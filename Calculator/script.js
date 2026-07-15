// Get the display element
const display = document.getElementById('display');

// Initialize display value
let currentValue = '';
let operator = null;
let previousValue = '';
let shouldResetDisplay = false;

// Append number to display
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0') {
            currentValue = num;
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

// Append decimal point
function appendDecimal() {
    if (shouldResetDisplay) {
        currentValue = '0.';
        shouldResetDisplay = false;
    } else if (!currentValue.includes('.')) {
        if (currentValue === '') {
            currentValue = '0.';
        } else {
            currentValue += '.';
        }
    }
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    if (currentValue === '' && previousValue === '') {
        return;
    }
    
    if (operator !== null && currentValue !== '' && previousValue !== '') {
        calculateResult();
    }
    
    previousValue = currentValue;
    operator = op;
    currentValue = '';
    shouldResetDisplay = false;
    updateDisplay();
}

// Calculate result
function calculateResult() {
    if (operator === null || currentValue === '' || previousValue === '') {
        return;
    }
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentValue = result.toString();
    operator = null;
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Clear display
function clearDisplay() {
    currentValue = '';
    operator = null;
    previousValue = '';
    shouldResetDisplay = false;
    updateDisplay();
}

// Delete last character
function deleteLastChar() {
    if (currentValue !== '') {
        currentValue = currentValue.slice(0, -1);
    }
    updateDisplay();
}

// Update display
function updateDisplay() {
    display.value = currentValue || '0';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+' || key === '-') {
        appendOperator(key);
    } else if (key === '*') {
        e.preventDefault();
        appendOperator('*');
    } else if (key === '/') {
        e.preventDefault();
        appendOperator('/');
    } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLastChar();
    } else if (key.toLowerCase() === 'c') {
        clearDisplay();
    }
});

// Initialize display
updateDisplay();