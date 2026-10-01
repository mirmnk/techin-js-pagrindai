"use strict";

let tasks = [];
const buttons = document.querySelectorAll("tr button");

function printResult(strResult, resultTdNode) {
  resultTdNode.innerHTML = strResult;
}

/**********************************************
 *
 *          Task 1
 *
 **********************************************/

function task01(resultNode) {
  let strNumber;
  let intNumber;

  do {
    strNumber = prompt("Įveskite skaičių.");
    intNumber = Number(strNumber);
  } while (
    strNumber === null || // user pressed Cancel
    strNumber.trim() === "" || // user pressed OK without input
    !Number.isInteger(intNumber) // is number an integer, not float, NaN or Infinity
  );

  const strResult = `Skaičius ${intNumber} yra ${intNumber % 2 ? "nelyginis" : "lyginis"}`;
  printResult(strResult, resultNode);
}

tasks.push(task01);

/**********************************************
 *
 *          Task 2
 *
 **********************************************/

function task02(resultNode) {
  let strAge;
  let intAge;

  do {
    strAge = prompt("Įveskite amžių.");
    intAge = Number(strAge);
  } while (
    strAge === null || // user pressed Cancel
    strAge.trim() === "" || // user pressed OK without input
    !Number.isInteger(intAge) // is number an integer, not float, NaN or Infinity
  );

  const strResult = intAge >= 18 ? "Adult" : "Minor";
  printResult(strResult, resultNode);
}

tasks.push(task02);

/**********************************************
 *
 *          Task 3
 *
 **********************************************/

function task03(resultNode) {
  let strNumber;
  let intNumber;

  do {
    strNumber = prompt("Įveskite temperatūrą.");
    intNumber = Number(strNumber);
  } while (
    strNumber === null || // user pressed Cancel
    strNumber.trim() === "" || // user pressed OK without input
    !Number.isInteger(intNumber) // is number an integer, not float, NaN or Infinity
  );

  const strResult = intNumber > 30 ? "Hot" : "Cool";
  printResult(strResult, resultNode);
}

tasks.push(task03);

/**********************************************
 *
 *          Task 4
 *
 **********************************************/

function task04(resultNode) {
  const isLoggedIn = confirm("Prisijungti?");

  const strResult = isLoggedIn ? "Welcome back!" : "Please log in";
  printResult(strResult, resultNode);
}

tasks.push(task04);

/**********************************************
 *
 *          Task 5
 *
 **********************************************/

function task05(resultNode) {
  let strNumber;
  let intNumber;

  do {
    strNumber = prompt("Kokia yra krepšelio suma?");
    intNumber = Number(strNumber);
  } while (
    strNumber === null || // user pressed Cancel
    strNumber.trim() === "" || // user pressed OK without input
    !Number.isInteger(intNumber) // is number an integer, not float, NaN or Infinity
  );

  const strResult = intNumber >= 100 ? "Discount applied" : "No discount";
  printResult(strResult, resultNode);
}

tasks.push(task05);

/**********************************************
 *
 *          Task 6
 *
 **********************************************/

function task06(resultNode) {
  let strNumber1, strNumber2;
  let intNumber1, intNumber2;

  do {
    strNumber1 = prompt("Įveskite pirmą skaičių.");
    intNumber1 = Number(strNumber1);
  } while (
    strNumber1 === null || // user pressed Cancel
    strNumber1.trim() === "" || // user pressed OK without input
    !Number.isInteger(intNumber1) // is number an integer, not float, NaN or Infinity
  );

  do {
    strNumber2 = prompt("Įveskite antrą skaičių.");
    intNumber2 = Number(strNumber2);
  } while (
    strNumber2 === null || // user pressed Cancel
    strNumber2.trim() === "" || // user pressed OK without input
    !Number.isInteger(intNumber2) // is number an integer, not float, NaN or Infinity
  );

  const strResult = intNumber1 > intNumber2 ? intNumber1 : intNumber2;
  printResult(strResult, resultNode);
}

tasks.push(task06);

/**********************************************
 *
 *          Task 7
 *
 **********************************************/

function task07(resultNode) {
  let strUsername;

  do {
    strUsername = prompt("Įveskite vartotojo vardą");
  } while (
    strUsername === null || // user pressed Cancel
    strUsername.trim() === "" // user pressed OK without input
  );

  const strResult = strUsername.length >= 4 ? "Valid" : "Too short";
  printResult(strResult, resultNode);
}

tasks.push(task07);

/**********************************************
 *
 *          Task 8
 *
 **********************************************/

function task08(resultNode) {
  let strNumber;
  let intNumber;

  do {
    strNumber = prompt("Įveskite skaičių");
    intNumber = Number(strNumber);
  } while (
    strNumber === null || // user pressed Cancel
    strNumber.trim() === "" || // user pressed OK without input
    !Number.isInteger(intNumber) // is number an integer, not float, NaN or Infinity
  );

  const strResult = intNumber % 5 ? "Not divisible" : "Divisible";
  printResult(strResult, resultNode);
}

tasks.push(task08);

/**********************************************
 *
 *          Task 9
 *
 **********************************************/

function task09(resultNode) {
  let strNumber;
  let intNumber;

  do {
    strNumber = prompt("Įveskite egzamino rezultatą.");
    intNumber = Number(strNumber);
  } while (
    strNumber === null || // user pressed Cancel
    strNumber.trim() === "" || // user pressed OK without input
    !Number.isInteger(intNumber) // is number an integer, not float, NaN or Infinity
  );

  const strResult = intNumber >= 50 ? "Pass" : "Fail";
  printResult(strResult, resultNode);
}

tasks.push(task09);

/**********************************************
 *
 *          Task 10
 *
 **********************************************/

function task10(resultNode) {
  const darkModeOn = confirm("Įjungti tamsujį režimą?");

  const strResult = darkModeOn ? "dark" : "light";
  printResult(strResult, resultNode);
}

tasks.push(task10);

// adding onclick listeners to buttons
//

for (const button of buttons) {
  button.addEventListener("click", () => {
    const taskNumber =
      button.parentNode.parentNode.firstElementChild.textContent.trim();
    if (tasks[taskNumber - 1]) {
      tasks[taskNumber - 1](button.parentNode.nextElementSibling); // node for result output is TD sibling
    }
  });
}
