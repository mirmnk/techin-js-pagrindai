/*
4.  Skaičiai po kablelio 
Duotas skaičius 2,100212. Paprašykite vartotojo įvesti, kiek skaičių po kablelio reikia palikti. Išveskite į 
konsolę tokiu būdų suformatuotą skaičių.
*/

"use strict";
const fltNum = 2.100212;

let intDecimal = 0;
do {
  intDecimal = +prompt("Kiek skaičių po kablelio palikti? (0-6)");
} while (intDecimal > 6 || intDecimal < 0);

console.log(Number(fltNum).toFixed(intDecimal));
