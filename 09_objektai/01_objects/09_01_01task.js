/*
Write a program to list the properties of an object. E.g. const student = { firstName: "John", lastName: "Smith", class: 12 }; Expected Output: firstName, lastName, class
*/

'use strict';


const student = { firstName: "John", lastName: "Smith", class: 12 };

let properties = [];

for(let key in student) {
    properties.push(key);
}

console.log(properties);