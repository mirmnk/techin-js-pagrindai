/*
Write a JavaScript program to delete the "class" property (or last property) from the previous object.
*/

'use strict';

const student = { firstName: "John", lastName: "Smith", class: 12 };

delete student.class;

console.log(student);