/* 
2.  Suapvalinimas 
Paprašykite vartotojo įvesti skaičių, kuris turėtų kelis skaičius po kablelio. Konsolėje išspausdinkite: 
* Suapvalintą skaičių 
* Suapvalintą žemyn skaičių 
* Suapvalintą aukštyn skaičių  
*/

"use strict";

const fltNum = +prompt(
  "Įveskite skaičių, kuris turi kelis skaičius po kablelio.",
);

const strResult = `
Įvestas skaičius: ${fltNum}
        Suapvalintas skaičius: ${Math.round(fltNum)}
  Suapvalintas žemyn skaičius: ${Math.floor(fltNum)} 
Suapvalintas aukštyn skaičius: ${Math.ceil(fltNum)}  
`;

console.log(strResult);
