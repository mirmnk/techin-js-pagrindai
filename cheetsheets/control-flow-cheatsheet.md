# Control flow: cheat sheet (must remember)

Full version: [[control-flow-learned]] — same section numbers. ❗ = my quiz mistake · 📘 = not from the course, kept to understand it. All code assumes `"use strict"`.

## 0. Big picture
- Condition → a block runs 0 or 1 time · loop → 0, 1 or many times. Loops are a must — understand `for` at least.

## 1. if / else if / else
- Top to bottom, **only the first true** block runs. Always write `{ }`.
- Condition = truthy/falsy test: `if ("hello")`, `if ([])` run · `if (0)`, `if ("a" && 0)` don't.
- Between → `&&` · outside → `||`. **Narrowest test first** (`>= 90` before `>= 50`).
- `prompt` → **string** → `Number(…)` then `===` (⚠ slide uses `==`).

## 2. Ternary `? :`
- `cond ? a : b` → **a value**. One value per side; several steps → `if`.
- Nested: `age < 18 ? "child" : age < 65 ? "adult" : "senior"` — read like `else if`; exams love them.
- 📘 In a bigger expression use brackets: `"Hi " + (n ? n : "guest")` (`+` runs first).

## 3. switch
- `===`, no conversion, no truthiness: `switch ("2")` ≠ `case 2` · `switch (0)` ≠ `case false` · `NaN` never matches.
- ❗ **Starts at the matching case**, then **falls through** all next cases until `break` / `return` / end. Cases above the match never run (Q29: `switch (2)` → `Tue Wed ?`).
- Stacked: `case 6: case 0: return "weekend";` · `return` leaves switch + function (no `break` needed).
- `default` = nothing matched. Ranges: `switch (true) { case t < 0: … }` — cases must be real booleans.
- `case` = any run-time expression; in C# a `case` must be a constant.
- `switch (x)` + `case x > 15` → number `===` boolean → **never** matches.

## 4. Which loop
- `for` = known count · `while` = unknown · `do...while` = at least once · `for...of` = array values · `for...in` = object keys.

## 5. for + tracing
- `for (start; condition; change)` — **semicolons**. Order: start → test → body → change → test …
- Paper table: column per variable + condition, row per round, stop at the first `false`.
- Task method: sum variable **above** the loop (`0`) → "inclusive" = `<=` → `sum += i` inside → `return` after → trace → guard edge cases.
- ⚠ 1…100 = 5050 (lesson said 5500).

## 6. while / do...while
- `while` may run **0** times · `do...while` always **1+** (Q39).
- Change the condition inside. `prompt` before **and** inside the loop.

## 7. Arrays, for...of / for...in
- `i < arr.length`, **never `<=`** (extra round → `undefined`).
- `in` = keys as **strings** (`"0"`) · `of` = values. `for...of` on `{}` → TypeError (not iterable). Strings: `for (const ch of "Labas")`.
- Object: `for (const key in user) user[key]`. `Object.entries` = ES2017.
- Index + value: `for (const [i, x] of arr.entries())`.

## 8. break / continue
- `break` = stop the loop · `continue` = skip this round · `return` = leave the function.
- Not in `forEach` (`break` → SyntaxError). `while` + `continue`: change the counter **before** `continue`.
- 📘 `break` in a `switch` inside a loop leaves **only the switch**.

## 9. Nested loops
- Inner loop runs **completely** for each outer round: 3 × 4 = 12 · inner `j <= i` → runs `i` times (1 + 2 + 3 = 6).
- `break` / `continue` → innermost loop only.

## 10. Scope, infinite loops
- `i` after `for (let i…)` → ReferenceError (name exists only inside the loop) · `var` → final value (`3`).
- `let` in an `if` block = new variable · `var` = function scope (Q8).
- 🔒 `for (i = 0; …)` without `let` → ReferenceError (strict) / global (normal).
- Infinite: no change step, wrong direction, no new `prompt`, `continue` before the change.

## Look-alikes
- `else if` chain (first true only) · separate `if`s (every true one).
- `? :` (returns a value) · `if` (runs code).
- `switch` (`===`, fixed values) · `if` (any truthy test).
- `break` (leave loop / switch) · `continue` (next round) · `return` (leave function).
- `while` (0+ times) · `do...while` (1+ times).
- `for...of` (values) · `for...in` (keys, strings).
- `i < length` ✅ · `i <= length` (one round too many).
- `let i` after the loop → ReferenceError · `var i` → last value.
