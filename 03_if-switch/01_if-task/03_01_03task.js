/*
03-03. Dviejų skaičių palyginimas
Paprašykite vartotojo įvesti du sveikus skaičius. Ir išveskite didesnį į konsolę.
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

const number1 = getNumber("Įveskite pirmą sveiką skaičių.", true);
const number2 = getNumber("Įveskite antrą sveiką skaičių.", true);

if (number1 > number2) {
  console.log(number1);
} else {
  console.log(number2);
}
