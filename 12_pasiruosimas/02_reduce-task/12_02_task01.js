/*
1) Turn an array of numbers into a total of all the numbers
function total(arr) {
   // your code here
}
console.log(total([1,2,3])); // 6
*/
"use strict";

function total(arr) {
  return arr.reduce((total, x) => total + x, 0);
}
console.log(total([1, 2, 3])); // 6
