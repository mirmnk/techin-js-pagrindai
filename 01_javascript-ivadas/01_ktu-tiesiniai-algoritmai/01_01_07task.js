/* 
Puodelių pakavimas. Į vieną kartoninę dėžutę telpa trys puodeliai. Pakuotojas užklijuoja dėžutę ir išsiunčia ją į parduotuvę, jei ji pilna. Iš viso reikia supakuoti m puodelių. Parašykite programą, kuri apskaičiuotų, kelios bus pilnos dėžutės ir kiek puodelių liks nesupakuota. 
*/

"use strict";

const inBROWSER = typeof window !== "undefined";

const printResult = (strText) => (inBROWSER ? alert : console.log)(strText);
// Random int 1 to 100
const getRandomInt = () => Math.floor(Math.random() * 100) + 1;

const getFromPromptOrRandom = () =>
  inBROWSER ? +prompt('Kiek pupdelių reikia supakuti?"') : getRandomInt();

const intPuodeliai = getFromPromptOrRandom();

const intDeziu = Number.parseInt(intPuodeliai / 3);
const intLikoNesupakuotu = intPuodeliai % 3;

const strResult = `
Puodelių, kuriuos reikia supakuoti, skaičius: ${intPuodeliai}
                      Pilnų dėžučių skaičius: ${intDeziu}
               Nesupakuotų puodelių skaičius: ${intLikoNesupakuotu}
`;

printResult(strResult);
