/*
03-05. Amstrong skaičius (3 skaitmenys)
Paprašykite vartotojo įvesti 3 skaitmenų skaičių.
Amstrong skaičius yra tuomet, kai jo skaitmenų kubų suma yra lygi pačiam skaičiui.
Jei skaičius Amstrong - išveskite true, jei ne - false.
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

const getKubuSuma = (num) => {
  let intSum = 0;
  for (const digit of String(num)) {
    intSum += Number(digit) ** 3;
  }
  return intSum;
};

// Naturalus tryju skaitmenu nuo 100 iki 999.
const number1 = getNumber(
  "Įveskite tryjų skaitmėnų naturalų skaičių.",
  true,
  100,
  999,
);

let isArmstrong = false;
const intKubuSuma = getKubuSuma(number1);

if (number1 == intKubuSuma) {
  isArmstrong = true;
}

alert(isArmstrong);
