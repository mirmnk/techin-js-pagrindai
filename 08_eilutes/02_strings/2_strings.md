## 1. Write a function `isVowel` that takes a character (i.e. a string of length 1) as input and returns true if it is a vowel, false otherwise.

- Useful resource: -https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

- Examples:
  - isVowel('c') --> false
  - isVowel('e') --> true
  - isVowel('A') --> true
  - sVowel(99) --> false
  - isVowel({e: "Elephant"}) --> false

---

## 2. Write the `removeZAnimals` function as described below:

```javascript
function removeZAnimals() {
  // 1) declare an array with some strings
  const animals = ["alligator", "zebra", "crocodile", "giraffe"];

  // create an empty array (we will fill this with strings from the previous array)
  let animalsWithoutZ = [];

  // 2) loop through "animals"

  // 3) add every item in "animals" to "animalsWithoutZ" unless the animal name contains the letter "z"

  // 4) return "animalsWithoutZ"
}
```

- **HINT:** remember you can search within a string

---

## 3. Write a function `removeAnyWordWithZ` that takes 1 argument: an array of strings

It should return a new array that has all of the items in the passed-in array minus any words that contain the letter `z` or `Z` (case-insensitive).

---

## 4. Write a function `removeWordsWithChar` that takes 2 arguments:

- an array of strings
- a string of length 1 (ie: a single character)

- It should return a new array that has all of the items in the first argument except those that contain a character in the second argument (case-insensitive).

- Examples:
  - removeWordsWithChar(['aaa', 'bbb', 'ccc'], 'b') --> ['aaa', 'ccc']
  - removeWordsWithChar(['pizza', 'beer', 'cheese'], 'E') --> ['pizza']

---

## 5. Write a function `reverse` that computes the reversal of a string.

- Example:
  - reverse("skoob") --> "books"

---

## 6. Write a function `findLongestWord` that takes a string of words and returns the longest word in that string. If there are multiple words with the same maximum length return the first longest word.

- Example:
  - findLongestWord('a book full of dogs') --> 'book'

---

## 7. Write a function called `nicer`. It should clean up the language in its input sentence.

- Forbidden words include

  - heck,
  - darn,
  - dang,
  - crappy.

- Example:
  - nicer('mom get the heck in here and bring me a darn sandwich.')--> 'mom get the in here and bring me a sandwich.'

---

## 8. Write a function called `capitalizeAll` It should take as input a sentence and capitalize the first letter of every word in the sentence.

- Examples:
  - capitalizeAll('hello world') --> 'Hello World'
  - capitalizeAll('every day is like sunday') --> 'Every Day Is Like Sunday'

---

## 9. Write a function called `split` that does the same thing as String.split

It should take two inputs:

- a string and
- a delimiter string

Do not use the native .split() method for this. Your task is to reverse-engineer .split() and write your own.

- Examples:
  - split('a-b-c', '-') --> ['a', 'b', 'c']
  - split('APPLExxBANANAxxCHERRY', 'xx') --> ['APPLE', 'BANANA', 'CHERRY']
  - split('xyz', 'r') --> ['xyz']

---

## 10. Write a function `longLongVowels` which is given a string, and returns a version of that string extending any long vowels to 5 characters.

- Examples:
  - longLongVowels('Good')--> 'Goooood'
  - longLongVowels('Cheese') --> 'Cheeeeese'
  - longLongVowels('Man') --> 'Man'

---

## 11. Write a function `leetspeak` Challenge 4:which is given a string, and returns the leetspeak equivalent of the string.

- To convert text to its leetspeak version, make the following substitutions:

  - A => 4,
  - E => 3,
  - G => 6,
  - I => 1,
  - O => 0,
  - S => 5,
  - T => 7

- HINT: What is the best data structure to represent the substitutions?

- Examples:
  - leetspeak('Leet') --> "l337"
  - leetspeak('ORANGE') --> "0r4n63"

---

## 12. Write a function `recognizeEmployees` that takes two arguments:

- 1. an array of names of people to be recognized
- 2. an array of employees of the month

Return an array telling everyone that they did a great job, except employees of the month did an outstanding job.

- Examples:

  - recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Bill'])
    --> ['Great job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!']

  - recognizeEmployees(['Susan',Challenge 4: 'Anthony', 'Bill'], ['Bill', 'Susan'])
    --> ['Outstanding job, Susan!', 'Great job, Anthony!', 'Outstanding job, Bill!']

  - recognizeEmployees(['Susan', 'Anthony', 'Bill'], ['Jennifer', 'Dylan'])
    --> ['Great job, Susan!', 'Great job, Anthony!', 'Great job, Bill!']

---

## 13. Write a function `alphaSort` that sorts an array of strings alphabetically.

- Examples:
  - alphaSort(['b', 'a', 'c']) --> ['a', 'b', 'c']

---

## 14. Write a function `strLengthSort` that sorts an array of strings by how long each string is. Put the shortest strings first.

- Examples:
  - strLengthSort(['Apple', 'Banana', 'Cherry']) --> ['Apple', 'Cherry', 'Banana']

---

## 15. Write a function `sumSort`. Given an array of array of numbers like:

var arr = [
[1, 3, 4],
[2, 4, 6, 8],
[3, 6]
];

Sort the array by the sum of each inner array. For the above example, the
respective sums for each inner array is 8, 20, and 9.

- Example:
  - sumSort([
    [9, 1, 9],
    [2],
    [4, 5]
    ]) --> [[2], [4, 5], [9, 1, 9]]

---

## 16. Write a function `sortArray` that takes an array of numbers as input and sorts them in ascending order and returns.

- using the bubble sort algorithm,
- using the selection sort algorithm
- using the insertion sort algorithm
- using merge sort algorithm.

---

## 17. You can use the map method to transform each item in an array into something else. map() returns a new array leaving the original array unchanged.

## 18. We have an array of numbers that are stored as strings.

// Initial: [ '1', '2', '3', '4', '5' ];

Let's transform these strings into numbers using the map method.
// Result: [ 1, 2, 3, 4, 5 ];

- Then store the new array we created in a variable.

  ***

## 19. We have an array of words that are stored in as strings.

// Initial: [ 'apple', 'pear', 'cherry' ];

Let's capitalize all the words we have within this array.\*
// Result: [ 'APPLE', 'PEAR', 'CHERRY' ];

Then store the new array we created in a variable.

- The words will still be strings, just as before.

---

## 20. Turn this list of numbers into price strings with two digits and a dollar sign at the beginning.

// Initial: [5, 4.23, 6.4, 8.09, 3.20];

Dont forget to:

- Turn the numbers into strings
- Concatenate/ add the dollar sign
- Make the prices have decimals
- Store the new array we created in a variable
  // Result: [ '$5.00', '$4.23', '$6.40', '$8.09', '$3.20' ];

---

## 21. Use the map method on the daysOfWeek array, creating a new array of abbreviated week days.

- Each abbreviated string should be the first three letters of the long version in daysOfWeek.
- Store the new array in the variable abbreviatedDays.

// Initial: const daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

// Result: const daysOfWeek = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
