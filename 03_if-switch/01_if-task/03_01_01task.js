/*
03-01. Teigiamas skaičius
Paprašykite vartotojo įvesti skaičių ir patikrinkite, ar skaičius yra didesnis už 0:
  - Jei skaičius teigiamas - išveskite true
  - Jei neigiamas - false
Rezultatą išveskite į konsolę.
*/

"use strict";

// Funkcija inputo is userio gavimui. Sveikems ir realems skaiciams. Su min galima apriboti apatine riba (neigiamas/teigiamas).
// Vartotojas gali iseiti is pompt tik suvedes tai ko prasoma.

const getNumber = (message, onlyInteger = false, min = -Infinity) => {
  let strNumber;
  let number;

  do {
    strNumber = prompt(message);
    number = Number(strNumber);
  } while (
    strNumber === null || // user pressed Cancel
    strNumber.trim() === "" || // user pressed OK without input
    !(onlyInteger ? Number.isInteger : Number.isFinite)(number) || // number int or real. Excludes NaN or Infinity
    number < min
  );

  return number;
};

const skaicius = getNumber("Įveskite skaičių.");
let isPositive = false;
if (skaicius > 0) isPositive = true;

console.log(isPositive);
