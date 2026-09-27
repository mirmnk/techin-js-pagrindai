/* 
6. Trapecijos plotas. Parašykite programą, kuri, įvedus trapecijos pagrindų a ir b bei aukštinės h ilgius, apskaičiuotų trapecijos plotą. 
*/

// S = (a+b)/2*h;
// Presuming all posible inputs are integers

"use strict";

// Random int 1 to 100
const getRandomInt = () => Math.floor(Math.random() * 100) + 1;

const inBROWSER = typeof window !== "undefined";

const printResult = (strText) => (inBROWSER ? alert : console.log)(strText);
const getTrapecijosPlotas = (a, b, h) => ((a + b) / 2) * h;

const intTrapecijosPagrindasA = inBROWSER
  ? +prompt("Įveskite trapecijos trumpesniojo pagrindo ilgį (a): ")
  : getRandomInt();
const intTrapecijosPagrindasB = inBROWSER
  ? +prompt("Įveskite trapecijos ilgesniojo pagrindo ilgį (b): ")
  : getRandomInt();
const intTrapecijosAukstine = inBROWSER
  ? +prompt("Įveskite trapecijos aukštinės ilgį: ")
  : getRandomInt();

const strResult = `
    Trapecijos ilgesniojo pagrindo ilgis: ${intTrapecijosPagrindasB}
    Trapecijos trumpesniojo pagrindo ilgis: ${intTrapecijosPagrindasA}
    Trapecijos aukštinės ilgis: ${intTrapecijosAukstine}
    -----------------------------------------
    Trapecijos plotas: ${getTrapecijosPlotas(intTrapecijosPagrindasA, intTrapecijosPagrindasB, intTrapecijosAukstine)}
`;

printResult(strResult);
