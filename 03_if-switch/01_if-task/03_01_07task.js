/*
03-07. Trijų skaičių rikiavimas mažėjimo tvarka
Paprašykite vartotojo įvesti tris skaičius. Naudojant if sąlygas, surikiuokite juos nuo didžiausio iki
mažiausio. Rezultatą parodykite su alert.
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
let number1 = getNumber("Įveskite pirmą skaičių.");
let number2 = getNumber("Įveskite antrą skaičių.");
let number3 = getNumber("Įveskite trečią skaičių.");

// buble sort with ifs 

if (number1 < number2) {
  [number1, number2] = [number2, number1];
}
if (number2 < number3) {
  [number2, number3] = [number3, number2];
}

if (number1 < number2) {
  [number1, number2] = [number2, number1];
}

alert([number1, number2, number3].join(", "));
