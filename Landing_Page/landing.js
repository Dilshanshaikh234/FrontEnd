// landing.js
// Calculator Functionality (from previous)
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
        let expression = currentInput.replace(/×/g, '*');
        
        if (!expression || !isValidExpression(expression)) {
            screen.value = 'Error';
            currentInput = 'Error';
            return;
        }
        
        let result = eval(expression);
        
        if (!isFinite(result)) {
            screen.value = 'Error';
            currentInput = 'Error';
            return;
        }
        
        screen.value = Math.round(result * 100000) / 100000;
        currentInput = screen.value.toString();
    } catch (error) {
        screen.value = 'Error';
        currentInput = 'Error';
    }
}

function isValidExpression(expr) {
    const validChars = /[0-9+\-*/.]/;
    return expr.split('').every(char => validChars.test(char) || char === ' ');
}

// Additional Landing Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for nav links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add click sound effect (optional, requires audio file)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
});
