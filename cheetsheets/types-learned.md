# JS types and errors: everything from the course

Sources: course lessons 2026-09-07 → 10-02 (slides + recordings, wiki pages `data-types`, `implicit-type-conversion`, `strict-vs-loose-equality`, `truthy-and-falsy`, `reference-vs-value`, `optional-chaining`, `operators`, `math-object`, `browser-input-output`, `variables-let-const-var`), lesson-02 notes, Claude chat study sessions 2026-10-03 → 10-05, and **my quiz mistakes** ([[quiz-log]]). Short version: [[types-cheatsheet]].

**Legend:** `name(arg?)` → return value (`?` = optional) · ❗ = I got this wrong in a quiz (quiz + question) · 📘 = from the books, not taught in the course · ES2016+ features are tagged (course = ES6) with the ES6 alternative.

**Every value is checked in Node** (2026-10-05).

**Strict mode or not?** ⭐ **My course always uses `"use strict"`** → for my code and my quizzes, the **Strict mode** column below is the one that applies. **Almost everything behaves the same in both modes.** Only **6 things** differ; each is marked 🔒 (both results shown) and listed together in section 13. A plain browser `<script>` without the line is normal mode:

| 🔒 Code | Normal mode (default) | Strict mode |
|---|---|---|
| `total = 10` (never declared) | creates a global, no error | ReferenceError (name doesn't exist) |
| `s[0] = "X"` on a string | ignored, no error | TypeError (string is read-only) |
| `s.age = 88` on a string | ignored (`s.age` → `undefined`) | TypeError (string is read-only) |
| `NaN = 1`, `undefined = 1` | ignored | TypeError (built-in value is read-only) |
| `function f(a, a) {}` | allowed | SyntaxError (duplicate parameter) |
| `this` in a plain function call | `window` | `undefined` |

⚠ "**Strict** equality" (`===`) has **nothing** to do with strict **mode** — it's just the name of the operator.

**Contents:** 0 Value or error? · 1 Types & `typeof` · 2 number · 3 string · 4 boolean, truthy/falsy · 5 undefined vs null · 6 objects: reference vs value · 7 conversion · 8 equality · 9 Which error? · 10 SyntaxError · 11 ReferenceError · 12 TypeError · 13 `"use strict"` · 14 📘 RangeError, try/catch · 15 return values · 16 my mistakes · 17 recall

---

## 0. The big picture: value or error?

JavaScript was built to be "friendly": the first version had **no exceptions at all** (`try/catch` came in ES3). That's why most wrong operations **don't stop the program** — they quietly give a strange **value**:

| Wrong operation | JS gives a value (no error) |
|---|---|
| read a missing property / index | `undefined` |
| maths with text or `undefined` | `NaN` |
| divide by 0 | `Infinity` |
| `+` with a string | joined text (`"1" + 2` → `"12"`) |
| compare different types with `==` | `true`/`false` after conversion |
| change a string (`s[0] = "X"`) | ignored (🔒 strict mode: TypeError) |

An **error (exception)** happens only in a **short list** of situations — learn the list (sections 9–12), and everything else is "a value, no error".

| Error | When | Does anything run? |
|---|---|---|
| `SyntaxError` | the code can't be **read** (broken grammar, same name declared twice) | **nothing** — not even line 1 |
| `ReferenceError` | a **name** doesn't exist (yet) | yes, lines before it |
| `TypeError` | the name exists, but its **value** is used in a way its type doesn't allow (property of `null`/`undefined`, call a non-function, change a `const`) | yes, lines before it |
| `RangeError` 📘 | a number argument is out of the allowed range | yes, lines before it |

When an error is thrown, the program **stops at that line**; the browser console shows it in red: `Uncaught TypeError: Cannot read properties of null (reading 'x')` → **name** + **message**. The message names the exact problem; read it.

---

## 1. The types and `typeof`

JS is **dynamically typed**: you don't declare a type (`let` for everything), and a variable can hold a number now and text later (legal, but bad style).

| Group | Types | What the variable stores |
|---|---|---|
| **Primitive** (simple) | `number`, `string`, `boolean`, `undefined`, `null`, `bigint`, `symbol` | the value itself; **can't be changed** (immutable) |
| **Object** (structural) | objects `{}`, arrays `[]`, functions, dates | a **reference** (address) to the data; contents **can** change |

Most used in tasks: **number, string, boolean**. `bigint` (ES2020, `123n`) and `symbol` exist but aren't needed in the course.

### `typeof value` → string

| Value | `typeof` | Trap |
|---|---|---|
| `"text"`, `""`, `"25"` | `"string"` | digits in quotes are text |
| `5`, `0.5`, `NaN`, `Infinity` | `"number"` | `NaN` **is** a number |
| `true` / `false` | `"boolean"` | |
| `undefined`, `let a;` (no value) | `"undefined"` | `typeof neverDeclared` → `"undefined"` too — `typeof` never throws |
| `null` | `"object"` ⚠ | old JS bug ❗ big test Q10 |
| `[]`, `{}`, `new Date()` | `"object"` | can't tell an array from an object |
| `function f() {}`, `() => {}` | `"function"` ⚠ | the only object with its own answer ❗ big test Q13 |
| `10n` | `"bigint"` | |

`typeof` always returns a **string**: `typeof typeof 5` → `"string"`. Two forms: `typeof x` and `typeof(x)`.

### Checking a type correctly (declarations)

| Declaration | Returns | Use for |
|---|---|---|
| `x === null` | boolean | null (not `typeof`) |
| `Array.isArray(value)` | boolean | array (static: on `Array`) |
| `Number.isNaN(value)` (ES6) | boolean, **no conversion** | the real `NaN` (`x === NaN` is always `false`) |
| `Number.isInteger(value)` (ES6) | boolean, no conversion | whole number (`false` for `NaN`, `Infinity`, `"7"`) |
| `Number.isFinite(value)` (ES6) | boolean, no conversion | any real number (`false` for `NaN`, `±Infinity`) |
| `isNaN(value)` (global, old) | boolean, **converts first** | ⚠ `isNaN("abc")` → `true`, `isNaN("")` → `false` |

"Is it …?" checks are **static** (on `Number` / `Array`), because they must also work on non-numbers: `(7).isInteger()` → **TypeError** (not a function — numbers don't have `isInteger`).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `typeof null` | `x === null` | `"object"` (bug) vs the correct null check |
| `typeof []` | `Array.isArray([])` | `"object"` vs `true` |
| `isNaN("abc")` | `Number.isNaN("abc")` | `true` (converts) vs `false` (only the real `NaN`) |
| `Number.isInteger(n)` | `n.isInteger()` | ✅ vs TypeError (not a function — not a method of numbers) |
| primitive | object | value copied, immutable vs reference shared, mutable |

---

## 2. `number`

- **One type** for whole numbers and decimals: `5 / 2` → `2.5` (not `2` like in C#/Java). Round yourself.
- `Infinity`: `3 / 0` → `Infinity`, `-3 / 0` → `-Infinity` (no error!).
- `NaN` (*Not a Number*): result of a failed number operation, `"labas" / 4` → `NaN`. Not an error — a **warning sign**. `NaN` **spreads**: every calculation with it gives `NaN`. `NaN === NaN` → `false` (never equal to anything).
- Decimals aren't exact (binary): `0.1 + 0.2` → `0.30000000000000004`, so `0.1 + 0.2 === 0.3` → `false` ❗ big test Q18. Display: `toFixed(2)`; compare: `Math.abs(a - b) < Number.EPSILON` (ES6).
- 📘 Whole numbers are exact only up to `Number.MAX_SAFE_INTEGER` (9 007 199 254 740 991): `MAX + 1 === MAX + 2` → `true`. Bigger → `bigint` (`10n`); `1n + 1` → **TypeError** (bigint and number don't mix).

### Number functions (declarations)

| Declaration | Returns | Notes |
|---|---|---|
| `num.toFixed(digits)` | **string** | `(10 / 3).toFixed(2)` → `"3.33"`; digits 0–100, else 📘 RangeError |
| `Math.round(x)` | number | nearest, `.5` → up (`-2.5` → `-2`) |
| `Math.floor(x)` | number | down (`-2.5` → `-3`) |
| `Math.ceil(x)` | number | **up**, any fraction (`2.1` → `3`) ❗ big test Q26 |
| `Math.trunc(x)` (ES6) | number | cut decimals (`-2.9` → `-2`) |
| `Math.max(v1, …)` / `Math.min(v1, …)` | number | `Math.max(...arr)`; `Math.max(arr)` → `NaN` |
| `Math.random()` | number 0 … <1 | `Math.floor(Math.random() * (max - min + 1)) + min` = whole number min…max |

| Function | `2.1` | `2.5` | `-2.5` | `-2.9` |
|---|---|---|---|---|
| `Math.floor` | `2` | `2` | `-3` | `-3` |
| `Math.ceil` | `3` | `3` | `-2` | `-2` |
| `Math.round` | `2` | `3` | `-2` | `-3` |
| `Math.trunc` | `2` | `2` | `-2` | `-2` |

### Arithmetic operators

- `%` = remainder, keeps the sign of the **left** number: `10 % 3` → `1`, `-7 % 2` → `-1` → odd check `n % 2 !== 0` (not `=== 1`).
- `**` = power (ES2016; ES6: `Math.pow(5, 2)`).
- `a++` gives the **old** value, then adds; `++a` adds first, gives the **new** value ❗ big test Q22:

```javascript
let a = 5;
let b = a++;   // b = 5 (old), a = 6
let c = ++a;   // a = 7, c = 7
```

- `x += 5` = `x = x + 5` (also `-=`, `*=`, `/=`).
- `5.toFixed(1)` → **SyntaxError** (dot read as a decimal point) → `(5).toFixed(1)` → `"5.0"`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `NaN` | `undefined` | a number operation failed vs nothing was assigned/returned |
| `Infinity` | error | `3 / 0` is a value, not an error |
| `toFixed(2)` | `Math.round(x)` | string vs number |
| `Math.ceil(2.1)` | `Math.round(2.1)` | `3` vs `2` |
| `a++` | `++a` | old value vs new value |
| `-7 % 2` | `7 % 2` | `-1` vs `1` |

---

## 3. `string`

- Quotes: `"…"` = `'…'`; backticks `` `…` `` = **template literal**: `${expression}` works **only** inside backticks (`"${name}"` prints `${name}` literally). Only backticks may span several lines.
- `+` joins (spaces count). Index from 0: `s[0]`, `s.charAt(0)`, last `s[s.length - 1]` (ES6) or `s.at(-1)` (ES2022).
- **Immutable**: you can never change a string ❗ big test Q52.

```javascript
const s = "labas";
s[0] = "L";               // ignored, no error   (🔒 strict mode: TypeError — string is read-only)
s.toUpperCase();          // "LABAS" — a NEW string
s;                        // "labas" — unchanged
const cap = s[0].toUpperCase() + s.slice(1);   // "Labas" — build a new one
```

- Every string method **returns a new string** → save it: `name = name.trim();` (needs `let`).
- `===` on strings compares the **characters**: `"level" === "level"` → `true` ❗ big test Q55 (arrays/objects compare by reference instead).
- 📘 `<` / `>` compare strings **alphabetically by character codes** when **both** are strings: `"11" < "3"` → `true`; `"11" < 3` → `false` (converted to numbers). Convert input first.
- A misspelled method → `TypeError` (not a function — typo): `"abc".toUoerCase()` → `"abc".toUoerCase is not a function` (classmate's mistake list).
- 📘 A property added to a primitive is lost: `let s = "Kim"; s.age = 88; s.age` → `undefined` (🔒 strict mode: TypeError (string is read-only) — `Cannot create property 'age' on string 'Kim'`).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `s[0] = "L"` | `arr[0] = "L"` | ignored (immutable; 🔒 strict: TypeError) vs changes the array |
| `"ab" === "ab"` | `[1] === [1]` | `true` (characters) vs `false` (two different arrays) |
| `s.toUpperCase()` | `arr.sort()` | returns a new string vs changes the array itself |
| `` `${x}` `` | `"${x}"` | inserts the value vs literal text |
| `"11" < "3"` | `"11" < 3` | `true` (text order) vs `false` (numbers) |

---

## 4. `boolean`, truthy and falsy

- `boolean` = `true` / `false`; comparisons produce them (`5 > 4` → `true`).
- In a **boolean context** (`if`, `while`, `? :`, `!`, `&&`, `||`) every value converts to true/false.
- **Falsy** (course list): `false`, `0`, `""`, `null`, `undefined`, `NaN` (+ 📘 `-0`, `0n`). **Everything else is truthy**, including `"0"`, `" "`, `"false"`, `[]`, `{}`, `Infinity`.
- Empty array check: `arr.length === 0`, not `if (arr)` (`[]` is truthy).
- `Boolean(x)` or `!!x` shows how a value converts.
- `if (x)` is **not** `x == true`: `[]` is truthy, but `[] == true` → `false`.

### `||`, `&&`, `??` return one of the values (📘 detail)

```javascript
"Ona" || "guest";   // "Ona"    first truthy
"" || "guest";      // "guest"
null && "x";        // null     first falsy
"a" && "b";         // "b"

const qty = 0;
qty || 10;          // 10   || replaces ANY falsy (0, "", NaN, null, undefined, false)
qty ?? 10;          // 0    ?? replaces ONLY null / undefined   ❗ big test Q31
// ?? is ES2020 — ES6 form: (qty !== null && qty !== undefined) ? qty : 10
```

- 📘 `a ?? b || c` → **SyntaxError** (?? mixed with || without brackets) → write `(a ?? b) || c`.
- The right side may never run (short-circuit): `user && user.name` doesn't touch `.name` when `user` is `null` → no TypeError.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `if (x)` | `if (x === true)` | any truthy value vs only `true` |
| `x \|\| 10` | `x ?? 10` | `0`/`""` replaced vs kept |
| `!!x` | `Boolean(x)` | same result |
| `"0"` | `0` | truthy (non-empty string) vs falsy |
| `if (arr)` | `if (arr.length)` | always true for an array vs true only when it has items |

---

## 5. `undefined` vs `null`

| | `undefined` | `null` |
|---|---|---|
| Meaning | "no value **yet** / not there" — JS gives it | "empty **on purpose**" — you (or an API) set it |
| `typeof` | `"undefined"` | `"object"` (bug) |
| In maths | `NaN` (`undefined + 5` → `NaN`) | `0` (`null + 5` → `5`) |
| `==` | `undefined == null` → `true`; `===` → `false` | `null == 0` → `false` ❗ big test Q20 |
| Both | falsy, the only 2 values with **no properties** | |

### Where `undefined` comes from (no error)

```javascript
let x;                          // declared, no value
[10, 20, 30][5];                // index out of range
({}).missing;                   // property doesn't exist
[].pop();                       // nothing to remove
[1].find(n => n > 5);           // find: no match
(function () {})();             // function without return
((a, b) => b)(1);               // missing argument
[1, 2].map(n => { n * 2 });     // [undefined, undefined]  braces, no return
const { city } = { name: "Ona" };   // destructuring a missing property
({}).missing?.x;                // ?. stops instead of throwing (ES2020)
```

### Where `null` comes from

- `prompt(...)` → Cancel; `document.getElementById("wrong")` / `querySelector` → no match; `str.match` no match 📘; you set it: `let winner = null;`.

### The chain: `undefined` first, `TypeError` later

```javascript
const user = {};
const city = user.address;    // 1. undefined (no error yet)
city.toUpperCase();           // 2. TypeError (undefined has no properties) — the program stops HERE
```

The error line is where it **crashed**, not always where the bug **is** — look back for where the `undefined`/`null` came from. One level missing = `undefined`; two levels = crash.

### `undefined` / `null` in maths

```javascript
Number(undefined);   // NaN
Number(null);        // 0
undefined + 5;       // NaN   — and NaN spoils everything after it
null + 5;            // 5
undefined + "5";     // "undefined5"  (with a string, + joins)
[3, 4, 5].reduce((acc, x) => acc + x, undefined);   // NaN  (undefined + 3 at step 1)
[3, 4, 5].reduce((acc, x) => { acc + x }, 0);       // undefined (no return → acc = undefined)
```

Result `NaN` = something was **computed** with a bad value; result `undefined` = nothing was **returned / assigned**.

### How to protect

| Situation | Fix |
|---|---|
| `prompt` can return `null` | check `input === null` **before** `.trim()` |
| property may be missing | `obj?.prop?.x` (ES2020) — ES6: `obj && obj.prop && obj.prop.x` |
| default value | `value ?? "n/a"` (ES2020) — ES6: `value !== null && value !== undefined ? value : "n/a"` |
| element may not exist | check `if (el)` / `el !== null` before `el.innerHTML = …` |
| `reduce` on a maybe-empty array | always give the start value |

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `undefined` | `null` | not there (JS) vs empty on purpose (you / Cancel / no element found) |
| declared `let a;` → `a` | never declared → `a` | `undefined` vs ReferenceError (name doesn't exist) |
| `obj.a.b` | `obj.a?.b` | `.` on `undefined` → TypeError (undefined has no properties) vs `undefined` |
| `x == null` | `x === null` | catches null **and** undefined vs only null (course rule: `===`) |
| `undefined + 5` | `null + 5` | `NaN` vs `5` |

---

## 6. Objects and arrays: reference vs value

- A variable holding an object/array stores an **address**. `const b = a` → **same** array (two names), **not** a copy. Copy: `[...a]`, `{ ...obj }` (shallow: inner objects still shared).
- `===` on objects/arrays compares **addresses**: `[1, 2] === [1, 2]` → `false`, `a === b` (same address) → `true`.
- `const` locks the **name**, not the contents: `const arr = []; arr.push(1)` ✅ · `arr = [2]` → **TypeError** (const can't be changed).
- 📘 `Object.freeze(arr)` (ES5) locks the contents: then `arr.push(2)` → **TypeError** (frozen array can't change).
- Object in text → `"[object Object]"` (you printed the whole object instead of a property).

### Dot vs brackets ❗ big test Q59

```javascript
const u = { name: "Ona", age: 30 };
const key = "age";
u[key];        // 30         uses the VALUE of the variable → u["age"]
u.key;         // undefined  looks for a property literally named "key"
u["name"];     // "Ona"      text in brackets = u.name
u.city;        // undefined  missing property — no error
u.city.name;   // TypeError (undefined has no properties)
```

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `b = a` | `b = [...a]` | same array vs copy |
| `u.key` | `u[key]` | property named `"key"` vs property named by the variable's value |
| missing property `u.city` | missing variable `city` | `undefined` vs ReferenceError (name doesn't exist) |
| `const arr` + `push` | `const arr` + `arr = […]` | ✅ vs TypeError (const can't be changed) |

---

## 7. Conversion (explicit and implicit)

### Explicit conversion (declarations)

| Declaration | Returns | Rule |
|---|---|---|
| `Number(value)` / `+value` | number / `NaN` | **whole** text must be a number; spaces trimmed; `""` → `0` |
| `parseInt(string, radix?)` | integer / `NaN` | digits from the **start**, stops at the first non-digit; `""` → `NaN` |
| `parseFloat(string)` | number / `NaN` | like `parseInt` but keeps decimals |
| `String(value)` | string | anything → text |
| `Boolean(value)` / `!!value` | boolean | falsy list → `false`, rest → `true` |

| Value | `Number(x)` | `parseInt(x)` | `String(x)` | `Boolean(x)` |
|---|---|---|---|---|
| `"7"` / `" 7 "` | `7` | `7` | — | `true` |
| `""` | `0` ⚠ | `NaN` | `""` | `false` |
| `"12px"` | `NaN` | `12` ⚠ | — | `true` |
| `"3.7kg"` | `NaN` | `3` | — | `true` |
| `"1e3"` | `1000` | `1` | — | `true` |
| `"abc"` | `NaN` | `NaN` | — | `true` |
| `"0"` | `0` | `0` | — | **`true`** |
| `null` | `0` | `NaN` | `"null"` | `false` |
| `undefined` | `NaN` | `NaN` | `"undefined"` | `false` |
| `true` / `false` | `1` / `0` | `NaN` | `"true"` | — |
| `[]` 📘 | `0` | `NaN` | `""` | **`true`** |
| `[1, 2]` 📘 | `NaN` | `1` | `"1,2"` | `true` |
| `{}` | `NaN` | `NaN` | `"[object Object]"` | `true` |

For input validation: `Number` / `+` (rejects bad input) — `parseInt` hides bad input (`"12px"` → `12`). `prompt` always returns a **string** (or `null`) → convert before maths.

### Implicit conversion (JS converts by itself)

| Operator | What happens | Example |
|---|---|---|
| `+` with a string on either side | **joins** text | `"5" + 3` → `"53"` |
| `+` with numbers/booleans/null | adds (`true` → 1, `null` → 0, `undefined` → `NaN`) | `true + true` → `2`, `2 + null` → `2` |
| `-` `*` `/` `%` | always converts to numbers | `"5" - 3` → `2`, `"3" * "4"` → `12`, `"a" * 2` → `NaN` |
| `<` `>` `<=` `>=` | numbers, unless **both** are strings (then text order) | `"11" < 3` → `false`, `"11" < "3"` → `true` |
| `if`, `!`, `&&`, `\|\|`, `? :` | to boolean (truthy/falsy) | `if ("0")` runs |
| `==` | converts (see section 8) | `5 == "5"` → `true` |
| `alert(x)`, `` `${x}` ``, `innerHTML = x` | to string | `alert([1, 2])` shows `1,2` |

**`+` goes left to right, one pair at a time** ❗ big test Q16:

```javascript
1 + 2 + "3";    // "33"   (1 + 2 = 3, then 3 + "3")
"1" + 2 + 3;    // "123"  ("1" + 2 = "12", then "12" + 3)
"1" + 2 - 1;    // 11     ("12" - 1 → minus converts back to a number)
1 + 2 + "px";   // "3px"
```

Once the result is a string, every later `+` joins.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `"5" + 3` | `"5" - 3` | `"53"` vs `2` |
| `Number("12px")` | `parseInt("12px")` | `NaN` vs `12` |
| `Number("")` | `parseInt("")` | `0` vs `NaN` |
| `Number(null)` | `Number(undefined)` | `0` vs `NaN` |
| `+x` | `x + ""` | to number vs to string |

---

## 8. Equality and comparison

| This | Result | Why |
|---|---|---|
| `5 == "5"` | `true` | `==` converts first |
| `5 === "5"` | `false` | `===` type + value, no conversion → **always use `===`** |
| `0 == false`, `"" == 0`, `"0" == false` | `true` | false → 0, "" → 0, "0" → 0 |
| `null == undefined` | `true` | special rule: `null ==` only `undefined` (and itself) |
| `null == 0` | `false` ❗ big test Q20 | that special rule — but `null + 5` → `5`, and 📘 `null >= 0` → `true` |
| `undefined == 0` | `false` | |
| `NaN === NaN` | `false` | → `Number.isNaN(x)` |
| `[1] === [1]`, `[1] == [1]` | `false` | two different arrays (addresses) |
| `"ab" === "ab"` | `true` | strings compare by characters |
| `[] == true` | `false` | `==` never uses truthiness |

- `switch` compares each `case` with `===`: `switch (0)` does not match `case false`, `switch ("2")` does not match `case 2`.
- `!=` / `!==` = loose / strict not-equal. ("Strict" here = `===`-style comparison, **not** strict mode.)

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `==` | `===` | converts vs doesn't |
| `null == 0` | `null + 0` | `false` vs `0` |
| `x === NaN` | `Number.isNaN(x)` | always `false` vs correct |
| `if (x)` | `x == true` | truthiness vs conversion to number |

---

## 9. Which error? The 3 questions

My weakest topic: ❗ big test Q2, Q5, Q9, Q36, Q38 · re-quiz 2026-10-05 Q3, Q5. Always ask **in this order**:

| # | Question | If yes → | Lines before it ran? |
|---|---|---|---|
| 1 | Is the code **broken as text** — can JS not even read it? | `SyntaxError` | **No** — nothing runs, not even line 1 |
| 2 | Does the **name** not exist (yet) at this moment? | `ReferenceError` | yes |
| 3 | The name exists, but its **value** can't do what I ask (property of `null`/`undefined`, call a non-function, change a `const`)? | `TypeError` | yes |
| — | none of these | **no error** → a value (`undefined`, `NaN`, `false`, joined text…) | |

The reason phrases used in every example of this file:

| Error | Reason phrases |
|---|---|
| SyntaxError | (same name declared twice) · (break outside a loop) · (rest not last) · (dot read as a decimal point) · (duplicate parameter) |
| ReferenceError | (name doesn't exist) · (name not created yet) · (name exists only inside the loop/block) |
| TypeError | (null/undefined has no properties) · (not a function) · (const can't be changed) · (string is read-only) · (object isn't a list) |

Traps in the questions:
- `const` changed → the name **exists** → TypeError, **not** ReferenceError (`max++` and `max += 1` are changes too).
- Same name declared twice → SyntaxError → **nothing printed**, even a `console.log` on line 1.
- An error **stops** the program: you can't get "TypeError **and** the lines after it".

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `username` (never declared) | `obj.username` | ReferenceError (name doesn't exist) vs `undefined` |
| `const` reassign | undeclared name | TypeError (exists) vs ReferenceError (doesn't exist) |
| `let x` twice | `x = 2` after `let x = 1` | SyntaxError (same name declared twice) vs fine |
| SyntaxError | ReferenceError / TypeError | nothing ran vs earlier lines ran |
| `undefined.x` | `({}).x` | TypeError (undefined has no properties) vs `undefined` |

---

## 10. SyntaxError: the code can't be read → nothing runs

```javascript
let a = 1;
let a = 2;                          // SyntaxError (same name declared twice) — Identifier 'a' has already been declared

function greet(name) {
  let name = "Jonas";               // SyntaxError (parameter name declared again)   ❗ Q36
}

[1, 2].forEach(x => { break; });    // SyntaxError (break outside a loop)
const [first, ...rest, last] = arr; // SyntaxError (rest not last)
function f(a, a) {}                 // 🔒 SyntaxError (duplicate parameter) — strict mode only; normal: allowed
5.toFixed(1);                       // SyntaxError (dot read as a decimal point) → write (5).toFixed(1)
obj?.a = 1;                         // SyntaxError (?. can't be assigned to)
a ?? b || c;                        // 📘 SyntaxError (?? mixed with || without brackets)
```

Plus ordinary typos: a missing `)` / `}` / quote. VS Code underlines these in red before you run anything; ESLint too.

---

## 11. ReferenceError: the name doesn't exist (yet)

```javascript
let userName = "Ona";
console.log(username);              // ReferenceError (name doesn't exist — case differs) — username is not defined   ❗ Q2

"use strict";
total = 10;                         // 🔒 ReferenceError (name never declared) — strict mode only; normal: creates a global   ❗ Q5

triple(4);                          // ReferenceError (name not created yet — const line not reached)   ❗ Q38
const triple = (n) => n * 3;

for (let i = 0; i < 3; i++) {}
console.log(i);                     // ReferenceError (name exists only inside the loop)

console.log(Nan);                   // ReferenceError (name doesn't exist — it's NaN)
console.log(price * 2);             // ReferenceError (name never declared)
```

### Hoisting: what can be used before its line?

| Form | Used before its line |
|---|---|
| `function f() {}` (declaration) | ✅ works |
| `const f = () => {}` / `const f = function () {}` | ❌ ReferenceError (name not created yet) |
| `let x` / `const x` | ❌ ReferenceError (name not created yet — 📘 "temporal dead zone") |
| `var x` | `undefined` (old style, no error) |

`typeof neverDeclared` → `"undefined"` — the **only** way to touch an undeclared name without an error.

---

## 12. TypeError: the value can't do that

### 12a. Property of `null` / `undefined` (the most common one)

**The rule:** `null` and `undefined` are the **only 2 values with no properties at all**. So **any** `.name`, `[0]`, `.length`, `.method()` — reading **or** writing — on them → **TypeError**. **Every other value** (number, string, boolean, `NaN`, object, array) just gives **`undefined`** for a property it doesn't have.

```javascript
const a = null;
a.name;          // TypeError (null has no properties) — Cannot read properties of null (reading 'name')
const b = undefined;
b.name;          // TypeError (undefined has no properties) — Cannot read properties of undefined (reading 'name')
a[0];            // TypeError (null has no properties) — [ ] is property access too
b.length;        // TypeError (undefined has no properties)
a.toString();    // TypeError (null has no properties) — methods are properties too
a.name = "Ona";  // TypeError (null has no properties) — Cannot SET properties of null

(5).name;        // undefined — a number has no "name", but it CAN have properties → no error
"".name;         // undefined
true.name;       // undefined
({}).name;       // undefined
[].name;         // undefined

a?.name;         // undefined — ?. stops at null/undefined instead of throwing (ES2020)
```

| This | vs | Difference |
|---|---|---|
| `null.name` / `undefined.name` | `(0).name`, `"".name`, `false.name` | TypeError vs `undefined` — falsy ≠ "no properties"; only `null`/`undefined` throw |
| `obj.missing` | `obj.missing.x` | `undefined` (one level) vs TypeError (`.x` **of** `undefined`) |
| `a.name` (a = null) | `a?.name` | TypeError vs `undefined` |
| "Cannot **read** properties of null" | "Cannot **set** properties of null" | reading `a.x` vs assigning `a.x = …` — same cause |

Where the `null`/`undefined` usually comes from — look **one step back**:

```javascript
null.trim();                        // TypeError (null has no properties) — prompt Cancel returned null
const arr = [];
arr[5].name;                        // TypeError (undefined has no properties) — arr[5] is undefined
({}).missing.x;                     // TypeError (undefined has no properties) — two levels missing
document.getElementById("wrong").innerHTML = "x";   // TypeError (null has no properties) — element not found
const { a } = null;                 // TypeError (null can't be destructured)
const [x] = undefined;              // TypeError (undefined isn't a list) — undefined is not iterable
const f = () => {}; f().x;          // TypeError (undefined has no properties) — function returned nothing
```

Message pattern: **"of null"** → something returned `null` (prompt Cancel, element not found); **"of undefined"** → missing index/property/argument/return. Look back one step.

### 12b. Calling something that isn't a function

```javascript
"abc".toUoerCase();                 // TypeError (not a function — typo in the method name)
(7).isInteger();                    // TypeError (not a function — it's Number.isInteger(7))
({}).run();                         // TypeError (not a function — property doesn't exist → undefined)
const n = 5; n();                   // TypeError (not a function — a number can't be called)
```

Message pattern: **"… is not a function"** → typo in the method name, wrong object (array method on a string: `"a,b".join()`), or static vs instance mix-up.

### 12c. Changing what can't be changed

```javascript
const rate = 0.21;
rate = 0.25;                        // TypeError (const can't be changed — name exists!)   ❗ Q9
const max = 10;
max++;                              // TypeError (const can't be changed — ++ is a change)   ❗ re-quiz Q3
"use strict"; "abc"[0] = "X";       // 🔒 TypeError (string is read-only) — strict mode only; normal: ignored
Object.freeze([1]).push(2);         // 📘 TypeError (frozen array can't change)
```

### 12d. Wrong kind of value

```javascript
[].reduce((acc, x) => acc + x);     // TypeError (nothing to start from — empty array, no start value)
for (const x of { a: 1 }) {}        // TypeError (object isn't a list — for...of needs an array/string)
1n + 1;                             // 📘 TypeError (bigint and number don't mix)
```

### 12e. The missing `;` trap

A line starting with `[` (or `(`) is glued to the line before it:

```javascript
const t = "x"
[1, 2].forEach(n => console.log(n))
// read as: const t = "x"[1, 2].forEach(...)  → TypeError (undefined has no properties — "x"[2] is undefined)

let a = 1; let b = 2
[a, b] = [b, a]
// read as: let b = 2[a, b] = [b, a]  → ReferenceError (name not created yet — b used in its own declaration)
```

Fix: end the line **before** a `[` line with `;`.

---

## 13. `"use strict"` and errors

`"use strict";` (first line of the script or function) doesn't change the rules — it turns **silent mistakes into errors**, so the program stops where the bug is.

| Code | Without `"use strict"` | With `"use strict"` | Rule |
|---|---|---|---|
| `total = 10` (never declared) | silently creates a global | **ReferenceError** | name doesn't exist |
| `s[0] = "X"` on a string | silently ignored | **TypeError** | read-only value |
| `NaN = 1` | silently ignored | **TypeError** | read-only value |
| `s.age = 88` on a string | silently ignored | **TypeError** | read-only value |
| `function f(a, a) {}` | allowed | **SyntaxError** | can't be parsed |
| `this` in a plain function call | `window` | `undefined` → `this.x` → TypeError | value used wrongly |

**Everything else in this file is the same in both modes**, e.g. `const` reassign → TypeError (const can't be changed) · `let`/`const` twice → SyntaxError (same name declared twice) · reading an undeclared name → ReferenceError (name doesn't exist).

- A browser `<script>` is **not** strict unless you write it. Modules (`type="module"`, `"type": "module"` in `package.json`) and classes are always strict.
- ESLint warns **before** running (`no-undef`, `no-const-assign`); strict mode stops **while** running.

---

## 14. 📘 Beyond the course: RangeError and `try/catch`

- **`RangeError`** — a number argument outside the allowed range: `(1).toFixed(101)` (digits 0–100), `new Array(-1)`, `"a".repeat(-1)`.
- **`try { … } catch (e) { … }`** (ES3) — catch an error instead of stopping the program. `e.name` = `"TypeError"`, `e.message` = the text. Not taught in the course; validate with `if` instead.

```javascript
try {
  null.trim();
} catch (e) {
  console.log(e.name, e.message);   // TypeError Cannot read properties of null (reading 'trim')
}
console.log("still running");
```

---

## 15. Other "what does it return" facts

| Declaration | Returns | Special case |
|---|---|---|
| `alert(message)` | `undefined` | — |
| `confirm(message)` | `true` (OK) / **`false`** (Cancel) ❗ big test Q28 | never `null` |
| `prompt(message, default?)` | **string** (even `"25"`; empty → `""`) | Cancel → **`null`** |
| `date.getMonth()` | number **0–11** (9 = October) ❗ Q57 | |
| `date.getDate()` / `date.getDay()` | 1–31 / **0–6, 0 = Sunday** | |
| `arr.find(fn)` | the **item** / `undefined` ❗ Q46 | |
| `arr.findIndex(fn)` / `indexOf(v)` | position / `-1` | |
| `arr.includes(v)` / `some(fn)` | boolean | |
| `arr.push(x)` | new **length** | |
| function without `return` | `undefined` | |

---

## 16. My mistakes → where they are explained

| Quiz | Question | Topic | Section |
|---|---|---|---|
| big test Q2 | `username` vs `userName` | ReferenceError, case-sensitive | 11 |
| big test Q5 | strict `total = 10` | ReferenceError | 11, 13 |
| big test Q9, re-quiz Q3 | `const` reassign / `max++` | TypeError | 12c |
| big test Q36, re-quiz Q5 | declared twice | SyntaxError, nothing runs | 10 |
| big test Q38 | `const` function called early | ReferenceError, hoisting | 11 |
| big test Q10, Q13 | `typeof null`, `typeof function` | typeof | 1 |
| big test Q16 | `"1" + 2 + 3` | `+` left to right | 7 |
| big test Q18 | `0.1 + 0.2 === 0.3` | decimals | 2 |
| big test Q20 | `null == 0` | equality | 8 |
| big test Q22 | `a++` vs `++a` | operators | 2 |
| big test Q26 | `Math.ceil(2.1)` | rounding | 2 |
| big test Q28 | `confirm` Cancel | return values | 15 |
| big test Q31 | `0 ?? 10` | `\|\|` vs `??` | 4 |
| big test Q52, Q55 | string immutable / string `===` | strings | 3 |
| big test Q59 | `u.key` vs `u[key]` | objects | 6 |
| arrays quiz | `arr[0].x` on empty array | TypeError chain | 5, 12a |

---

## 17. Recall from memory (answer, then check)

1. Name the 3 questions for choosing an error type, in order.
2. `const n = 1; n += 1;` — which error, and why not ReferenceError?
3. `console.log("a"); let x = 1; let x = 2;` — what is printed?
4. `typeof null`, `typeof NaN`, `typeof []`, `typeof (() => 1)`?
5. `"2" + 2 * "2"` and `"2" * 2 + "2"`?
6. `null == 0`, `null + 0`, `undefined + 0`?
7. `Number("")`, `parseInt("")`, `Number("12px")`, `parseInt("12px")`?
8. Which 6 values are falsy? Is `"0"` truthy?
9. `const user = null; user.name` — error name and message beginning?
10. What does `prompt` return on Cancel? `confirm`?

<details><summary>Answers</summary>

1. Can it be read? (SyntaxError) → does the name exist? (ReferenceError) → is the value used wrongly? (TypeError).
2. TypeError — `n` exists; changing a `const` is using it wrongly.
3. Nothing — SyntaxError before any line runs.
4. `"object"`, `"number"`, `"object"`, `"function"`.
5. `"24"` (`*` first: `2 * "2"` = 4, then `"2" + 4`) and `"42"` (`"2" * 2` = 4, then `4 + "2"`).
6. `false`, `0`, `NaN`.
7. `0`, `NaN`, `NaN`, `12`.
8. `false`, `0`, `""`, `null`, `undefined`, `NaN`. Yes.
9. `TypeError: Cannot read properties of null (reading 'name')`.
10. `null`; `false`.

</details>
