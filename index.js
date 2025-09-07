const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

let firstValue = '';
let operator = '';
let waitingForSecondValue = false;

keys.addEventListener('click', event => {
  if (!event.target.matches('button')) return; // Only run if a button is clicked

  const button = event.target;
  const action = button.dataset.action;
  const buttonContent = button.textContent;
  const displayValue = display.textContent;

  // 1️⃣ If number is pressed
  if (!action) {
    if (displayValue === '0' || waitingForSecondValue) {
      display.textContent = buttonContent;
      waitingForSecondValue = false;
    } else {
      display.textContent = displayValue + buttonContent;
    }
  }

  // 2️⃣ If decimal is pressed
  if (action === 'decimal') {
    if (!displayValue.includes('.')) {
      display.textContent = displayValue + '.';
    }
  }

  // 3️⃣ If clear is pressed
  if (action === 'clear') {
    display.textContent = '0';
    firstValue = '';
    operator = '';
    waitingForSecondValue = false;
  }

  // 4️⃣ If operator is pressed
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) {
    firstValue = displayValue;
    operator = action;
    waitingForSecondValue = true;
  }

  // 5️⃣ If equals is pressed
  if (action === 'calculate') {
    if (firstValue && operator) {
      const secondValue = displayValue;
      display.textContent = calculate(firstValue, operator, secondValue);
      firstValue = '';
      operator = '';
    }
  }
});

// Calculation function
function calculate(first, operator, second) {
  const a = parseFloat(first);
  const b = parseFloat(second);

  if (operator === 'add') return a + b;
  if (operator === 'subtract') return a - b;
  if (operator === 'multiply') return a * b;
  if (operator === 'divide') return a / b;
}
