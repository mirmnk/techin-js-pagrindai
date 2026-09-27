"use strict";

/* 
1. Parašykite programą, kuri padėtų Petriukui suskaičiuoti, kiek pamokų jis turi per savaitę ir kiek tai sudarys minučių. Klaviatūra įvedami 5 skaičiai, reiškiantys kiekvienos dienos pamokų skaičių.
 */

let intPamokuSkaicius = 0;
const intPAMOKOJE_MINUCIU = 45;

const arrSavaitesDienos = [
  "pirmadienį",
  "antradienį",
  "trečiadinį",
  "ketvirtadienį",
  "penktadienį",
];

for (let i = 0; i < 5; i++)
  intPamokuSkaicius += +prompt(`Kiek pamokų yra ${arrSavaitesDienos[i]}?`);

alert(`Pamokų skaičius: ${intPamokuSkaicius}`);
alert(`Tai sudaro minučių: ${intPamokuSkaicius * intPAMOKOJE_MINUCIU}`);
