/*
Write a program to display the reading status (i.e. display book name, author name and reading status) of the following books. const library = [ { author: 'J.K. Rowling', title: 'Harry Potter and the Chamber of Secrets', readingStatus: true }, { author: 'Homer', title: 'The Odyssey', readingStatus: true }, { author: 'Harper Lee', title: 'To Kill a Mockingbird', readingStatus: false }]; E.g. Output: Already read Harry Potter and the Chamber of Secrets by J.K. Rowling Already read The Odyssey by Homer You still need to read To Kill a Mockingbird by Harper Lee
*/

'use strict';

const library = [ 
    { author: 'J.K. Rowling', title: 'Harry Potter and the Chamber of Secrets', readingStatus: true },
    { author: 'Homer', title: 'The Odyssey', readingStatus: true },
    { author: 'Harper Lee', title: 'To Kill a Mockingbird', readingStatus: false }
];

let strResult = ""


for(const book in library) {
    if (book.readingStatus === true) {
        strResult += `Already read ${book.title} by ${book.author}. `;
    } else if (!book.readingStatus === false) {
                strResult += `You still need to read ${book.title} by ${book.author}. `;
    }

}

console.log(strResult);