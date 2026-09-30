/*
Create a person object. Include the person's first and last name, age, job, city etc. Then print text by retrieving data from the object e.g. "John Smith is a 41 year old engineer living in France".
*/

'use strict';

const person = {
    firstName: 'John',
    lastName: 'Smith',
    age: 41,
    job: 'engineer',
    city: 'Paris',
    country: 'France'
};


const strResult = `${person.firstName} ${person.lastName} is a ${person.age} years old ${person.job} living in ${person.city}, ${person.country}`;

console.log(strResult);