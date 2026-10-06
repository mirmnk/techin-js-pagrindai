# JS types and errors: cheat sheet (must remember)

Full version: [[types-learned]] — same section numbers. ❗ = my quiz mistake.

**Mode:** ⭐ my course always uses `"use strict"` → for 🔒 lines take the **strict** result (list in 13). Everything else is the same in both modes. `===` "strict equality" ≠ strict mode.

## 0. Value or error?
- JS prefers a **value** over an error: missing → `undefined`, bad maths → `NaN`, `/0` → `Infinity`, `+` with text → joined, `s[0] = …` → ignored (🔒 strict: TypeError).
- Errors only in a short list (9–12). Error = program **stops** at that line.

## 1. typeof
- `"string"` · `"number"` (`NaN`, `Infinity` too) · `"boolean"` · `"undefined"` (also never-declared names) · `null` → `"object"` ❗ · `[]` `{}` → `"object"` · function → `"function"` ❗ · `10n` → `"bigint"`.
- Checks: `x === null` · `Array.isArray(x)` · `Number.isNaN(x)` (no conversion; global `isNaN` converts) · `Number.isInteger(x)` / `Number.isFinite(x)` — static, `(7).isInteger()` → TypeError.

## 2. number
- One type: `5 / 2` → `2.5`. `NaN` spreads, `NaN === NaN` → `false`. `0.1 + 0.2 !== 0.3` ❗ → `toFixed(2)` (**string**).
- `floor` down · `ceil` **up** (`2.1` → `3`) ❗ · `round` nearest (`-2.5` → `-2`) · `trunc` cut.
- `-7 % 2` → `-1` → odd = `n % 2 !== 0` · `b = a++` old ❗ · `c = ++a` new.
- `5.toFixed(1)` → SyntaxError → `(5).toFixed(1)`.

## 3. string
- Immutable: `s[0] = "L"` ignored (🔒 strict: TypeError) ❗, methods return a **new** string. `===` by characters ❗.
- `${}` only in backticks. `"11" < "3"` → `true` (both strings → text order).

## 4. Truthy / falsy
- Falsy: `false 0 "" null undefined NaN`. Truthy: `"0"`, `" "`, `[]`, `{}`.
- `0 || 10` → `10` · `0 ?? 10` → `0` ❗ (ES2020). `||` returns the first truthy value, `&&` the first falsy.

## 5. undefined vs null
- `undefined` = not there (JS) · `null` = empty on purpose (Cancel, element not found).
- `undefined + 5` → `NaN` · `null + 5` → `5` · `null == undefined` → `true` · `null == 0` → `false` ❗.
- One level missing → `undefined`; two levels → TypeError. Crash line ≠ bug line.

## 6. Objects
- `b = a` same object · `[...a]` copy · `[1] === [1]` → `false`.
- `const` → contents changeable, name not. `u[key]` uses the variable ❗ · `u.key` = property `"key"`.

## 7. Conversion
- `Number("")` → `0` · `Number("12px")` → `NaN` · `parseInt("12px")` → `12` · `Number(null)` → `0` · `Number(undefined)` → `NaN`.
- `+` left to right: `1 + 2 + "3"` → `"33"` · `"1" + 2 + 3` → `"123"` ❗ · `"1" + 2 - 1` → `11`. `- * /` → numbers.

## 8. Equality
- Always `===`. `==`: `0 == false`, `"" == 0` → `true`; `null` `==` only `undefined`. `switch` uses `===`.

## 9. Which error? — ask in this order ❗❗
1. Can't be **read** → **SyntaxError**, **nothing** runs.
2. **Name** doesn't exist (yet) → **ReferenceError**.
3. Name exists, **value** can't do it → **TypeError**.
- `const` changed (`=`, `++`, `+=`) → **TypeError** (name exists!).

## 10. SyntaxError (nothing runs)
- `let x = 1; let x = 2;` (same name declared twice)
- `function f(name) { let name = …; }` (parameter name declared again)
- `break` inside `forEach` (break outside a loop)
- `const [a, ...r, z] = arr` (rest not last)
- `5.toFixed(1)` (dot read as a decimal point)
- `obj?.a = 1` (?. can't be assigned to) · missing `)` `}` (broken grammar)

## 11. ReferenceError
- `username` when you declared `userName` (name doesn't exist — case differs)
- 🔒 `"use strict"; total = 10` (name never declared) — normal mode: creates a global
- `f()` before `const f = …` / `x` before `let x` (name not created yet)
- `i` after `for (let i…) {}` (name exists only inside the loop)
- `Nan` (name doesn't exist — it's `NaN`)
- `function f(){}` works before its line · `typeof undeclared` → `"undefined"` (no error).

## 12. TypeError
- ⭐ **Rule:** only `null` and `undefined` have **no properties** → `a.name`, `a[0]`, `a.length`, `a.f()`, `a.x = 1` on them → TypeError (null/undefined has no properties). Any other value (`5`, `""`, `false`, `{}`, `[]`) → `undefined`, no error. `a?.name` → `undefined`.
- `null.trim()` after Cancel (null has no properties)
- `arr[5].name` (undefined has no properties)
- `getElementById("wrong").innerHTML = …` (null has no properties — element not found)
- `const { a } = null` (null can't be destructured)
- `"abc".toUoerCase()` / `(7).isInteger()` / `"a".join()` (not a function)
- `const x = 1; x = 2` / `x++` (const can't be changed — name exists!)
- 🔒 strict-only `s[0] = "X"` (string is read-only)
- `[].reduce(fn)` (nothing to start from) · `for (const v of {a: 1})` (object isn't a list)
- Missing `;` before a `[` line → lines glued → TypeError / ReferenceError.

## 13. "use strict"
- 🔒 The only differences — normal mode: no error; strict: undeclared `x = 1` → ReferenceError · `s[0] = "X"` / `s.age = 1` / `NaN = 1` → TypeError · `f(a, a)` → SyntaxError · `this` in a plain call → `undefined`. Off by default in `<script>`; modules/classes always strict.

## 15. Returns
- `confirm` → `true`/`false` ❗ · `prompt` → string / `null` · `alert` → `undefined`.
- `getMonth()` 0–11 ❗ · `getDay()` 0 = Sunday · `find` → item / `undefined` ❗ · `push` → length.

## Look-alikes
- `undefined` (not there) · `null` (empty on purpose).
- missing property → `undefined` · missing variable → ReferenceError.
- `.` on `undefined` → TypeError · `?.` → `undefined`.
- `const` reassign → TypeError · undeclared → ReferenceError · declared twice → SyntaxError.
- `isNaN` converts · `Number.isNaN` doesn't.
- `Number("")` → `0` · `parseInt("")` → `NaN`.
- `confirm` Cancel → `false` · `prompt` Cancel → `null`.
- `getDate` (day of month) · `getDay` (weekday).
