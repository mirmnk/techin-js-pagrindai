/*
03-06. Ar vienas skaičius yra kito kartotinis
Paprašykite vartotojo įvesti du skaičius n ir d.
  - Jei d lygus 0 → išveskite "Division by zero is not allowed!!!"
  - Jei n dalinasi iš d be liekanos → true
  - Kitu atveju → false
Rezultatą išveskite į konsolę.
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

// Real numbers
const number1 = getNumber("Įveskite pirmą skaičių.");
const number2 = getNumber("Įveskite antrą skaičių.");

if (number2 === 0) {
  alert("Division by zero is not allowed!!!");
} else if (number1 % number2) {
  alert(false);
} else {
  alert(true);
}
