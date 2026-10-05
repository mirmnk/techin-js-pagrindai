/*
2) Turn an array of numbers into a long string of all those numbers.
function stringConcat(arr) {
   // your code here 
}
console.log(stringConcat([1,2,3])); // "123"
*/
"use strict";

function stringConcat(arr) {
  return arr.reduce((acc, x) => acc + x, "");
}

console.log(stringConcat([1, 2, 3])); // "123"
