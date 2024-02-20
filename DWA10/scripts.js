const VALUE_CHANGE = 1;
const RESET_VALUE = 0;

const number = document.querySelector('[data-key="number"]');
const subtract = document.querySelector('[data-key="subtract"]');
const add = document.querySelector('[data-key="add"]');
const reset = document.querySelector('[data-key="reset"]');
const alert = document.querySelector('[data-key="alert"]');

const subtractHandler = () => {
  const newValue = parseInt(number.value) - VALUE_CHANGE;
  number.value = newValue;
};

const addHandler = () => {
  const newValue = parseInt(number.value) + VALUE_CHANGE;
  number.value = newValue;
};

const resetHandler = () => {
  const newValue = 0;
  number.value = newValue;
  alertHandler();
};

const alertHandler = () => {
  alert.open = true;
  setTimeout(() => {
    alert.open = false;
  }, 3000);
};

subtract.addEventListener("click", subtractHandler);
add.addEventListener("click", addHandler);
reset.addEventListener("click", resetHandler);
alert.addEventListener("sl-after-show", alertHandler);
