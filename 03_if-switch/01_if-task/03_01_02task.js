/*
03-02. Ar paveikslėlis yra „landscape“?
Paprašykite vartotojo įvesti plotį ir aukštį.
  - Jei plotis didesnis už aukštį – paveikslėlis yra „landscape“
  - Jei aukštis didesnis arba lygus pločiui – ne
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

const intPlotis = getNumber("Įveskite paveikslėlio plotį.", true, 1);
const intAukstis = getNumber("Įveskite paveikslėlio aukštį.", true, 1);

let strOutput = "Portrait";

if (intPlotis > intAukstis) {
  strOutput = "Landscape";
}

console.log("Paveikslėlis yra " + strOutput);
