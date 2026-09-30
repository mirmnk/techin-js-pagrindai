/*
7.  Kaina po nuolaidos 
Paprašykite vartotojo įvesti kainą ir nuolaidos procentą. Apskaičiuokite galutinę kainą, suapvalintą iki 2 skaičių 
po kablelio. Rezultatą išveskite į konsolę.
*/

"use strict";

// for runing in brower
const fltKaina = +prompt("Įveskite kainą.");
let intProcentas = 0;

do {
  intProcentas = +prompt("Įveskite nuolaidos procentą.");
} while (
  intProcentas < 0 ||
  intProcentas > 100 ||
  !Number.isInteger(intProcentas)
);

const fltSuNuolaida = fltKaina * (1 - intProcentas / 100);

const strResult = `
    Pradinė kaina: ${fltKaina}
         Nuolaida: ${intProcentas}%
Kaina su nuolaida: ${fltSuNuolaida.toFixed(2)}
        Sutaupėte: ${(fltKaina - fltSuNuolaida).toFixed(2)}
`;

console.log(strResult);
