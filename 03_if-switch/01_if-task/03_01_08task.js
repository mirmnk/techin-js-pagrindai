/*
03-08. Ar galima sudaryti trikampį?
Paprašykite vartotojo įvesti tris skaičius - trikampio kraštines. Patikrinkite, ar iš jų galima sudaryti
trikampį. Taisyklė: dviejų kraštinių suma turi būti didesnė už trečią.
  - Jei trikampis galima - grąžinti true
  - Jei ne - false
*/

"use strict";

// Funkcija inputo is userio gavimui. Sveikems ir realems skaiciams. Su min galima apriboti apatine riba (neigiamas/teigiamas).
// Vartotojas gali iseiti is prompto tik suvedes tai ko prasoma.

const getNumber = (
  message,
  onlyInteger = false,
  min = -Infinity,
  max = Infinity,
) => {
  let strNumber;
  let number;

  do {
    strNumber = prompt(message);
    number = Number(strNumber);
  } while (
    strNumber === null || // user pressed Cancel
    strNumber.trim() === "" || // user pressed OK without input
    !(onlyInteger ? Number.isInteger : Number.isFinite)(number) || // number int or real. Excludes NaN or Infinity
    number < min ||
    number > max
  );

  return number;
};

// Real numbers no negatives, no zero, min value - smalest positive nonzero number
const number1 = getNumber("Įveskite pirmą skaičių.", false, Number.MIN_VALUE);
const number2 = getNumber("Įveskite antrą skaičių.", false, Number.MIN_VALUE);
const number3 = getNumber("Įveskite trečią skaičių.", false, Number.MIN_VALUE);

const isTriangle = (a, b, c) => {
  if (a + b > c && b + c > a && a + c > b) {
    return true;
  } else {
    return false;
  }
};

alert(isTriangle(number1, number2, number3));
