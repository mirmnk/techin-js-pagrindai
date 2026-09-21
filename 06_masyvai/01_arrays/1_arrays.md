## 1. Please loop this entire array and print the positions where the string "Waldo" is found. Count how many "Waldo" are in array. 

```javascript
let people = [ 'Lebron','Aaliyah','Diamond','Dominique','Aliyah','Jazmin','Darnell','Hatfield','Hawkins','Hayden','Hayes','Haynes','Hays','Head','Heath','Hebert','Henderson','Hendricks','Hendrix','Henry','Hensley','Henson','Herman','Hernandez','Herrera','Herring','Hess','Hester','Hewitt','Hickman','Hicks','Higgins','Hill','Hines','Hinton','Hobbs','Hodge','Hodges','Hoffman','Hogan','Holcomb','Holden','Holder','Holland','Holloway','Holman','Holmes','Holt','Hood','Hooper','Hoover','Hopkins','Hopper','Horn','Horne','Horton','House','Houston','Howard','Howe','Howell','Hubbard','Huber','Hudson','Huff','Waldo','Hughes','Hull','Humphrey','Hunt','Hunter','Hurley','Hurst','Hutchinson','Hyde','Ingram','Irwin','Jackson','Jacobs','Jacobson','James','Jarvis','Jefferson','Jenkins','Jennings','Jensen','Jimenez','Johns','Johnson','Johnston','Jones','Jordan','Joseph','Joyce','Joyner','Juarez','Justice','Kane','Kaufman','Keith','Keller','Kelley','Kelly','Kemp','Kennedy','Kent','Kerr','Key','Kidd','Kim','King','Kinney','Kirby','Kirk','Kirkland','Klein','Kline','Knapp','Knight','Knowles','Knox','Koch','Kramer','Lamb','Lambert','Lancaster','Landry','Lane','Lang','Langley','Lara','Larsen','Larson','Lawrence','Lawson','Le','Leach','Leblanc','Lee','Leon','Leonard','Lester','Levine','Levy','Lewis','Lindsay','Lindsey','Little','Livingston','Lloyd','Logan','Long','Lopez','Lott','Love','Lowe','Lowery','Lucas','Luna','Lynch','Lynn','Lyons','Macdonald','Macias','Mack','Madden','Maddox','Maldonado','Malone','Mann','Manning','Marks','Marquez','Marsh','Marshall','Martin','Martinez','Mason','Massey','Mathews','Mathis','Matthews','Maxwell','May','Mayer','Maynard','Mayo','Mays','Mcbride','Mccall','Mccarthy','Mccarty','Mcclain','Mcclure','Mcconnell','Mccormick','Mccoy','Mccray','Waldo','Mcdaniel','Mcdonald','Mcdowell','Mcfadden','Mcfarland','Mcgee','Mcgowan','Mcguire','Mcintosh','Mcintyre','Mckay','Mckee','Mckenzie','Mckinney','Mcknight','Mclaughlin','Mclean','Mcleod','Mcmahon','Mcmillan','Mcneil','Mcpherson','Meadows','Medina','Mejia','Melendez','Melton','Mendez','Mendoza','Mercado','Mercer','Merrill','Merritt','Meyer','Meyers','Michael','Middleton','Miles','Miller','Mills','Miranda','Mitchell','Molina','Monroe','Lucas','Jake','Scott','Amy','Molly','Hannah','Lucas'] ;
```

## 2. Declaring the array

let myArray = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

1. print the 3rd item here
2. change the 'thursday' value to null here
3. print the position of step 2

---

## 3. Write a function `max` that takes an array of numbers returns the highest number in the array.

---

## 4. Write a function `sumNumbers` which is given an array of numbers and returns the sum of the numbers. Do the same with reduce() method.

- Example:
  - sumNumbers([1, 4, 8]) --> 13

---

## 5. Write function `allPositive` which is given an array of numbers and returns true if _every_ element is positive and false otherwise.

- Example:
  - allPositive([1, 2, 3, 4, 5]); --> true
  - allPositive([1, 2, -3, 4, 5]); --> false
  - allPositive([0, 0, 1]); --> false

---

## 6. Given an array of numbers, return their product. Use reduce metod.

- Example
  - product([2, 4, 6]); // => 48 (i.e., 2 _ 4 _ 6)
  - product([-10, 10]); // => -100 (i.e., -10 \* 10)

---

## 7. Write function `anyPositive` which is given an array of numbers and returns true if _any_ element is positive and false otherwise.

- Example:
  - anyPositive([1, 2, 3, 4, 5]); --> true
  - anyPositive([1, 2, -3, 4, 5]); --> true
  - anyPositive([0, 0, 1]); --> true
  - anyPositive([-10, -10, -10]); --> false
  - anyPositive([-10, -10, 1]); --> true

---

## 8. Write a function `positives` which is given an array of numbers and returns a new array containing only the positive numbers within the given array.

- Examples:
  - positives([1, -3, 5, -3, 0]) --> [1, 5]
  - positives([1, 2, 3]) --> [1, 2, 3]
  - positives([-1, -2, -3]) --> []

---

## 9. Write function `mean`, which takes an array of numbers and returns their mean. We use "mean" instead of average because "average" can mean many things — mean, median, or mode while mean only ever means one thing.

The mean of three numbers a,b,c is (a + b + c) / 3.
The mean of four numbers a,b,c,d is (a + b + c + d) / 4.
etc.

See https://en.wikipedia.org/wiki/Arithmetic_mean

- Examples:
  - mean([30, 10, 20]); --> 20 (i.e., (30 + 10 + 20) / 3)
  - mean([-10, 10]); --> 0 (i.e., (-10 + 10) / 2)

---

## 10. Write a function `evens` which takes an array of numbers and returns a new array containing only the even numbers in the given array.

---

## 11. Write a function `odds` which takes an array of numbers and returns a new array containing only the odd numbers in the given array.

---

## 12. Write a function `integers` which takes an array of numbers and returns a new array containing only the integers in the given array.

- Example:
  - integers([3.14, 2.4, 7, 8.1, 2]) --> [7, 2]

---

## 13. Write functions `countEvens` which takes an array of integers and returns the count of even integers in the array.

- Example:
  - countEvens([1, 2, 3, 4, 5]); --> 2
  - countEvens([10, 10, 10]); --> 3
  - countEvens([1, 1, 1, 2]); --> 2

---

## 14. Write function `countLessThan` whitch takes an array of numbers and a threshold number and return the count of elements in the array strictly less than the threshold number.

"Strictly less than" means we want numbers less than (<) and not less than or equal to (<=).

- Example:
  - countLessThan([1, 2, 3, 4, 5], 2); --> 1
  - countLessThan([1, 2, 3, 4, 5], 17); --> 5
  - countLessThan([1, 2, 1, 2, 3, 4, 1, 2, 1], 1); --> 0
  - countLessThan([10, 10, 10, -10, 15, 7], 10); --> 2

---

## 15. Write a function `squareDance` which takes an array of numbers and returns a new array containing the result of squaring each of the numbers in the given array.

- Example:
  - squareDance([1, 2, 3]) --> [1, 4, 9]

---

## 16. Given two arrays, write function `glueArrays` which returns a new array that is a concatenation of the two given arrays.

- Example:
  - glueArrays([1, 2, 3], [4, 5, 6]); --> [1, 2, 3, 4, 5, 6]
  - glueArrays([-10, undefined], [true, 'waffles']); --> [-10, undefined, true, 'waffles']
  - glueArrays([], []); --> []
  - glueArrays([20, 104], []); --> [20, 104]
  - glueArrays([], ['hello', 'world']); --> ['hello', 'world']

---

## 17. Given an array and a value, write function `countValue` which returns the number of times that value is found in the array.

- Example:
  - countValue([1, 2, 3, 4, 5], 2); --> 1
  - countValue([1, 2, 3, 4, 5], 17); --> 0
  - countValue([1, 2, 1, 2, 3, 4, 1, 2, 1], 1); --> 4
  - countValue([10, 10, 10, -10], 10); --> 3
  - countValue(['hello', bananas', 'hello'], 'hello'); --> 2
  - countValue(['hello', bananas', 'hello'], 'giraffe'); --> 0

---

## 18. Given an array and a value, write function `findInHaystack` which returns true if the value is found in the array and false otherwise.

The array doesn't need to contain a single type of data.

When searching an array for something, it's common to refer to the array as the "haystack" and the thing being searched for as the "needle", as in, "Looking for a needle in a haystack."

- Example:
  - findInHaystack([1, 2, 30, -10], 480); --> false
  - findInHaystack([1, 2, 30, -10], 30); --> true
  - findInHaystack(['waffle', 'giraffe', 'banana'], 'giraffe'); --> true
  - findInHaystack(['waffle', 'giraffe', 'banana'], 'lemons'); --> false

---

## 19. Given an array and a value, write function `firstIndexOf` which returns the index of the first occurence of the value. If the value is not found, returns -1.

The array doesn't need to contain a single type of data.

- Example:
  - firstIndexOf([10, 20, 30, 20], 20); --> 1
  - firstIndexOf([10, 20, 30, 20], 17); --> -1
  - firstIndexOf(['giraffe', giraffe', 'banana'], 'giraffe'); --> 0
  - firstIndexOf(['giraffe', giraffe', 'banana'], 'banana'); --> 2

---