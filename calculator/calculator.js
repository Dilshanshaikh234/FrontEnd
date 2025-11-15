// calculator.js
let screen = document.getElementById('screen');
let currentInput = '';

function appendToScreen(value) {
    if (currentInput === 'Error') {
        clearScreen();
    }
    currentInput += value;
    screen.value = currentInput;
}

function clearScreen() {
    currentInput = '';
    screen.value = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    screen.value = currentInput;
}

function calculate() {
    try {
        // Replace × with * for eval
        let expression = currentInput.replace(/×/g, '*');
        
        // Prevent eval on empty or invalid input
        if (!expression || !isValidExpression(expression)) {
            screen.value = 'Error';
            currentInput = 'Error';
            return;
        }
        
        let result = eval(expression);
        
        // Handle division by zero
        if (!isFinite(result)) {
            screen.value = 'Error';
            currentInput = 'Error';
            return;
        }
        
        // Round to reasonable precision
        screen.value = Math.round(result * 100000) / 100000;
        currentInput = screen.value.toString();
    } catch (error) {
        screen.value = 'Error';
        currentInput = 'Error';
    }
}

function isValidExpression(expr) {
    // Basic validation: no letters, ensure operators are surrounded by numbers where possible
    const validChars = /[0-9+\-*/.]/;
    return expr.split('').every(char => validChars.test(char) || char === ' ');
}
