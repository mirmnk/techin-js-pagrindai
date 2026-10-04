/*
03-09. Mėgstamo skaičiaus spėjimas
Paprašykite vartotojo įvesti du skaičius. Pirmas - mėgstamas skaičius. Antras - spėjimas. Jei spėjimas:
  - didesnis → išvesk „Too high“
  - mažesnis → „Too low“
  - lygus → „You got it!“
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
const intFavorite = getNumber("Įveskite mėgstamą skaičių.", true, 1);
const intGuess = getNumber("Atspėkite skaičių.", true, 1);

if (intGuess > intFavorite) {
  alert("Too high!");
} else if (intGuess < intFavorite) {
  alert("Too low!");
} else {
  alert("You got it!");
}
