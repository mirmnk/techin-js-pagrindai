/* 
02-01.  Paprašykite vartotojo įvesti tris skaičius. Išveskite į konsolę didžiausią ir mažiausią skaičius.   
*/

"use strict";

const inBROWSER = typeof window !== "undefined";

const printResult = (strText) => (inBROWSER ? alert : console.log)(strText);

const getRandomInt = (from = -100, to = 100) =>
  Math.floor(Math.random() * (to - from + 1)) + from;

const getFromPromptOrRandom = (strPromptMsg, rndFrom, rndTo) =>
  inBROWSER ? +prompt(strPromptMsg) : getRandomInt(rndFrom, rndTo);

const getMinMax = (intA, intB, intC) =>
  `Max number is ${Math.max(intA, intB, intC)}, min is ${Math.min(intA, intB, intC)} `;

const getMinMax2 = (intA, intB, intC) => {
  const intMin =
    intA < intB ? (intA < intC ? intA : intC) : intB < intC ? intB : intC;
  const intMax =
    intA > intB ? (intA > intC ? intA : intC) : intB > intC ? intB : intC;

  return `Max number is ${intMax}, min is ${intMin} `;
};

function getMinMax3(intA, intB, intC) {
  let intMin = intA;
  if (intMin > intB) intMin = intB;
  if (intMin > intC) intMin = intC;

  let intMax = intA;
  if (intMax < intB) intMax = intB;
  if (intMax < intC) intMax = intC;

  return `Max number is ${intMax}, min is ${intMin} `;
}

const intNum1 = getFromPromptOrRandom("Įveskite pirmą skaičių: ");
const intNum2 = getFromPromptOrRandom("Įveskite antrą skaičių: ");
const intNum3 = getFromPromptOrRandom("Įveskite trečią skaičių: ");

const strResult = `
Number 1 : ${intNum1}
Number 2 : ${intNum2}
Number 3 : ${intNum3}
----------------------
${getMinMax(intNum1, intNum2, intNum3)}
`;

printResult(strResult);
