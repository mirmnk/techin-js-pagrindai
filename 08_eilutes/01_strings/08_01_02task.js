"use strict";

/* 
2. Get Digits: Create a function that given a string, returns the integer made from the strings digits. 
*/

const printOutput = function (strOutput) {
  const inBROWSER = typeof window !== "undefined";
  (inBROWSER ? alert : console.log)(strOutput);
};

const isDigit = (charSimbol) => charSimbol >= "0" && charSimbol <= "9";
const isDigit2 = (charSimbol) => "0123456789".includes(charSimbol);
const isDigit3 = (charSimbol) => !Number.isNaN(parseInt(charSimbol));

//const strText = "Te123st 2354 234kjfdsl kljls2345";
let strText = "";
const strResult = [...strText]
  .map((char) => (isDigit(char) ? char : " "))
  .join("")
  .split(" ")
  .filter(Boolean)
  .join("");

// Returns arry of number type elements from string. Supports negative and float numbers separated by space.
function getNumbersArrFromString(strText) {
  const arrNumbers = [];

  let strBuffer = "";
  // function adds to bufer digit '-' or '.' and ingnores everything else exept ' '
  // one '.' alowed for each number
  // '-' alowed as firs simbol in string number
  // space aded to string for the last nubmer to be pushed to array
  for (const char of strText + " ")
    if (isDigit3(char)) {
      strBuffer += char;
    } else if (char === "-" && !strBuffer) {
      strBuffer = "-";
    } else if (char === "." && strBuffer && !strBuffer.includes(".")) {
      strBuffer += char;
    } else {
      if (char === " " && strBuffer) {
        arrNumbers.push(Number(strBuffer));
        strBuffer = "";
      }
    }

  return arrNumbers;
}

// printOutput(getNumbersArrFromString(strText));
printOutput(parseInt(strResult)); // parseInt becouse Number() would return 0 for ''
