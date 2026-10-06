# JS basics: everything from the course

Sources: course lessons 2026-09-07 → 10-02 (slides "JavaScript įvadas" + recordings), wiki pages `what-is-javascript`, `how-javascript-runs`, `console-and-console-log`, `syntax-basics`, `variables-let-const-var`, `browser-input-output`, `operators`, `math-object`, `dev-environment-vscode-live-server`, lesson notes 01, 02, 12 (Kahoot review), 13 (exam prep), and **my quiz mistakes** ([[quiz-log]]). Short version: [[basics-cheatsheet]].

**Legend:** `name(arg?)` → return value (`?` = optional) · ❗ = I got this wrong in a quiz (quiz + question) · ⚠ = the lesson/slides say it wrong or simplified · 📘 = not from the course, kept because it matters for understanding · 🔒 = strict-mode-only difference · ES2016+ features are tagged (course = ES6) with the ES6 alternative.

**Every value is checked in Node 22** (2026-10-05), all with `"use strict"`. Browser-only functions (`prompt`, `alert`, `confirm`, `document`) don't exist in Node → their results come from the course.

**Contents:** 1 What JS is · 2 How JS runs · 3 Syntax · 4 Variables & scope · 5 Naming · 6 Input / output · 7 Operators · 8 Math · Recall

## All functions used in this file (declarations)

| Declaration | Returns | Changes something? |
|---|---|---|
| `console.log(value)` | `undefined` | no — only prints (browser console / terminal) |
| `alert(message)` | `undefined` | no — popup with OK (browser only) |
| `prompt(message, default?)` | **string** (what was typed) / **`null`** (Cancel) | no (browser only) |
| `confirm(message)` | `true` (OK) / `false` (Cancel) | no (browser only) |
| `document.getElementById(id)` | element / `null` | no |
| `element.innerHTML` (property) | string, read / write | write = changes the page |
| `Math.floor(x)`, `ceil(x)`, `round(x)`, `trunc(x)`, `max(v1, …)`, `min(v1, …)`, `pow(base, exp)`, `sqrt(x)`, `random()` | number (`random`: 0 ≤ n < 1) | no — table in section 8 |
| `num.toFixed(digits)` | **string** | no |

## 1. What JavaScript is

- **JS makes pages interactive**: the page *reacts* to the user (button click, like counter, shopping cart, password strength).
- **The web trio** (a page is like a person, or a house): **HTML** = structure, *what* is on the page (skeleton; "there is a house") · **CSS** = look (skin / clothes; "the roof is blue") · **JavaScript** = behaviour, what *happens* (brains; "you can switch the lights on/off").
- **Frontend** = the part the user sees (JS was made for this first). **Backend** = server side, e.g. cart items saved to a database. Today JS does **both** (backend with Node.js).
- JS can: create/change HTML elements, change styles, show/hide parts (user vs admin), react to mouse and keyboard, send requests to servers, work with cookies.
- **History:** first version made in **10 days** → some quirks. Names: **Mocha → LiveScript → JavaScript** (marketing, Java was popular). **Java ≠ JavaScript**.
- **ECMAScript** = the official **rules** (standard); JavaScript = the **language** that follows them. Before the standard, the same code could work in Chrome and fail in Firefox.
- **ES6 = ECMAScript 2015** = the course version. Newer versions exist (one per year: ES2016, ES2017 …), but not every browser supports the newest features.
- **Interpreted**: the code is read and run **line by line** ("look, do, look, do"), not compiled first like Java. ⚠ Simplified: modern engines compile JS on the fly (JIT). **For the exam, answer "interpreted".**
- **Dynamically typed** (exam recap): no type in the declaration → types: [[types-learned]] section 1.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| JavaScript | Java | different languages, only the names are similar |
| JavaScript | ECMAScript | the language vs the rules (standard) it follows |
| frontend | backend | what the user sees (browser) vs server, data (Node) |

## 2. How JS runs

JS needs an **interpreter (JavaScript engine)**. Two environments:
- **Browser** → you code the **frontend**. HTML page + `<script>`, open with **Live Server**; `console.log` → browser console (F12).
- **Node.js** ("JavaScript Runtime Environment") → the **backend**. Terminal: `node task1.js` (or `node task1`); output in the terminal. Check: `node --version` / `node -v`. No `prompt`, `alert`, `document` there → ReferenceError (name doesn't exist). Tasks without `prompt`/DOM: Node is simpler.

**The `<script>` tag.** A `.js` file can't open in a browser alone — it needs an HTML page. In VS Code type `!` + Enter → page skeleton (`<head>` = not shown, `<body>` = visible). `src` = path to the file.

```html
<script src="task1.js" defer></script>   <!-- course way: in <head> WITH defer -->
<script src="task1.js"></script>         <!-- or without defer: as the LAST line of <body> -->
```

- The page is read **top to bottom**. A script that uses page elements must run **after** they exist, or it finds nothing (`getElementById` → `null` → TypeError, [[dom-learned]] step 1).
- **`defer`** = run the script only after the whole page is loaded. Recommended: in `<head>` **with `defer`**. Without `defer` → **end of `<body>`**. A script that only calculates can stand anywhere.
- 📘 Always write the closing `</script>`, even with `src` — why it matters: `<script src="a.js" />` is not valid, and the browser then treats the rest of the page as script.
- Class setup: one folder per task set, `task1.js` … `task10.js` + **one** `index.html`; change the name in `src` to test the next task.

**VS Code + Live Server:** **Go Live** button (bottom bar) opens the page (no button → is the extension **enabled**?). Turn on **Autosave** — trap: "code 100 % correct, nothing works" = file not saved. **One small file per task** (easy to find at the exam).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| browser | Node.js | frontend, has `prompt`/`document` vs backend, terminal only |
| `<script defer>` in `<head>` | `<script>` in `<head>` | runs after the page loads vs runs **before** `<body>` exists (elements → `null`) |
| `defer` in `<head>` | script at the end of `<body>` | both run after the elements exist — `defer` is recommended |

## 3. Syntax basics

**Console.** `console.log("Hello World");` prints `Hello World` (text in quotes = string). Browser console: right-click → **Inspect**, or **F12** → **Console** tab; you can also type code there and it runs at once. Node: output in the terminal.

**Statements and `;`.** A program = **statements**, run **one after another**, top to bottom, usually one per line. End each with **`;`**. A missing `;` usually still works, but **always write it** (in Java/C# it's an error; in long code you lose an hour finding one).

**Comments (popular exam question!)**
- Single line: `// comment` (**Ctrl + /** toggles the line) · multi-line: `/* comment */` · ⚠ HTML (not JS!): `<!-- comment -->`.
- Comments are **ignored** when the code runs. Use them to explain **why**, to **switch off** code (find which new line broke the page), to keep notes. In companies: in **English**.

**Case sensitivity.** JS is **case sensitive**: `apple` and `Apple` are **two different names**.

```javascript
let userName = "Ona";
console.log(username);  // ReferenceError (name doesn't exist — case differs)   ❗ big test Q2
"ona".toUpperCase();    // "ONA"
"ona".touppercase();    // TypeError (not a function — method names are case sensitive too)   ❗ error quiz 10-05 Q6
```

**`"use strict"`.** Write `"use strict";` at the **very top** of every JS file (my course always uses it). It turns some **silent mistakes into errors**:

- `"use strict"; total = 10;` → 🔒 **ReferenceError** (name doesn't exist) — normal mode: silently creates a global ❗ big test Q5. Not SyntaxError: the text is valid, but the **name** was never declared.
- ⚠ Slides: backticks also work (`` `use strict` ``) — **wrong**, silently ignored (checked). Only `"use strict"` / `'use strict'`.
- Modules (`"type": "module"`) and classes are always strict. All 🔒 differences: [[types-learned]] section 13.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `// …` | `/* … */` | one line vs many lines |
| JS `/* */` | HTML `<!-- -->` | comment in `.js` vs in `.html` |
| `userName` | `username` | two different names |
| `"use strict"` (strict **mode**) | `===` (strict **equality**) | rules for the whole file vs one operator — not related |

## 4. Variables and scope

A **variable** (*kintamasis*) = a named **box** in memory that holds a value; the name is its address.

- **Declare** (= create): `let message;` → value `undefined` (no error).
- **Initialize** (= first value): `let message = "Labas vakaras";`
- `=` means **assign**, not "equals". Change later **without** `let`: `message = "Sveiki";`
- Declared, no value, used in maths: `let x; x = x + 1;` → `x` is **`NaN`**, no error ❗ error quiz 10-05 Q9.

**`let`, `const`, `var`**

| | `let` | `const` | `var` |
|---|---|---|---|
| Reassign later | ✅ | ❌ TypeError (const can't be changed) | ✅ |
| Value needed at creation | no | **yes**, on the same line | no |
| Scope | **block** `{ }` | **block** `{ }` | only a **function** limits it |
| Same name twice in one scope | ❌ SyntaxError (same name declared twice) | ❌ SyntaxError | ✅ allowed (dangerous) |
| Used before its line | ❌ ReferenceError (name not created yet) | ❌ ReferenceError | `undefined` (hoisting) |
| Status | ES6, use it | ES6, **use it most** | old — **don't use** |

- **Teacher's rule** (10-01, 10-02): companies write almost everything with **`const`**. Not sure → `const`; red in the editor because the value must change → `let`. `var` only "if you want problems".
- ⚠ Slides: a `const` value "can't be changed". Exactly: the **name** can't get a new value; the **contents** of a `const` array/object can (`const arr = []; arr.push(1)` ✅) → [[types-learned]] section 6.
- The error cases (all three error types: [[types-learned]] sections 9–11):

```javascript
const rate = 0.21;
rate = 0.25;            // TypeError (const can't be changed) — the name EXISTS   ❗ big test Q9
const max = 10;
max++;                  // TypeError (const can't be changed) — ++ is a change   ❗ re-quiz 10-05 Q3
let city = "Vilnius";
let city = "Kaunas";    // SyntaxError (same name declared twice) — NOTHING in the file runs   ❗ big test Q36, re-quiz Q5
```

**Scope = where a variable is visible**
- **Block scope**: `let`/`const` made inside `{ }` (an `if`, a loop) exist **only inside** it. Outside → ReferenceError (name doesn't exist).
- **Global scope**: a variable outside all braces is visible everywhere, also inside blocks — so a block can **change** it.
- **Same name inside a block** = a **new, separate** variable ("its own little house"); outside you still see the outer one (Kahoot trap).
- **`var` ignores blocks** (only functions stop it) → overwrites the outer one, and lives on after a loop.

```javascript
let greeting = "say Hi";
if (true) {
  let greeting = "say Hello instead";   // new variable, only in this block
  console.log(greeting);                // say Hello instead
}
console.log(greeting);                  // say Hi — outer one unchanged
let msg = "Hello";
if (true) { msg = "new message"; }      // no let → changes the OUTER variable
console.log(msg);                       // new message
for (var i = 0; i < 3; i++) {}
console.log(i);                         // 3 — var i still lives after the loop
for (let j = 0; j < 3; j++) {}
console.log(j);                         // ReferenceError (name exists only inside the loop)
```

**Hoisting (interview topic)**
- `var` before its line → **`undefined`** (JS "lifts" the declaration to the top); `let` / `const` → **ReferenceError** (name not created yet).
- `function f() {}` declarations **can** be called before their line; `const f = () => {}` can't.

```javascript
console.log(score);     // ReferenceError (name not created yet) — NOT undefined   ❗ error quiz 10-05 Q3
let score = 3;
double(4);              // 8 — a function declaration works early
triple(4);              // ReferenceError (name not created yet)   ❗ big test Q38
function double(n) { return n * 2; }
const triple = (n) => n * 3;
```

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| declare `let a;` | initialize `let a = 5;` | value `undefined` vs first value given |
| `let` / `const` | `var` | block scope, no redeclare, error before the line vs function scope, redeclare OK, `undefined` |
| `let x` inside a block | `x = …` inside a block | new separate variable vs changes the outer one |
| `const` reassigned | name never declared | TypeError (name exists) vs ReferenceError (name doesn't exist) |

## 5. Naming rules

**Exam requirement: meaningful names** (plus arrow functions preferred).

- **Meaningful**: `lunchCostPerStudent`, `numberOfLessonsOnMonday` — not `a`, `b`, `x` (a name from one file may be used in 1000 others). Short but clear is fine in small tasks (`monday`).
- **camelCase**: first word lower case, every next word starts with a capital: `totalPrice`.
- Allowed: letters, digits, `$`, `_`. **Can't start with a digit.** **No hyphens** (`-` = minus); separator → `_`.
- Some words are **reserved** by JS → avoid them. ⚠ The lesson's example `name` isn't a reserved word — it's a browser global, so VS Code strikes it through. Avoid it anyway (`userName`).
- Non-Latin letters (`ą`, `š`) work, but use English letters. Project-wide constants (colors, sizes) often in **UPPER_CASE**: `MAX_SIZE`; local `const` → camelCase.
- One variable per line (`let user;` `let age;`), not `let user, age, message;`.
- Checked: `totalPrice`, `$price`, `_count` ✅ · `let 1price`, `let total-price` → SyntaxError.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `totalPrice` | `total-price` | ✅ vs SyntaxError (minus) |
| `MAX_SIZE` | `maxSize` | project-wide constant vs normal variable |
| `price1` | `1price` | ✅ vs SyntaxError |

## 6. Browser input and output

`prompt`, `alert`, `confirm` work **only in the browser** — with them, the code won't run with `node`. Open with **Go Live**, look in the browser console.

| Declaration | Shows | Returns |
|---|---|---|
| `alert(message)` | popup with **OK** | nothing (`undefined`) |
| `prompt(message, default?)` | popup with an input field | typed text — **always a string**; **Cancel → `null`** |
| `confirm(message)` | popup with **OK / Cancel** | **`true` / `false`** — never `null` ❗ big test Q28 |

**`prompt`:**
- **Save the answer** in a variable, or it's lost.
- Input is **always text**: typed `10` arrives as `"10"` → convert before maths, or `+` joins: `"5" + 6` → `"56"`, but `+"5" + 6` → `11` (`+` in front converts to a number).
- Course way: `const lessons = +prompt("Kiek pamokų?");`. Conversion and Cancel traps: [[types-learned]] section 7.
- **Default value**: `prompt("How old are you?", 100)` — used if the user leaves the field empty.
- Tip: first **hard-code** the task's example numbers, check in the console, switch to `prompt` at the end. Exam: "take data from the user" = **`prompt`**.

**`confirm`:** yes/no questions ("Delete this file?", "Are you 18?") → check the answer with `if`.

**Output to the page:** HTML element with an **id** (`<p id="result"></p>`), then in JS: `` document.getElementById("result").innerHTML = `<h1>${total}</h1>`; `` (HTML tags work in `innerHTML`).

- Page shows `[object Object]` → you put a whole object there, not one property.
- Good practice: one function **calculates and returns**, another **displays**. More: [[dom-learned]].

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `prompt` Cancel | `confirm` Cancel | `null` vs `false` ❗ |
| `prompt(…)` → `"10"` | `+prompt(…)` → `10` | string vs number |
| `alert(x)` / `innerHTML = x` | `console.log(x)` | the user sees it vs only the developer console |

## 7. Operators

**Arithmetic**
- `+` `-` `*` `/` (`5 / 3` → `1.6666666666666667`) · `%` **remainder** (`5 % 3` → `2`) · `**` power, **ES2016** (`5 ** 2` → `25`; ES6: `Math.pow(5, 2)`).
- `%`: **even** → `n % 2 === 0`, otherwise odd. Divisible by 5 → `n % 5 === 0`. Compare the remainder with `0`, not `1`: `-3 % 2` → `-1` (lesson 02 notes).
- `+` with a string **joins** (`"5" + 1` → `"51"`) → [[types-learned]] section 7 (❗ big test Q16).

**Increment / decrement `++` `--` (favourite exam question).** `a++` (postfix) gives the **old** value, then adds 1 · `++a` (prefix) adds first, gives the **new** value. Same for `--`.

```javascript
let a = 3;
console.log(a++);   // 3 — old value printed, then a = 4
console.log(++a);   // 5 — increased first, then printed
let p = 5;
let q = p++;        // q = 5 (old), p = 6
let r = ++p;        // p = 7, r = 7   → p q r = 7 5 7   ❗ big test Q22
```

**Assignment, comparison, logical**
- **Shorthands**: `a += 5` = `a = a + 5`; also `-=`, `*=`, `/=`. While learning, the long form may be clearer.
- **Comparison** → `true`/`false`: `==` / `!=` loose (`3 == "3"` → `true`) · `===` / `!==` strict, value **and** type (`3 === "3"` → `false`) — **always use these** · `>` `<` `>=` `<=` as in maths. `==` traps (❗ Q20): [[types-learned]] section 8.
- **Logical**: `&&` AND = **all** true · `||` OR = **at least one** true ("one player scores, the team wins") · `!` NOT flips. With `age = 20`: `age > 18 && age < 50` → `true` · `age === 18 || age === 50` → `false`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `=` | `==` / `===` | assigns vs compares |
| `==` | `===` | converts first vs no conversion |
| `a++` | `++a` | gives the old value vs the new value ❗ |
| `/` | `%` | quotient vs remainder |
| `**` (ES2016) | `Math.pow(a, b)` (ES6) | same result |
| `&&` | `\|\|` | all true vs at least one true |

## 8. Math object

`Math` = a built-in object with ready maths methods: `Math.` + name. **Don't memorize all** — know it exists, look it up in the **documentation** (MDN, W3Schools). ⚠ The lesson calls it a "class"; it's one ready **object**.

**Rounding** — all four return a **number**:

| Declaration | Does | `2.1` | `2.5` | `-1.5` | `-2.5` |
|---|---|---|---|---|---|
| `Math.floor(x)` | round **down** | `2` | `2` | `-2` | `-3` |
| `Math.ceil(x)` | round **up** — any fraction goes up ❗ big test Q26 | **`3`** | `3` | `-1` | `-2` |
| `Math.round(x)` | normal rounding (`.5` → up) | `2` | `3` | `-1` | `-2` |
| `Math.trunc(x)` (ES6) | cut off the decimals | `2` | `2` | `-1` | `-2` |

- `Math.max(v1, v2, …)` / `Math.min(v1, v2, …)` → biggest / smallest: `Math.max(1, 7, 3)` → `7`, `Math.min(4, -6, 2)` → `-6`.
- `Math.PI` → `3.141592653589793` (property, no `()`) · `Math.pow(base, exp)` → `base ** exp` (`Math.pow(5, 2)` → `25`) · `Math.sqrt(x)` → square root (`Math.sqrt(25)` → `5`).
- `Math.random()` → random number 0 … **less than 1** (never `1`) · `num.toFixed(digits)` → **string** (`(10 / 3).toFixed(2)` → `"3.33"`).
- In tasks: how many **full** trips → `floor`; how many **boxes** needed (0.1 box is still a box) → `ceil`.
- Non-number input → `NaN`. Methods can be nested: `Math.floor(Math.random() * 10)` → whole number 0–9.

**Random whole number in a range:** `Math.random()` gives 0 … <1 → **stretch** (× width), **shift** (+ min), **floor**:

```javascript
const n = Math.floor(Math.random() * (max - min + 1)) + min;   // min … max, BOTH included
// dice: min = 1, max = 6 → 1 … 6 (checked 100 000 times)
```

⚠ The lesson example used `* (max - min)` without `+ 1` → `max` is **never reached** (dice → only 1 … 5).

**`toFixed` → string:** for **display** (money). Convert back with `+` before calculating further. `5.toFixed(1)` → SyntaxError (dot read as a decimal point) → `(5).toFixed(1)` → `"5.0"` (lesson 02 notes). Decimals not exact (`0.1 + 0.2`): [[types-learned]] section 2.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `Math.ceil(2.1)` | `Math.round(2.1)` | `3` (always up) vs `2` (nearest) ❗ |
| `Math.floor(-1.5)` | `Math.trunc(-1.5)` | `-2` (down) vs `-1` (cut) |
| `toFixed(2)` | `Math.round(x)` | string vs number |
| `* (max - min)` | `* (max - min + 1)` | max never reached vs max included |

## Recall from memory (answer, then check)

1. Two places where JS runs? How do you run `task1.js` in each?
2. Why `defer`? Where else can the `<script>` tag go?
3. The two kinds of JS comments? Which comment is HTML's?
4. `let userName = "Ona"; console.log(username);` — result?
5. `"use strict"; total = 10;` — which error, and why not SyntaxError?
6. `let` vs `const` vs `var`: scope, reassign, used before its line?
7. `console.log(i)` after `for (var i = 0; i < 3; i++) {}` — result? And with `let i`?
8. `prompt` Cancel? `confirm` Cancel? What type does `prompt` return when you type `25`?
9. `let a = 5; let b = a++; let c = ++a;` → `a, b, c`? `Math.ceil(2.1)`? Random whole number from min to max?

<details><summary>Answers</summary>

1. Browser: HTML page with `<script src="task1.js" defer>`, opened with Live Server (Go Live). Node: `node task1.js` in the terminal.
2. The script must run after the HTML elements exist; `defer` waits until the page is loaded. Without `defer`: at the end of `<body>`.
3. `// one line` and `/* many lines */`. HTML: `<!-- -->`.
4. ReferenceError (name doesn't exist — `username` ≠ `userName`).
5. ReferenceError — the text is valid; the name was never declared, and strict mode doesn't create it.
6. `let`: block, can reassign, ReferenceError before its line. `const`: block, can't reassign (TypeError), needs a value at once, ReferenceError before its line. `var`: function scope, reassign and redeclare OK, `undefined` before its line.
7. `3` (`var` lives after the loop). With `let`: ReferenceError (name exists only inside the loop).
8. `null`; `false`; string `"25"`.
9. `7 5 7`; `3`; `Math.floor(Math.random() * (max - min + 1)) + min`.

</details>
