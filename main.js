let input = document.getElementById('input');
let buttons = document.querySelectorAll('button');

let string = "";
let evaluated = false; // Track whether the expression has been evaluated
let arr = Array.from(buttons);

// Function to handle input (button click or keyboard)
function handleInput(value) {
    let displayText = value; // What to display in the input field

    if (value == 'X') {
        value = '*'; // Use '*' for calculation
    } else if (value == '•' || value == '.') {
        value = '.'; // Use '.' for calculation
    }

    if (value == '=') {
        // Check if the input is empty or only contains operators
        if (string.trim() === "" || /^[+\-*/%]+$/.test(string)) {
            input.value = "Error!"; // error message
            string = "";
        } else {
            // Replace percentage part of the string
            if (string.includes('%')) {
                string = string.replace(/(\d+)%/g, (match, number) => {
                    return number / 100;
                });
            }
            try {
                string = eval(string);
                input.value = string;
                evaluated = true; // Set to true after evaluation
            } catch (error) {
                input.value = "Error!";//error message
                string = "";
            }
        }
    } else if (value == 'Ac' || value.toLowerCase() == 'c') {
        string = "";
        input.value = string;
        evaluated = false; // Reset evaluation status
    } else if (value == 'DEL' || value == 'Backspace') {
        if (evaluated) {
            string = ""; // Clear the input if the expression was evaluated
            input.value = string;
            evaluated = false; // Reset evaluation status
        } else {
            if (string.length == 1) {
                string = "";
                input.value = string;
            } else {
                string = string.substring(0, string.length - 1);
                input.value = string;
            }
        }
    } else {
        if (evaluated) {
            if (['+', '-', '*', '/'].includes(value)) {
                // If evaluated and operator is pressed, continue calculation with current result
                string += value;
            } else {
                // If a number is pressed after evaluation, start a new calculation
                string = value;
            }
            evaluated = false; // Reset evaluation status
        } else {
            // Replace the last operator if a new operator is entered right after another operator
            if (['+', '-', '*', '/'].includes(value) && ['+', '-', '*', '/'].includes(string.slice(-1))) {
                string = string.slice(0, -1) + value;
            } else {
                string += value;
            }
        }
        input.value = string.replace(/\*/g, 'X'); // Replace '*' with 'X' for display
    }
}

// Handle button clicks
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.', 'Enter', '=', 'Backspace', 'c', 'C'];
    
    if (allowedKeys.includes(e.key)) {
        e.preventDefault(); // Prevent default behavior for Enter key

        if (e.key === 'Enter') {
            handleInput('=');
        } else if (e.key === 'Backspace') {
            handleInput('DEL');
        } else {
            handleInput(e.key);
        }
    }
});

// Get year for copyright
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
