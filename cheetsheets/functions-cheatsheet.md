# JS functions: cheat sheet (must remember)

Full version: [[functions-learned]] — same section numbers. ❗ = my quiz mistake. ⚠ = lesson mistake.

**Mode:** ⭐ all code assumes `"use strict"`. **Course rules:** solve tasks **with functions** · **arrow functions** preferred · **verb** names (`calculateTotal`), `is…` for true/false (`isAdult`).

## 1. Define, then call
- Defining doesn't run anything. Runs **only when called**: `name(arguments)`.
- No parameters → still write `()`: `function f() {}`, `f()`.

## 2. return
- No `return` → call gives **`undefined`** (Q34). Then `result.name` → TypeError (undefined has no properties) ❗ error quiz Q10.
- `return` **ends** the function: lines after it never run (Q35). `return;` = exit early.
- `console.log` ≠ `return` (caller gets `undefined`).

## 3. Parameters and arguments
- **Parameter** = name in the definition · **argument** = value in the call (exam question).
- Missing argument → `undefined` (`add(2)` → `NaN`). No error.
- Default (ES6): `(name = "guest")` → used if nothing is passed.
- Rest (ES6): `(...nums)` → array of all arguments; must be **last** (SyntaxError (rest not last)). See [[arrays-learned]] step 9.
- `...` in definition = **rest** · in a call = **spread** (⚠ slide mixed them up).
- `function f(name) { let name = …; }` → SyntaxError (same name declared twice), **nothing runs** ❗ Q36. `name = …` (no `let`) is fine.
- 🔒 `function f(a, a)` → SyntaxError in strict mode.

## 4. One function = one job
- **Calculate** → `return` the value · **display** → separate function. `showPrice(calcPrice(2.5, 3))` runs inside → out.

## 5. Three ways
- Declaration `function sum(a, b) { return a + b; }` · expression `const sum = function (a, b) {…};` · **arrow** `const sum = (a, b) => a + b;`
- Arrow: one expression → no `{ }`, no `return` (**implicit return**) · with `{ }` → `return` required, else `undefined`.
- No params → `() =>` · one param → `x =>` allowed, teacher: write `(x) =>`.
- Object in short form: `() => ({ id: 1 })` · `() => { id: 1 }` → `undefined`.
- Arrow has no own `this` (takes it from outside). `typeof` any function → `"function"` ❗ Q13.

## 6. Calling before the definition ❗ Q38
- Declaration works **before** its line: `double(4)` → `8`.
- `const` arrow/expression early → ReferenceError (name not created yet). Earlier lines **already ran**.

## 7. With vs without `()`
- `f()` = call → result · `f` = the function itself (pass it, nothing runs).
- `addEventListener("click", f)` ✅ · `addEventListener("click", f())` ❌ runs now, passes `undefined`.
- `setTimeout(f, 1000)` ✅ · HTML `onclick="f()"` **with** `()`.

## 8. Callbacks and HOFs
- **Callback** = function passed in · **HOF** = function that receives (or returns) a function.
- Array methods are HOFs: `map` (new array), `filter` (new array), `forEach` (`undefined`).
- **Sync** (array methods) runs now · **async** (`setTimeout`, events) runs later. ⚠ lesson: "callbacks always async" — wrong.
- `setTimeout` doesn't pause: code after it runs first, even with `0` ms. `clearTimeout(id)` cancels.

## 9. IIFE
- `(function () { … })();` / `(() => { … })();` → runs once, at once; inner variables private.
- Put `;` on the line before, or → TypeError (not a function).

## 10. Nested functions, scope
- Inner sees outer ✅ · outside sees inner ❌ ReferenceError (name doesn't exist).
- Same name inside = shadow (new variable). `return` ends only the function it's in.
- Closure (lesson-04 notes): a returned inner function still remembers the outer variables.

## 11. Functions vs methods
- Function = you write it · method = on an object, with a dot, mostly built in (`Math.floor()`, `s.toUpperCase()`).
- Typo in a method name → TypeError (not a function) ❗ error quiz Q6.

## Look-alikes
- parameter (definition) · argument (call).
- `f` (the function) · `f()` (its result).
- `=> a + b` (returns) · `=> { a + b; }` (`undefined`).
- `return x` (gives back) · `console.log(x)` (only prints).
- missing argument → `undefined` · missing variable → ReferenceError.
- declaration early → works · `const` early → ReferenceError · `let` param twice → SyntaxError (nothing runs).
- `f()` no return → `undefined` · `f().name` → TypeError.
- rest `(...a)` collects · spread `f(...a)` unpacks.
- `map`/`forEach` callback now · `setTimeout` callback later.
