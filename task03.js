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
  let arrStrObj = strObjects.split("\n");
  arrStrObj = arrStrObj.map((str) => str.split(","));
  let arrObj = [];
  // console.log(arrStrObj[0][0]);
  for (const i = 1; i < arrStrObj.length; i++) {
    console.log(arrStrObj[i]);
  }
  return arrObj;
};

console.table(toObjArray(input));
