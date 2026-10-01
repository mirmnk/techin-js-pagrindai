/*
1. Even or Odd
Write a program that checks if a number is even or odd using a ternary operator.
*/

"use strict";

function task01() {
  let strNumber;
  let intNumber;

  do {
    strNumber = prompt("Įveskite skaičių.");
    intNumber = Number(strNumber);
  } while (
    strNumber === null || // user pressed Cancel
    strNumber.trim() === "" || // user pressed OK without input
    !Number.isInteger(intNumber) // is number an integer, not float, NaN or Infinity
  );
}
