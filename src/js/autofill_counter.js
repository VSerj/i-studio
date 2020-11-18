'use strict';

export function runCounter(counterOfNumber, delayMs = 80) {
  if (!counterOfNumber) return;

  const finishValue = +counterOfNumber.textContent;
  let currentValue = 0;

  printNumber();

  function printNumber() {
    counterOfNumber.textContent = `${currentValue}`;
    currentValue++;

    if (currentValue > finishValue) return;

    setTimeout(printNumber, delayMs);
  }
}
