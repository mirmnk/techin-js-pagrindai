# Control flow (if, ternary, switch, loops): everything from the course

Sources: lessons 3 (if / switch, 2026-09-10) and 5 (loops, 2026-09-16), reviews 09-17 / 09-21, Kahoot review (lesson 12, 10-01), exam prep (lesson 13, 10-02); slides `3d_if, switch`, `5_ciklai`; wiki pages `conditionals-if-switch-ternary`, `loops`; lesson notes 03, 05, 12, 13; **my quiz results** ([[quiz-log]]: big test Q29 ❗, Q33, Q39–Q43). Short version: [[control-flow-cheatsheet]].

**Legend:** `name(arg?)` → return value (`?` = optional) · ❗ = I got this wrong in a quiz (quiz + question) · 📘 = not taught in the course, kept only because it helps to understand course material · ⚠ = mistake in a slide / lesson · 🔒 = differs in strict mode · ES2016+ features are tagged (course = ES6) with the ES6 alternative.

**Every value is checked in Node** (2026-10-05). All examples assume `"use strict"` (my course always uses it).

**Contents:** 0 Big picture · 1 `if` · 2 Ternary · 3 `switch` · 4 Which loop · 5 `for` + tracing on paper · 6 `while`, `do...while` · 7 Loops and arrays, `of` / `in` · 8 `break` / `continue` · 9 Nested loops · 10 Scope, infinite loops · recall

## Statements and helpers used (declarations)

| Declaration | Returns | Changes anything? |
|---|---|---|
| `if (cond) {…} else {…}` · `switch (value) { case x: … break; default: … }` | nothing (just runs code) | — |
| `cond ? valueIfTrue : valueIfFalse` | **a value** | — |
| `for (start; condition; change) {…}` · `while (cond) {…}` · `do {…} while (cond);` | nothing | — |
| `for (const item of array)` (ES6) / `for (const key in object)` | nothing — values / **keys (strings)** | — |
| `prompt(message, default?)` | **string** / `null` (Cancel) | no |
| `new Date().getDay()` | number **0–6**, 0 = Sunday | no |
| `arr.entries()` (ES6) / `Object.entries(obj)` (**ES2017**) | `[index, value]` iterator / `[key, value]` array — ES6 for objects: `for...in` + `obj[key]` | no |

---

## 0. The big picture

- Without control flow, code runs **line by line**, once. **Conditions** (*sąlygos sakiniai*): written, but **not everything runs**. **Loops** (*ciklai*): the same code runs **many times**. Teacher's priority: you can survive without array methods, **not without loops — understand `for` at least.**

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| condition | loop | block runs 0 or 1 time vs 0, 1 or many times |

---

## 1. `if` / `else if` / `else`

```javascript
const year = Number(prompt("When was ES6 released?"));   // prompt → string, convert first
if (year === 2015) {
  alert("You're right!");
} else if (year === 2014 || year === 2016) {
  alert("Close!");
} else {
  alert("Wrong");          // all other cases
}
```

- ⚠ The slide compares the `prompt` text with `==`. Course rule: **convert** (`Number` / `+`), then `===`.
- The condition must answer **yes/no**. Checked **top to bottom**; the **first true** block runs, the rest are **skipped**. `else` is optional (good practice to end with it). `if`s can be **nested**.
- Always write **braces** `{ }`, even for one line (teacher's rule: fewer mistakes).
- Combine conditions: `if (a > 0 && a <= 10)` — **between** = `&&` (both true); **outside** = `||` (one is enough).
- **Order matters**: a wider test first "eats" the cases of a narrower one (`score >= 50` before `score >= 90` → 95 gives "pass"). Put the narrowest test first.
- **Truthiness**: the condition is tested like `Boolean(value)`, not changed (list: [[types-learned]] section 4). `if ("hello")`, `if ([])` run; `if (0)` doesn't. `&&` / `||` return one of the **original values** (`"a" && "b"` → `"b"`, `0 || "x"` → `"x"`); only the final test converts → `if ("a" && 0)` is skipped. Same test in `while`, `for`, ternary, `!`. `if (x)` is **not** `x == true`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `else if` chain | separate `if`s | only the **first** true block vs **every** true block |
| `&&` | `\|\|` | between (both) vs outside (one is enough) |

---

## 2. Ternary `? :` — returns a value (big test Q33)

```javascript
const kind = 7 % 2 === 0 ? "even" : "odd";    // "odd"
0 ? "a" : "b";                                // "b" — truthy/falsy test, like if
const age = 70;
const group = age < 18 ? "child" : age < 65 ? "adult" : "senior";   // "senior"
```

- `condition ? valueIfTrue : valueIfFalse` = short `if/else` that **returns a value**. Ternary or `if`? Programmer's choice. Ternary: one value for true, one for false. Several steps per branch → `if`. Used a lot in React.
- **Nested** ternaries work but get unreadable; readability matters more than short code. **Exams love tricky ternaries** — read slowly, like an `else if` chain.
- 📘 Inside a bigger expression wrap it in brackets: `"Hi " + (name ? name : "guest")`. Why it matters for tricky exam ternaries: `+` runs **before** `? :`, so `"Hi " + name ? name : "guest"` tests `"Hi " + name` (always truthy) — with `name = ""` the result is `""`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `c ? a : b` | `if (c) {…} else {…}` | returns a value vs only runs code |

---

## 3. `switch` — strict equality, jumps to a case

- Compares the value with each `case` using **`===`** — no conversion, **no truthy/falsy**: `switch ("2")` doesn't match `case 2`, `switch (0)` doesn't match `case false`, `NaN` never matches.
- `default` runs when nothing matches (good practice). Shorter than `if` for **many fixed values**: weekday `0`–`6` from `new Date().getDay()` (0 = Sunday), days of a month.

### Fall-through ❗ big test Q29

`switch` **jumps** to the matching `case` and **starts there**. Then it runs **down through all next cases** until `break`, `return` or the end:

```javascript
const day = 2;
switch (day) {
  case 1: console.log("Mon");
  case 2: console.log("Tue");    // starts HERE
  case 3: console.log("Wed");    // no break → runs too
  default: console.log("?");     // runs too
}
// Tue  Wed  ?      (NOT "Mon Tue Wed ?" — cases above the match never run)
```

- With `break` after each case → only `Tue`. **Always write `break`**, unless you stack cases on purpose.
- **Stacked cases**: `case 6: case 0: text = "Weekend"; break;` → 6 **or** 0 run the same code.
- `break` leaves the `switch`; `return` (in a function) leaves the switch **and** the function → no `break` needed after it.

### Ranges: `switch (true)`; `case` is computed at run time

```javascript
const t = 20;
switch (true) {
  case t < 0:   console.log("freezing"); break;
  case t <= 15: console.log("cool"); break;
  case t > 15:  console.log("warm"); break;   // true === true → "warm"
}
switch (t) {
  case t > 15: console.log("warm"); break;     // NEVER matches: number 20 === boolean true is false
  default: console.log("default");             // runs → for ranges write switch (true)
}
```

- In `switch (true)` each case must give a **real boolean**: `case "a":` never matches (truthy isn't enough).
- A JS `case` can be **any expression** (variable, calculation, comparison), computed at run time. In **C#** a `case` must be a **constant**.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `switch` | `if` | `===` against values vs truthy/falsy test |
| `case` without `break` | with `break` | falls into the next cases vs stops |
| `break` | `return` | leaves the switch vs leaves the whole function |
| JS `case` | C# `case` | any run-time expression vs constant |

---

## 4. Loops: which one when (big test Q43, Kahoot 10-01)

| Loop | Use when | Example |
|---|---|---|
| `for` | number of rounds **known** | 0 → 100, the whole array (`length`) |
| `while` | number **unknown** | repeat until the user types 0 |
| `do...while` | at least **once**, check after | roll a die until 6, ask for a password |
| `for...of` (ES6) | array **values** | "for every fruit **of** fruits" |
| `for...in` | object **keys** | then `obj[key]` for the value |

Anything written with `for` can be written with `while` — the difference is which one is **natural**.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `for` | `while` | known count, 3 parts in one line vs unknown count, change written in the body |
| `while` | `do...while` | may run **0** times vs always **at least 1** |

---

## 5. `for` — anatomy and tracing on paper

`for (let i = 0; i < 10; i++) { … }` = **start** (the counter, almost always `i`) · **condition** (how long to continue) · **change** (moves toward the end: `i++`, `i--`, `i += 5`; missing → infinite loop). **Order:** start → condition → `true`? → body → **only then** change → condition → … → `false` → continue after the loop.

- The three parts are separated by **semicolons**, not commas (a common error). Counting down: `for (let i = 100; i > 0; i--)`.
- ⚠ Sum of 1…100 is **5050** (the lesson said 5500; the slide's own output shows 5050).

### Tracing on paper (teacher's method)

The exam has paper-and-pencil code questions. Table: **one column per variable + the condition**, **one row per round**; stop at the first `false`.

```javascript
let total = 0;
for (let i = 1; i <= 5; i += 2) { total += i * 10; }   // total → 90
```

| Round | `i` | `i <= 5`? | `total` after the body |
|---|---|---|---|
| 1 | 1 | true | 10 |
| 2 | 3 | true | 40 |
| 3 | 5 | true | 90 |
| — | 7 | **false** → exit | 90 |

### How the teacher breaks down a loop task

1. A sum needs a variable **outside, above** the loop that starts at `0` ("nothing counted yet"). Count known → `for`.
2. Start the counter at the first given number; "inclusive" → `<=`, not `<`. Inside: `sum += i`; `return` the sum after the loop.
3. **Trace** on paper with the example input (`i` and `sum` per round). Edge case noticed (numbers in reverse order)? Add a guard first, show a message.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `i < 5` | `i <= 5` | stops before 5 vs includes 5 |
| `;` in `for ( )` | `,` | correct vs error |

---

## 6. `while` and `do...while`

```javascript
let k = 1;
while (k <= 3) { console.log(`while: ${k}`); k++; }          // while: 1, 2, 3 — forget k++ → infinite loop
let j = 5;
do { console.log(`do while: ${j}`); j++; } while (j <= 3);   // "do while: 5" ONCE, although 5 <= 3 is false
```

- `while`: check → run → check … may run **0** times. `do...while`: run first, check after → **at least once** (big test Q39, Kahoot). Something inside **must change**, or the condition stays `true` forever.
- **Class example** (sum of positive numbers until a negative one): sum variable **above** the loop (inside it would reset every round and not be visible after the loop); ask with `prompt` once **before** the loop **and again inside** it; print the sum after the loop.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `while (false) {…}` | `do {…} while (false);` | 0 times vs 1 time |

---

## 7. Loops and arrays; `for...of` vs `for...in` (big test Q41, Q42)

```javascript
const fruits = ["apple", "pear", "plum"];
for (const fruit of fruits) {}               // values: apple, pear, plum
for (const i in fruits) { console.log(i, typeof i); }      // "0" string, "1" string, "2" string
const user = { name: "Ona", age: 20 };
for (const key in user) { console.log(key, user[key]); }   // name Ona, age 20
for (const ch of "Labas") {}                 // L, a, b, a, s
for (const v of user) {}                     // TypeError (object isn't a list) — user is not iterable
```

- **`i < length`, never `<=`**: with `<=` the last round reads `fruits[3]` → `undefined`. More: [[arrays-learned]] step 2.
- Memory trick: **in** = **i**ndexes / keys, **of** = values. `for...in` for **objects**, `for...of` for **arrays, strings**. Not `for...in` on arrays: keys are **strings** (`"0" + 1` → `"01"`).
- Use `const` for the loop variable in `of` / `in`. Index + value: `for (const [i, f] of fruits.entries())` → `0 apple`, `1 pear`, …
- Object values with `for...of`: `for (const [key, value] of Object.entries(user))` (**ES2017**; ES6: `for...in` + `user[key]`).
- ⚠ The lesson said both arrived in 2015: `for...of` is ES6, `for...in` is much older.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `i < arr.length` | `i <= arr.length` | correct vs extra round with `undefined` |
| `for...of` on an array | on a plain object | values vs TypeError (not iterable) |

---

## 8. `break` and `continue` (big test Q40, Kahoot 10-01)

- **`break`** — stops the loop **completely**; the code after the loop runs. **`continue`** — skips the **rest of this round**, goes to the next one.
- Work in all 5 loops. **Not** in `forEach`: `break` → SyntaxError, `return` only skips one item ([[arrays-learned]] step 2).
- `return` inside a loop in a function → leaves the **whole function**. `while` + `continue`: change the counter **before** `continue`, otherwise the loop never ends.

```javascript
let r = 0;
for (let i = 1; i <= 6; i++) {
  if (i % 2 === 0) continue;   // skip even
  if (i > 4) break;            // stop completely
  r += i;
}                              // r → 4
```

Trace: `i` 1 → `r` 1 · 2 skipped · 3 → `r` 4 · 4 skipped · 5 → `break`. Result `4`.

- 📘 `break` inside a `switch` inside a loop leaves **only the switch** — the loop goes on. Why it matters: `break` belongs to both `switch` and loops (both taught), so in a trace you must know which one it stops.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `break` | `continue` | stop the loop vs skip one round |
| `break` in a loop | `return` in a loop | leaves the loop vs leaves the function |

---

## 9. Nested loops

A loop inside a loop: for **every** round of the outer loop, the inner loop runs **completely**. Get comfortable with one loop first; drawing shapes row by row and comparing lists use this.

```javascript
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= i; j++) { console.log(`${i}-${j}`); }   // inner end depends on i → i times
}
// 1-1 | 2-1 2-2 | 3-1 3-2 3-3     → 1 + 2 + 3 = 6 inner rounds
```

- Fixed ends: outer 3 × inner 4 → **12** inner rounds. Counters: `i` outer, `j` inner, then `k`. `break` / `continue` affect only the **innermost** loop (lesson notes: label `outer:` + `break outer;` leaves both).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| inner `j <= 4` | inner `j <= i` | always 4 rounds vs `i` rounds |

---

## 10. Loop variable scope and infinite loops

```javascript
for (let i = 0; i < 3; i++) {}
console.log(i);   // ReferenceError (name exists only inside the loop)
for (var v = 0; v < 3; v++) {}
console.log(v);   // 3 — var has function scope, not block scope; the final value
let y = 1; if (true) { let y = 2; }
console.log(y);   // 1 — the inner y was a NEW block variable (big test Q6, Kahoot 10-01)
```

- `let` / `const` = **block** scope (`{ }` of `if`, loops). `var` = **function** scope (big test Q8). Course: use `let` / `const`.
- 🔒 `for (i = 0; i < 3; i++)` without `let`: strict → ReferenceError (name doesn't exist); normal mode → creates a global `i`.
- **Infinite loop** = the condition never becomes `false` → the computer spins forever. Causes: no change step, change in the wrong direction, `prompt` not repeated inside the `while`, `continue` before the change in a `while`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `i` after `for (let i…)` | `v` after `for (var v…)` | ReferenceError vs last value (`3`) |
| `let` inside `if` | outer `let` with the same name | new block variable vs untouched |

---

## Recall from memory (answer, then check)

1. In an `if` / `else if` chain, how many blocks can run? Why must the narrowest test come first?
2. `0 ? "a" : "b"` and `"a" && 0` — results?
3. `switch (2)` with `case 1`, `case 2`, `case 3`, `default`, one `console.log` each, no `break` — what is printed?
4. `const t = 20; switch (t) { case t > 15: … }` — does it match? What do you write instead?
5. `for (let i = 1; i <= 7; i += 3)` — values of `i` in the body? Value that ends the loop?
6. `let c = 0; do { c++; } while (c > 5);` — `c`? And with `while (c > 5) { c++; }`?
7. `for (const i in ["a", "b"])` — what is `i`? `for (const v of { a: 1 })`?
8. `for (let i = 0; i < 3; i++) {}` then `console.log(i)`? The same with `var`?

<details><summary>Answers</summary>

1. Only **one** (the first true). A wider test first "eats" the narrower one's cases (`>= 50` before `>= 90`).
2. `"b"` and `0`.
3. The `case 2`, `case 3` and `default` logs — it **starts** at the match and falls through; `case 1` never runs.
4. No — `20 === true` is `false` → `default`. Write `switch (true)`.
5. `1`, `4`, `7`; the loop ends when `i` is `10`.
6. `1` (runs once). With `while`: `0` (never runs).
7. `"0"`, `"1"` (strings). TypeError (object isn't a list — not iterable).
8. ReferenceError (name exists only inside the loop). With `var`: `3`.

</details>
