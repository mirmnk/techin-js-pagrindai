# Quiz log (all quizzes)

Every quiz is logged here: score + every mistake. Topic notes: [[types-learned]] · [[arrays-learned]] (arrays mistakes in detail: its Step 10).

## How future quizzes are built (from this log)

0. ⭐ **All quiz code assumes `"use strict"`** (Miro's course always uses it, 10-05): undeclared `x = 1` → ReferenceError, `s[0] = "X"` → TypeError, etc.
1. **About 1/3 of every new quiz re-tests open weak spots** (table below), with **new code**, not the same question.
1b. ⚠ **Pattern (10-05 error quiz):** Miro answers `undefined` when the code actually **throws** (4 of 6 misses). In every quiz include "undefined or crash?" pairs: `x.prop` vs `x.prop.y`, function without return + `.name`, `let` before its line (vs `var`), `[].reduce` without start, `undefined + 1` (→ `NaN`, not `undefined`).
2. Themes with the most misses come first: currently **error types**, then **loose equality with `null` / `undefined`** (flagged by Miro 10-05).
   - How to quiz it: mix `==` and `===` with `null`, `undefined`, `0`, `""`, `false`, `NaN` (e.g. `null == false`, `undefined == 0`, `null === undefined`, `"" == 0`); contrast `==` with maths (`null + 1`) and with truthiness (`if (null)`); one "why does `x == null` catch both?" question; at least 2 such questions in every quiz until closed. Rule to check against: `null`/`undefined` are loosely equal **only to each other** (and themselves) — `false` with everything else. Notes: [[types-learned]] sections 5 and 8.
   - Inside error types: **property of `null` / `undefined`** (flagged by Miro 10-05). How to quiz it: mix `a.name` / `a[0]` / `a.length` / `a.f()` / `a.x = 1` where `a` is `null` or `undefined` (→ TypeError) with the same on `0`, `""`, `false`, `NaN`, `{}`, `[]` (→ `undefined`, no error); chains (`obj.missing` vs `obj.missing.x`, `arr[5].name`, `f().x` with no return, `prompt` Cancel → `.trim()`, `getElementById("wrong").innerHTML = …`); `?.` versions; ask for the **error name + one-phrase reason**. At least 1 question per quiz until closed. Notes: [[types-learned]] section 12a.
   - Then **shallow copy** (flagged by Miro 10-05, priority 3). How to quiz it: `[...a]` / `{ ...o }` / `slice()` copy only the **top level** — nested arrays/objects are still **shared** (same address). Mix: change a top-level item in the copy (original unchanged) vs `push` / change a property **inside** a nested item (original changes too); `copy === orig` vs `copy[0] === orig[0]`; arrays of objects (`users.map(u => u)`, `[...users]` then `copy[0].name = …`); `{ ...o, address: { ...o.address } }` as the fix. At least 1 question per quiz until closed. Notes: [[types-learned]] section 6, [[arrays-learned]] step 9.
3. A weak spot is **closed** after it's answered right in **2 later quizzes on different days**.
4. New mistakes are added here the same day.

## Quizzes

| Date | Quiz | Score | Missed |
|---|---|---|---|
| 2026-10-03 | Arrays steps 6 / 7 / 8 | 8/8 · 6/6 · 11/11 | — |
| 2026-10-03 | Arrays mixed quiz | 15/20 | splice return, `find` → `undefined`, `indexOf` no conversion, rename in destructuring, `undefined.x` → TypeError, `[].every` → `true` |
| 2026-10-03 | Arrays re-quiz of missed | 7.5/9 | `find` not found → `undefined`; `splice` changes the original |
| 2026-10-04 | Full arrays quiz | 22/23 | splice argument roles |
| 2026-10-04 | **Big test** (lessons 1–16 + classmate repo), 60 Q | **40/60 (67%)** | 20, see below |
| 2026-10-06 | Objects quiz (12 Q) | **10/12** | `Object.assign(a, …)` changes `a` and returns the SAME object (`b === a` → true); `reduce` callback order: 1st parameter = accumulator, not index · ✅ this, destructuring, shallow copy (nested push), prototype method shared, sort by property, `[object Object]`, arrow `({ })`, for...in, === by reference, `?.` vs crash |
| 2026-10-06 | Exam-morning warm-up (5 Q, worst patterns) | **4/5** | shallow copy: `c[1].push(3)` on a `slice()` copy changes the shared inner array (4th miss) · ✅ defaults `undefined`/`null`, slice+sort vs reverse, `Number` spaces, `typeof` class |
| 2026-10-06 | Diagnostic quiz, 1 question per topic (20 Q) | **15/20** | `Number(" 12 ")` (said NaN), default param with `undefined`/`null`, `filter`/`map` don't change the original, `typeof` class ½, shallow copy 1-level vs 2-level (3rd miss), forEach `break` = SyntaxError ½ |
| 2026-10-06 | Exam-eve mixed re-quiz (15 Q, strict) | **12.5/15** | shallow copy whole-slot replacement again (Q3); forgot `undefined` printed before the TypeError (Q12 ½); `getDay()` Saturday = 6 (Q14) · ✅ SyntaxError twice-declared, `==` numbers, `const` change, typeof, `+` order, switch, `\|\|`/`??`, `let` after loop |
| 2026-10-05 | Arrays + types quiz (15 Q, strict mode) | **13/15** | shallow copy: replacing a whole slot `copy[1] = …` doesn't touch the original; `[] == false` and `0 == ""` are `true` · "undefined or crash?" 4/4 ✅ |
| 2026-10-05 | Error types quiz (12 Q) | 6/12 | declared twice (said ReferenceError), `let` before its line (said undefined), method typo (said ONA), `undefined + 1` (said undefined, is NaN), no-return `.name` (said undefined), `[].reduce` (said undefined) — **pattern: answering `undefined` where the code crashes** |
| 2026-10-05 | Spaced re-quiz (weak spots) | 4/6 | `const` changed with `++` → TypeError (said ReferenceError); `let` twice → SyntaxError, nothing runs (said TypeError) |

## Open weak spots (use these in the next quizzes)

| Theme | Misses | Last missed | Right since (date) | Status |
|---|---|---|---|---|
| Error types: ReferenceError vs TypeError vs SyntaxError | 13 (+1 arrays) | 2026-10-05 | — (ReferenceError for undeclared ✅ 10-05) | 🔴 open — still mixing TypeError (`const` change) and SyntaxError (declared twice) |
| `typeof null` / `typeof function` | 2 | 2026-10-04 | — | 🔴 open |
| `+` left to right with strings | 1 | 2026-10-04 | — | 🔴 open |
| Loose equality with `null` / `undefined`, and `==` converting to numbers (`[] == false`, `0 == ""` → `true`) | 3 | 2026-10-05 | `null` rule ✅ 10-05 (Q2, Q11b) | 🔴 open — priority 2 |
| Shallow copy: spread/`slice` copy only the top level, nested items shared; replacing a whole slot affects only the copy | 1 | 2026-10-05 | 2026-10-05 (Q6, Q14) | 🔴 open — priority 3 |
| Property of `null` / `undefined` → TypeError; any other value → `undefined` (Miro flagged 10-05) | 1 (arrays quiz `arr[0].x`) + error quiz Q10 | 2026-10-05 | 2026-10-05 (Q1, Q13, Q15) | 🟡 1 of 2 days |
| `0.1 + 0.2 !== 0.3` | 1 | 2026-10-04 | — | 🔴 open |
| `a++` vs `++a` | 1 | 2026-10-04 | — | 🔴 open |
| `Math.ceil` always up | 1 | 2026-10-04 | — | 🔴 open |
| `confirm` / `prompt` Cancel results | 1 | 2026-10-04 | — | 🔴 open |
| `switch` starts at the matching case | 1 | 2026-10-04 | — | 🔴 open |
| `\|\|` vs `??` with `0` | 1 | 2026-10-04 | — | 🔴 open |
| `find` → item (not index), not found → `undefined` | 3 | 2026-10-04 | 2026-10-05 (re-quiz + Q1, Q15) | 🟡 1 of 2 days |
| Strings immutable / string `===` | 2 | 2026-10-04 | — | 🔴 open |
| Dates: `getMonth` 0–11, `getDay` 0 = Sunday | 1 | 2026-10-04 | 2026-10-05 (`getMonth`) | 🟡 1 of 2 |
| `u.key` vs `u[key]` | 1 | 2026-10-04 | 2026-10-05 (re-quiz + Q12) | 🟡 1 of 2 days |
| `splice` argument roles + changes original | 2 | 2026-10-04 (arrays quiz) | 2026-10-04 (big test Q49), 2026-10-05 | ✅ closed |
| `every` on empty array, destructuring rename, `indexOf` no conversion | 1 each | 2026-10-03 | 2026-10-04 (arrays quiz) | 🟡 1 of 2 |

## Big test 2026-10-04: mistakes

| Q | Code / question | My answer | Correct | Why (memorize) |
|---|---|---|---|---|
| 2 | `let userName = "Ona"; console.log(username);` | `"Ona"` | **ReferenceError** | JS is case-sensitive; `username` was never declared → name doesn't exist |
| 5 | `"use strict"; total = 10;` | SyntaxError | **ReferenceError** | strict mode forbids assigning to an undeclared name; the code is valid text, so it's not SyntaxError |
| 9 | `const rate = 0.21; rate = 0.25;` | ReferenceError | **TypeError** | the name **exists** → used wrongly = TypeError (`Assignment to constant variable`) |
| 10 | `typeof null` | `null` | `"object"` | old JS bug → check with `=== null` |
| 13 | `typeof function greet() {}` | `"object"` | `"function"` | functions have their own `typeof` result |
| 16 | `"1" + 2 + 3` | `15` | `"123"` | left to right: `"1" + 2` = `"12"`, then `"12" + 3` = `"123"` |
| 18 | `0.1 + 0.2 === 0.3` | `true` | `false` | `0.30000000000000004`; display with `toFixed`, compare with a tolerance |
| 20 | `null == 0` | `true` | `false` | `null ==` only `undefined`; maths is different (`null + 5` → `5`) |
| 22 | `let a = 5; let b = a++; let c = ++a;` → `a, b, c` | `7 6 7` | `7 5 7` | `a++` gives the old value first |
| 26 | `Math.ceil(2.1)` | `2` | `3` | `ceil` always rounds **up** |
| 28 | `confirm(...)` → Cancel | `null` | `false` | `confirm` → `true`/`false`; `prompt` Cancel → `null` |
| 29 | `switch (2)` with `case 1/2/3/default`, no `break` | `Mon Tue Wed ?` | `Tue Wed ?` | `switch` **jumps** to the matching case, then falls through |
| 31 | `const qty = 0; qty ?? 10` | `10` | `0` | `??` replaces only `null`/`undefined`; `\|\|` replaces any falsy |
| 36 | parameter `name` + `let name = "Jonas"` inside | TypeError | **SyntaxError** | declaring the same name twice → code can't be parsed, nothing runs |
| 38 | `double(4)` before `function double…`, `triple(4)` before `const triple = …` | SyntaxError | `8`, then **ReferenceError** | function declarations are hoisted; `const` can't be used before its line; line 1 already ran |
| 46 | `[5, 12, 8, 130, 44].find(n => n > 10)` | `1` | `12` | `find` → **item**; position = `findIndex` |
| 52 | `const s = "labas"; s[0] = "L";` then 3 logs (🔒 in strict mode — my course — it IS a TypeError and nothing after prints) | TypeError + lines | `labas LABAS labas`, no error | strings immutable, change silently ignored; an error would stop all later lines |
| 55 | `"level".split("").reverse().join("") === "level"` | `false` | `true` | after `join` it's a string; strings `===` by characters |
| 57 | `new Date(2026, 9, 6)`: `getMonth()`, `getDate()`, `getDay()` | September, a date, Tuesday | `9`, `6`, `2` | getters return numbers; month 9 = October; `getDay` 0 = Sunday |
| 59 | `u.key` when `const key = "age"` | `30` | `undefined` | dot = property literally named `"key"`; variable → `u[key]` |

Strong in the big test: arrays and loops (13/16), functions basics, `?.`, template literals, `replaceChild(new, old)`.

## Spaced re-quiz 2026-10-05: mistakes

| Q | Code / question | My answer | Correct | Why (memorize) |
|---|---|---|---|---|
| 3 | `const max = 10; max++;` | ReferenceError | **TypeError** | `max` exists → changing a `const` = TypeError (`++` is a reassignment) |
| 5 | `console.log("start"); let city = …; let city = …;` | `start`, then TypeError | **SyntaxError, nothing printed** | declared twice → code can't be parsed → not even line 1 runs |

## Error types quiz 2026-10-05: mistakes (6/12)

| Q | Code | My answer | Correct | Why (memorize) |
|---|---|---|---|---|
| 2 | `console.log("start"); let total = 5; let total = 10;` | `start`, ReferenceError | **SyntaxError, nothing printed** | (same name declared twice) — the file can't be read, line 1 never runs |
| 3 | `console.log(score); let score = 3;` | `undefined` | **ReferenceError** | (name not created yet) — `undefined` only with `var` |
| 6 | `"ona".touppercase()` | `ONA` | **TypeError** | (not a function — typo, case matters in method names) |
| 9 | `let x; x = x + 1;` | `undefined` | **`NaN`, no error** | `undefined` in maths → `NaN`; something was computed |
| 10 | function without `return`, then `u.name` | `undefined` | **TypeError** | (undefined has no properties) — `u` is `undefined`, `.name` OF it crashes |
| 12 | `[].reduce((s, p) => s + p)` | `undefined` | **TypeError** | (empty array, no start value) — "Reduce of empty array with no initial value" |

Check before answering `undefined`: **"undefined OF what?"** — if the thing before the dot is `null`/`undefined` → TypeError.

## Arrays + types quiz 2026-10-05: mistakes (13/15)

| Q | Code | My answer | Correct | Why (memorize) |
|---|---|---|---|---|
| 3 | `copy = [...orig]; copy[0].n = 99; copy[1] = { n: 5 }` → `orig[0].n, orig[1].n` | `99 5` | `99 2` | change **inside** a shared item → both see it; replace a **whole slot** → only the copy |
| 11 | `[] == false`, `null == false`, `0 == ""` | `false false false` | `true false true` | `==` turns both sides into **numbers** (`false` → 0, `""` → 0, `[]` → `""` → 0); only `null`/`undefined` follow their own rule |

## Exam-eve re-quiz 2026-10-06: mistakes (12.5/15)

| Q | Code | My answer | Correct | Why (memorize) |
|---|---|---|---|---|
| 3 | `b = [...a]; b[0] = { v: 9 }; b[1].v = 7` → `a[0].v, a[1].v` | `9 7` | `1 7` | look left of `=`: whole slot `b[0] = …` → copy only; dot inside `b[1].v = …` → shared → both |
| 12 | `r = f()` (no return); `r?.x`; `r.x` | TypeError | `undefined`, then TypeError | lines before the crash still print (only SyntaxError stops everything) |
| 14 | `new Date(2026, 0, 31).getDay()` (Saturday) | `5` | `6` | week starts **Sunday = 0** … Saturday = 6 |

## Diagnostic quiz 2026-10-06: mistakes (15/20)

| Q | Topic | Code | My answer | Correct | Why (memorize) |
|---|---|---|---|---|---|
| 3 | conversion | `Number(" 12 ")` | `NaN` | `12` | `Number` trims spaces around; NaN only for characters inside (`"12px"`, `"1 2"`) |
| 7 | functions | `add(5, undefined)`, `add(5, null)` with `b = 10` | `NaN`, … | `15`, `5` | default used for missing **or `undefined`**; `null` is a real value → `5 + null` = 5 |
| 9 | arrays | `a.filter(…).map(…)` → `a.length` | `2` | `3` | `filter`/`map` return NEW arrays, original unchanged |
| 15 | classes | `typeof Car` (class) | `"object"` | `"function"` | a class is a special function; `typeof new Car()` → `"object"` |
| 16 | shallow copy | `c = {...o}; c.a = 9; c.inner.b = 8` → `o.a, o.inner.b` | `9 8` | `1 8` | 1 dot after the copy's name → copy only; 2+ dots (nested) → shared |
| 19 | errors | `break` inside `forEach` | "can't break" | **SyntaxError** | (break outside a loop) — name the error |

### Topic map after the diagnostic (2026-10-06)

| Status | Topics |
|---|---|
| ✅ strong | scope, `++`/`--`, equality, conditionals/ternary, loops/continue, hoisting, reduce, destructuring/rest, strings, dates diff, objects add/delete/keys, DOM appendChild, form `.value` string, Math rounding |
| 🟡 shaky | `Number()` with spaces, default parameters (`undefined` vs `null`), changes-vs-new array methods, `typeof` class/function, naming SyntaxError cases |
| 🔴 weak | **shallow copy** (3 misses in a row: whole slot / 1-level property vs nested) |

## Objects quiz 2026-10-06: mistakes (10/12)

| Q | Code | My answer | Correct | Why (memorize) |
|---|---|---|---|---|
| 2 | `b = Object.assign(a, { y: 2 }); b === a` | `false` | `true` | `Object.assign` copies INTO its first argument and returns it; new object → `Object.assign({}, a, …)` or `{ ...a }` |
| 5 | `Object.values({ x: 1, y: 2 }).reduce((s, v) => s + v, 0)` | `4` | `3` | `reduce((acc, value, index, array) => …, start)`: **1st parameter = accumulator**, 2nd = current value (index is only 3rd) → 0+1+2 = 3 |
