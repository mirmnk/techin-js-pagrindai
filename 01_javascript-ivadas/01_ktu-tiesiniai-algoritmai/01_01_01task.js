"use strict";

/* 1. Pamoka. Parašykite programą, kuri padéty Petriukui suskaičiuoti, kiek pamoku jis turi per savaitę ir kiek tai sudarys minučiy. Klaviatüra jvedami 5 skaičiai, reiškiantys kiekvienos dienos pamoku skaičų.
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
