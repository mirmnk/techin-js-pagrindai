# JS functions: everything from the course

Sources: lesson 04 (functions, 2026-09-15) notes, review lessons 12 (Kahoot, 10-01) and 13 (exam prep, 10-02), wiki pages `functions` and `spread-and-rest` (rest parameters part), and **my quiz mistakes** ([[quiz-log]]). Short version: [[functions-cheatsheet]].

**Legend:** `name(arg?)` → return value (`?` = optional) · ❗ = I got this wrong in a quiz (quiz + question) · ⚠ = mistake in a lesson/slide · 🔒 = different in strict mode · course = ES6.

**Every value is checked in Node** (2026-10-05). ⭐ All examples assume `"use strict"` (my course always uses it).

**Course rules** (teacher, 09-15 and exam prep 10-02):
- **Solve every task with functions** (from 09-15 on).
- **Arrow functions** are preferred (companies may use other styles).
- **Meaningful names**: a function name is a **verb** (`getName`, `calculateTotal`); true/false functions start with **`is`** (`isAdult`).

**Contents:** 1 What a function is · 2 `return` · 3 Parameters and arguments · 4 One function = one job · 5 Three ways to write a function · 6 Calling before the definition · 7 Name with vs without `()` · 8 Callbacks and higher-order functions · 9 IIFE · 10 Nested functions and scope · 11 Functions vs methods · my mistakes · recall

## Declarations used in this file

| Declaration | Returns | Changes something? |
|---|---|---|
| `function name(p1, p2?) { … }` | creates the function (declaration) | — |
| `const name = function (p1) { … };` | creates the function (expression) | — |
| `const name = (p1, p2) => expression;` | creates the function (arrow, ES6) | — |
| `name(arg1, arg2?)` | the `return` value, or `undefined` | whatever the body does |
| `setTimeout(callback, ms)` | timer id; `callback` runs **later** | no |
| `clearTimeout(id)` | `undefined` | cancels that timer |
| `arr.forEach(fn(item, index, array))` | `undefined` | no |
| `arr.map(fn(item, index, array))` | **new** array, same length | no |
| `arr.filter(fn(item, index, array))` | **new** array, kept items | no |
| `el.addEventListener(type, handler)` | `undefined` | attaches a listener |

## 1. What a function is: define, then call

A function is a **block of code for one task**. Image from the lesson: a kitchen blender. You put ingredients in (**parameters**), it works, and gives a result back (**`return`**). Why: write the code **once**, call it many times; a fix in one place fixes it everywhere.

```javascript
function calculateTotal(price, quantity = 1) {   // keyword + name + (parameters)
  const total = price * quantity;                 // body = the function's scope { }
  return total;                                   // result goes back to the caller
}
const myTotal = calculateTotal(10, 3);            // call with arguments → 30
```

- **Defining** a function does **not** run it. It runs **only when called**: `name(arguments)`. Many mistakes = the function is never called (exam prep 10-02).
- No parameters → still write empty `()`: `function sayHello() { … }`, call `sayHello()`.
- Parameter names should mean something (`price`, not `p`): VS Code shows them in the call. A greyed-out parameter = never used → hint of a mistake.
- `{ }` is the function's **scope**: variables created inside are **not** visible outside (section 10).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| defining `function f() {…}` | calling `f()` | creates it, nothing runs vs runs the body |
| function name (`calculateTotal`) | variable name (`total`) | verb = action vs noun = thing |

## 2. `return`

- `return value` gives the result **back to the place of the call**: `const x = f()` stores it.
- **No `return` → the call gives `undefined`** (big test Q34). "Why is my result empty?" → look for a missing `return`.
- **`return` ends the function**: lines after it **never run** (big test Q35); VS Code shows them faded.
- `return;` with no value = **exit early**.
- A function that only *does* something (prints, changes the page) doesn't need `return`.

```javascript
const noReturn = () => {};
console.log(noReturn());            // undefined
function getLetter() { return "A"; console.log("never"); }   // "never" never runs
console.log(getLetter());           // A
function divideTen(n) {
  if (n === 0) return;              // exit early
  return 10 / n;
}
console.log(divideTen(0), divideTen(5));   // undefined 2
const user = noReturn();            // undefined, no error
user.name;                          // TypeError (undefined has no properties)   ❗ error quiz Q10
```

**`undefined` or crash?** The call gives `undefined`; a property **of** that result crashes. Ask: "`undefined` **OF** what?" ([[types-learned]] section 12a.)

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `return x` | `console.log(x)` | gives the value back to the caller vs only prints it (caller gets `undefined`) |
| `f()` with no `return` | `f().name` | `undefined`, no error vs TypeError ❗ |
| code after `return` | code before `return` | never runs vs runs |

## 3. Parameters and arguments

### 3a. The names (exam question)

- **Parameters** = the names in the **definition** (placeholders). **Arguments** = the real values in the **call**.
- `function greet(name) {…}` → `name` = parameter; `greet("Ona")` → `"Ona"` = argument.

### 3b. Missing arguments and default values

- A **missing** argument → the parameter is **`undefined`** (maths with it → `NaN`). No error.
- **Default value** (ES6): `param = value` is used if nothing is passed. It protects from errors and saves typing.

```javascript
const add = (a, b) => a + b;
add(2, 3);   add(2);                       // 5   NaN (2 + undefined)
const greet = (name = "guest") => `Hi ${name}`;
greet("Ona");   greet();                   // "Hi Ona"   "Hi guest"
```

### 3c. Rest parameters `...` (ES6)

When you don't know how many arguments will come, **rest** collects them into an **array**. Details: [[arrays-learned]] step 9.

```javascript
function sum(...numbers) {                 // numbers is an array
  let total = 0;
  for (const n of numbers) total += n;
  return total;
}
sum(1, 3);   sum(3, 4, 5, 6);              // 4   18
```

- Rest can follow normal parameters and takes **what is left**: `(first, ...others)` with `("Ona", 30, "Vilnius")` → `others = [30, "Vilnius"]`.
- Rest must be the **last** parameter: `function f(...nums, last) {}` → SyntaxError (rest not last).
- ⚠ The arrays slide called spread "a rest parameter". Rule: `...` in the **definition** = rest (collects); `...` in a **call** = spread (unpacks).

### 3d. A parameter is already declared ❗ big test Q36

A parameter is a variable of the function. Declaring the **same name** again with `let`/`const` inside the body = "declared twice". The file can't be read → **nothing runs**, not even line 1.

```javascript
console.log("start");                            // NOT printed
function greet(name) { let name = "Jonas"; }     // SyntaxError (same name declared twice)
```

- Assigning **without** `let` is fine: `name = "Jonas";` just changes the parameter.
- 🔒 `function f(a, a) {}` → strict mode: SyntaxError (same name declared twice); normal mode allows it.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| parameter | argument | name in the definition vs value in the call |
| missing argument | missing variable | `undefined` vs ReferenceError (name doesn't exist) |
| `(...nums)` in definition | `f(...arr)` in call | rest: collects into an array vs spread: unpacks an array |
| `let name` inside, `name` is a parameter | `name = …` inside | SyntaxError, nothing runs ❗ vs just a new value |

## 4. One function = one job

Good practice from class: a function does **one** thing.
- A **calculating** function works out a value and **returns** it.
- A **displaying** function shows a value (console, `alert`, page).
- Reason: another time you may want to use the result in **another calculation**, not show it.

```javascript
const calcPrice = (price, qty) => price * qty;               // calculates, returns
const showPrice = (price) => console.log(`${price.toFixed(2)} €`);   // only displays
showPrice(calcPrice(2.5, 3));            // 7.50 €
const doubled = calcPrice(2.5, 3) * 2;   // 15 — reuse works because calcPrice returns
```

`showPrice(calcPrice(2.5, 3))` runs from the **inside out**: first `calcPrice`, then its result goes into `showPrice`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| calculating function | displaying function | returns a value vs prints/shows, returns `undefined` |

## 5. Three ways to write a function

| Type | Syntax | Notes |
|---|---|---|
| **Declaration** | `function sum(a, b) { return a + b; }` | oldest, classic; can be called before its line (section 6) |
| **Expression** | `const sum = function (a, b) { return a + b; };` | nameless function stored in a variable; rarely used |
| **Arrow** (ES6) | `const sum = (a, b) => a + b;` | shortest; **the teacher wants tasks in this style**; no own `this` (takes it from outside) |

Variables can hold functions: `typeof sum` → `"function"` for all three ❗ big test Q13 ([[types-learned]] section 1).

### Arrow rules

```javascript
const add = (a, b) => a + b;        // ONE expression → no { }, no return (implicit return)
const greet = () => alert("Hi");    // no parameters → empty () required
const square = x => x * x;          // one parameter → () optional (teacher: always write them)
const sum = (a, b) => {
  const r = a + b;
  return r;                         // with { } → return is REQUIRED
};
const broken = (a, b) => { a + b; };
broken(2, 3);                       // undefined — braces, but no return
const makeUser = name => ({ name });     // object in short form needs ( ) → { name: "Ona" }
const bad = name => { name: name };      // undefined — { } was read as the body
```

- Don't invent a "fourth way": `const f = function g() => 1;` → SyntaxError.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `(a, b) => a + b` | `(a, b) => { a + b; }` | returns the sum vs `undefined` (braces need `return`) |
| `=> ({ a: 1 })` | `=> { a: 1 }` | returns an object vs `undefined` |
| `x => x * 2` | `(x) => x * 2` | same; teacher prefers the brackets |

## 6. Calling before the definition ❗ big test Q38

A **function declaration** can be called from a line **above** it (it is "hoisted"). A function in a `const` (expression or arrow) is a normal variable: before its line the name is **not created yet**.

```javascript
console.log(double(4));             // 8 — declaration works early
function double(n) { return n * 2; }
console.log(triple(4));             // ReferenceError (name not created yet)
const triple = (n) => n * 3;
```

- Line 1 **already ran** (8 is printed): lines before a ReferenceError run. Compare SyntaxError (section 3d): nothing runs.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| declaration called early | `const` arrow called early | works vs ReferenceError (name not created yet) ❗ |
| ReferenceError (early `const`) | SyntaxError (declared twice) | lines before it run vs nothing runs |

## 7. Name with vs without `()`

- `sayHi("Ona")` — **calls** the function, gives its **return value**.
- `sayHi` — the **function itself** (a reference). Nothing runs. This is how you **pass** a function somewhere.

```javascript
function sayHi(name) { return `Hi ${name}`; }
console.log(sayHi("Ona"));    // Hi Ona
console.log(sayHi);           // the function, not a result (Node: [Function: sayHi])
console.log(`${sayHi}`);      // its source code as text
const greeting = sayHi;       // copies the reference, doesn't call
greeting("Jonas");            // "Hi Jonas"
```

- Common bug: forgetting `()` → you get the code instead of the result.
- **Passing a function** → name **without** `()`: `addEventListener("click", handleClick)` ✅ runs on every click; `addEventListener("click", handleClick())` ❌ runs **now** and passes its result (`undefined`). Same with `setTimeout(showMessage, 1000)`.
- In an HTML attribute it's the opposite: `<button onclick="handleClick()">` — **with** `()` ([[dom-learned]] step 6).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `f` | `f()` | the function itself vs its result |
| `addEventListener("click", f)` | `addEventListener("click", f())` | runs on click vs runs now, passes `undefined` |
| `onclick="f()"` (HTML) | `addEventListener("click", f)` (JS) | with `()` vs without |

## 8. Callbacks and higher-order functions

Functions are **values**: you can store them, pass them, return them.

- **Callback** = a function **passed as an argument** to another function (often named `fn` or `callback`). Pass it by name (no `()`), or inline as an arrow.
- **Higher-order function (HOF)** = the function that **receives** a callback (or returns a function). It decides **when** and **with which arguments** the callback runs.
- Class demo: `filterNumbers(numbers, fn)` kept the numbers where `fn(number)` is `true` — pass an even-check or an odd-check.

```javascript
const calculate = (a, b, fn) => fn(a, b);   // HOF: calls the callback
calculate(6, 3, (x, y) => x - y);           // 3
calculate(6, 3, (x, y) => x * y);           // 18

// built-in HOFs: array methods take callbacks ([[arrays-learned]] steps 2–5)
const double = (n) => n * 2;
[1, 2, 3].map(double);                      // [2, 4, 6] — passed by name
[1, 2, 3, 4].filter((n) => n % 2 === 0);    // [2, 4]    — inline arrow
[1, 2, 3].forEach((n) => console.log(n));   // prints 1 2 3, returns undefined
```

### Sync vs async callbacks

- **Sync**: runs **now**, inside the HOF — `map`, `filter`, `forEach`, `reduce`.
- **Async**: runs **later** — `setTimeout`, events (`addEventListener`). Code after the HOF call runs **first**.
- ⚠ The lesson said callbacks are "always asynchronous". Not true: array-method callbacks run immediately.

Class example (2 s delay):

```javascript
function callbackTech(fn) {
  console.log("calling callbackTech");
  if (fn) {
    setTimeout(() => fn("tech"), 2000);
  }
  console.log("callbackTech finished");
}
callbackTech((word) => console.log("callback got:", word));
console.log("code after the call");
// calling callbackTech → callbackTech finished → code after the call → (2 s) callback got: tech
```

- `setTimeout` **doesn't pause** the program; even `setTimeout(cb, 0)` waits until the current code is finished. Cancel: `clearTimeout(id)`.
- Async = one of the hardest parts of JS; more in React/frontend courses.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| callback | HOF | the function passed in vs the function that receives and calls it |
| `map` / `forEach` callback | `setTimeout` callback | runs now (sync) vs runs later (async) ⚠ |
| `forEach` | `map` | returns `undefined` vs a new array |

## 9. IIFE (self-invoking function)

A nameless function in `( )`, with a call `()` right after. It runs **once**, by itself, when the script starts. Rarely used, but don't mistake it for an error.

```javascript
(function () {
  const secret = "hidden";          // private: not visible outside
  console.log("runs immediately");
})();
(() => console.log("arrow IIFE"))();
```

- Variables inside don't leak out: `secret` outside → ReferenceError (name doesn't exist).
- Put `;` at the end of the line before an IIFE. Otherwise the `( )` is glued to that line → TypeError (not a function).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `(function () {…})();` | `function f() {…}` | runs at once, one time vs only when called |

## 10. Nested functions and scope

A function can be defined and called **inside** another function.

- The **inner** function sees the **outer** function's variables and parameters. Code outside does **not** see the inner variables and can't call the inner function.
- An inner variable with the same name **hides** (shadows) the outer one.

```javascript
function sayHiBye(firstName, lastName) {
  function getFullName() {
    return firstName + " " + lastName;   // sees outer parameters
  }
  return "Hello, " + getFullName();
}
sayHiBye("Ona", "Onaite");               // "Hello, Ona Onaite"
getFullName();                           // ReferenceError (name doesn't exist) — private
const n = 1;
const f = () => { const n = 2; return n; };   // inner n shadows the outer n
f();                                     // 2  (outer n is still 1)
```

- `return` ends **only the function it is written in** (here `getFullName`, not `sayHiBye`).
- **Closure** (lesson-04 notes): if the inner function is returned, it still **remembers** the outer variables after the outer function finished.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| inner reads outer variable | outer reads inner variable | ✅ works vs ReferenceError (name doesn't exist) |
| `const n` inside (shadow) | `n = …` inside | new, separate variable vs changes the outer one |

## 11. Functions vs methods

- **Function**: mostly the ones **you write**: `calculateTotal(…)`, `sayHi(…)`.
- **Method**: attached to an object, called with a **dot**. Mostly **built in**: `Math.floor(2.7)` → `2`, `"Ona".toUpperCase()` → `"ONA"`. You use them without writing their code.
- Method name typo → TypeError (not a function) ❗ error quiz Q6, see [[types-learned]] section 12b.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `calculateTotal(10)` | `Math.floor(10.5)` | function call vs method call (with a dot) |
| `"ona".toUpperCase()` | `"ona".touppercase()` | ✅ vs TypeError (not a function) ❗ |

## My mistakes → where they are explained

| Quiz | Question | Topic | Section |
|---|---|---|---|
| big test Q36 | parameter `name` + `let name` inside (said TypeError) | SyntaxError, nothing runs | 3d |
| big test Q38 | `double(4)` / `triple(4)` before definition (said SyntaxError) | `8`, then ReferenceError | 6 |
| big test Q13 | `typeof function` (said `"object"`) | `"function"` | 5 |
| error quiz Q10 | no-`return` function, then `.name` (said `undefined`) | TypeError | 2 |
| error quiz Q6 | `"ona".touppercase()` (said `ONA`) | TypeError (not a function) | 11 |

Tested and answered right: no `return` → `undefined` (big test Q34), code after `return` (Q35).

## Recall from memory

1. Parameter vs argument: which is in the definition, which in the call?
2. `const f = (a, b) => { a + b; }; f(1, 2)` → ?
3. `const add = (a, b) => a + b; add(2)` → ?
4. `const greet = (name = "guest") => name;` — `greet()` → ?
5. `console.log("start"); function f(x) { let x = 1; }` — what is printed, which error?
6. `g(); function g() {}` vs `h(); const h = () => {};` — what happens in each?
7. `btn.addEventListener("click", show())` — what is wrong?
8. Callback vs higher-order function: which is which in `[1, 2].map(double)`?
9. `console.log("A"); setTimeout(() => console.log("B"), 0); console.log("C");` → order?
10. How do you return an object `{ id: 1 }` from a short arrow function?

<details><summary>Answers</summary>

1. Parameter = name in the definition; argument = real value in the call.
2. `undefined` — braces need `return`.
3. `NaN` — `b` is `undefined`, `2 + undefined` → `NaN`.
4. `"guest"` — nothing passed → default used.
5. Nothing is printed — SyntaxError (same name declared twice), the file can't be read.
6. `g()` works (declaration); `h()` → ReferenceError (name not created yet).
7. `show()` runs **now** and passes its result (`undefined`); pass `show` without `()`.
8. `double` = callback; `map` = higher-order function.
9. A, C, B — `setTimeout` is async even with 0 ms.
10. `() => ({ id: 1 })` — wrap the object in `( )`.

</details>
