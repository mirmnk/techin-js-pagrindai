// Write a program to get the length of a JavaScript object.

'use strict';

const person = {
    firstName: 'John',
    lastName: 'Smith',
    age: 41,
    job: 'engineer',
    city: 'Paris',
    country: 'France'
};


console.log(Object.keys(person).length);

