## 1. Given two integers, function returns the sum of all integers between those two integers, inclusive.

- Example:
- sumOfRange(1, 5) --> 15 (i.e., 1 + 2 + 3 + 4 + 5)
- sumOfRange(-3, 4) --> 4 (i.e., -3 + -2 + -1 + 0 + 1 + 2 + 3 + 4)

```javascript
function sumOfRange(leftSummand, rightSummand) {
  // This is your job. :)
}
```

---

## 2. Write a function `fizzbuzz` that returns the fizzbuzz string for an input number.

- A fizzbuzz string is defined as the following:

  - For every number from 1 to the input number
    - if that number is not a multiple of 3 or 5, add a period "." to the fizzbuzz string
    - for every number that is a multiple of 3 (but not 5), add "fizz" to the fizzbuzz string
    - for every number that is a multiple of 5 (but not 3), add "buzz" to the fizzbuzz string
    - for every number that is a multiple of 3 and 5, add "fizzbuzz" to the fizzbuzz string

- Examples:
  - fizzbuzz(3) --> '..fizz'
  - fizzbuzz(15) --> '..fizz.buzzfizz..fizzbuzz.fizz..fizzbuzz'

---

## 3. Write a function `numberJoinerWhile` which is given a start number and an end number.

It should return a string of the numbers joined together by the `_` character.
Use a `while` loop to do this.

- Examples:
  - numberJoinerWhile(1, 10) --> '1_2_3_4_5_6_7_8_9_10'
  - numberJoinerWhile(12, 14) --> '12_13_14'

---

## 4. Write a function `numberJoinerFor` which does the same thing as `numberJoinerWhile`, except using a `for` loop internally.

---

## 5. Write a function `numberJoinerFancy` which does the same thing as `numberJoinerWhile`, except it takes an optional third argument specifying the separator between the numbers.

Use either a `while` or a `for` loop (your preference).

- Examples:
  - numberJoinerFancy(1, 10) --> '1_2_3_4_5_6_7_8_9_10'
  - numberJoinerFancy(1, 5, '~') --> 1~2~3~4~5
  - numberJoinerFancy(3, 6, '**_BANANAS_**') --> 1**_BANANAS_**2**_BANANAS_**3

---

## 6. Write a function `gcd` that returns the Greatest Common Divisor of two numbers. If no GCD exists, return 1.

- Greatest Common Divisor --> https://tinyurl.com/gr84qca

- Examples:
  - gcd(5, 1) --> 1 - isMultipleOf(3, 15) --> true
  - isMultipleOf(2, 7) --> false
  -
  - gcd(3, 15) --> 3
  - gcd(50, 20) --> 10

---

## 7. Write a function `factors` which is given a number and returns an array containing all its factors.

- What are factors? --> https://tinyurl.com/gncg62o

- Examples:
  - factors(1) --> [1]
  - factors(12) --> [1, 2, 3, 4, 6, 12]
  - factors(42) --> [1, 2, 3, 6, 7, 14, 21, 42]

---

## 8. Write a function `makeSquare` which is given a size and returns a square of that size using asterisks.

- Example:
  - makeSquare(5)
    `*****`
    `*****`
    `*****`
    `*****`
    `*****`

---

## 9. Write a function "makeBox" which is given a width and height and returns a hollow box of those dimensions.

- Example:
  - makeBox(6, 4)
    `******`
    `*    *`
    `*    *`
    `******`

---

## 10. Write a function "makeBanner" which is given some text and returns a banner with a border surrounding the text. The border should stretch to the length of the text.

- Example:
  - makeBanner('Welcome to DigitalCrafts')
    `****************************`
    `* Welcome to DigitalCrafts *`
    `****************************`

---
