/*
03-04. Trijų skaičių sandaugos ženklas
Paprašykite vartotojo įvesti tris skaičius. Nustatykite, koks yra jų sandaugos ženklas.
  - Jei teigiamas, tuomet „+“
  - Jei neigiamas, tuomet „-“
Rezultatą parodyk su alert.
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

// Real numbers
const number1 = getNumber("Įveskite pirmą skaičių.");
const number2 = getNumber("Įveskite antrą skaičių.");
const number3 = getNumber("Įveskite trečią skaičių.");

if (number1 * number2 * number3 < 0) {
  alert("-");
} else {
  alert("+");
}
