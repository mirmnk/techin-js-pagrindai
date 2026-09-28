/*
 3.  Atsitiktinis skaičius 
Išveskite į konsolę sugeneruotus tris atsitiktinai sugeneruotus skaičius: 
* Skaičių nuo 0 iki 1 
* Skaičių nuo 0 iki 100 
* Skaičių nuo 5 iki 20  
*/

"use strict";

const getRandomInt = (from, to) =>
  Math.floor(Math.random() * (to - from + 1)) + from;

const strResult = `
Skaičių nuo 0 iki 1 : ${Math.random()}
Skaičių nuo 0 iki 100 : ${getRandomInt(0, 100)}
Skaičių nuo 5 iki 20 : ${getRandomInt(5, 20)}
`;

console.log(strResult);
