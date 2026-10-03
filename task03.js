/*
3. Parse CSV string into array of objects
Given a CSV string:

const input = "name,age,city\nJonas,25,Vilnius\nOna,30,Kaunas\nPetras,22,Klaipeda";

Write a function that returns:

[
  { name: "Jonas", age: 25, city: "Vilnius" },
  { name: "Ona", age: 30, city: "Kaunas" },
  { name: "Petras", age: 22, city: "Klaipeda" }
]

Use string methods, arrays, and objects (no libraries).
*/

"use strict";

const input =
  "name,age,city\nJonas,25,Vilnius\nOna,30,Kaunas\nPetras,22,Klaipeda";

const toObjArray = (strObjects) => {
  const arrStrObj = strObjects.split("\n").map((str) => str.split(","));

  const arrKeys = arrStrObj.shift();
  const arrValues = arrStrObj;

  const arrObj = [];
  arrStrObj.forEach((value, index) => {
    
    // need an array of [key, value] pairs for Object.fromEntries
    arrObj.push(Object.fromEntries(arrKeys.map((key, i) => [key, value[i]])));
  });
  return arrObj;
};

console.log(...toObjArray(input));
