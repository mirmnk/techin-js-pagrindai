/* 
1. Remove Blanks: Create a function that, given a string, returns all of that string’s contents, but without blanks.
 */
'use strict';

const completeTrim = (strText) => String(strText).split(" ").join() ;

const strResult = completeTrim("Remove Blanks: Create a function that, given a string, returns all of that string’s contents, but without blanks.");

console.log(strResult);