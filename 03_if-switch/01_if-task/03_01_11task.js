/*
03-11. Spynos kombinacija
Paprašykite vartotojo įvesti 4 skaičius. Kombinacija teisinga, jeigu:
  - pirmas skaičius yra 3, 5 arba 7
  - antras skaičius yra 2
  - trečias skaičius yra tarp 5 ir 100 (imtinai)
  - ketvirtas skaičius yra mažesnis nei 9 ARBA didesnis nei 20
Jei viskas teisinga - išvesk „correct“, kitu atveju - „incorrect“.
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
