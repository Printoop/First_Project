const display = document.getElementById("display");

let current = "0";        // what's on screen
let previous = null;      // first number
let operator = null;      // +, -, *, /
let justCalculated = false;

function updateDisplay() {
  display.textContent = current;
}

function inputNumber(n) {
  if (current === "Error" || justCalculated) {
    current = "0";
    justCalculated = false;
  }
  if (n === "." && current.includes(".")) return; // only one decimal point
  current = (current === "0" && n !== ".") ? n : current + n;
}

function chooseOperator(op) {
  if (current === "Error") return;
  previous = parseFloat(current);
  operator = op;
  current = "0";
  justCalculated = false;
}

function calculate() {
  if (operator === null) return;
  const a = previous;
  const b = parseFloat(current);
  let result;

  if (operator === "+") result = a + b;
  if (operator === "-") result = a - b;
  if (operator === "*") result = a * b;
  if (operator === "/") result = b === 0 ? "Error" : a / b;

  current = result === "Error" ? "Error" : String(Math.round(result * 1e10) / 1e10);
  operator = null;
  previous = null;
  justCalculated = true;
}

function clearAll() {
  current = "0";
  previous = null;
  operator = null;
  justCalculated = false;
}

function backspace() {
  if (current === "Error" || justCalculated) return;
  current = current.length > 1 ? current.slice(0, -1) : "0";
}

function percent() {
  if (current === "Error") return;
  current = String(parseFloat(current) / 100);
}

// One listener handles every button click
document.querySelector(".buttons").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === "number") inputNumber(value);
  if (action === "operator") chooseOperator(value);
  if (action === "equals") calculate();
  if (action === "clear") clearAll();
if (action === "backspace") backspace();
if (action === "percent") percent();

  updateDisplay();
});