# JS basics: cheat sheet (must remember)

Full version: [[basics-learned]] — same section numbers. ❗ = my quiz mistake.

**Mode:** ⭐ my course always uses `"use strict"` (first line of every file). 🔒 = strict-only result.

## 1. What JS is
- HTML = structure (skeleton) · CSS = look (skin) · **JS = behaviour** (brains, interactivity).
- Frontend (browser) + backend (Node.js). Java ≠ JavaScript. Names: Mocha → LiveScript → JavaScript.
- **ECMAScript** = the rules, JS = the language. Course = **ES6 (2015)**; newer versions every year (e.g. `**` is ES2016).
- **Interpreted** = line by line (⚠ simplified, engines JIT-compile — exam answer: interpreted).

## 2. How JS runs
- Browser: HTML + `<script src="task1.js" defer></script>` in `<head>` → **Go Live** (Live Server). Node: `node task1.js` (`node -v` = version).
- **`defer`** = run after the HTML is loaded. No `defer` → script at the **end of `<body>`**. Too early → elements `null`.
- `prompt` / `alert` / `document` only in the browser (Node: ReferenceError).
- VS Code: `!` + Enter = HTML skeleton · **Autosave** on · one file per task.
- 📘 Always close `</script>` (even with `src`) — `<script src="a.js" />` breaks the page.

## 3. Syntax
- `console.log(value)` → prints, returns `undefined`. Console: **F12** → Console.
- Statements run top to bottom; **always end with `;`**.
- Comments: `// one line` (**Ctrl + /**) · `/* many lines */` · HTML: `<!-- -->` (popular exam question).
- **Case sensitive**: `username` ≠ `userName` → ReferenceError (name doesn't exist) ❗ Q2 · `"a".touppercase()` → TypeError (not a function) ❗.
- `"use strict"; total = 10;` → 🔒 **ReferenceError** (name doesn't exist), not SyntaxError ❗ Q5. At the **very top** of the file; in backticks it's ignored (⚠ slides).

## 4. Variables & scope
- Declare `let a;` → `undefined` · initialize `let a = 5;` · `=` = assign. `let x; x + 1` → `NaN` ❗.
- **`const`** for almost everything (teacher) · `let` if it must change · **`var` never**.
- `const`: needs a value at once; reassign / `++` → **TypeError** (const can't be changed) ❗ Q9. Contents of a `const` array can change.
- Same name twice (`let` / `const`) → **SyntaxError**, nothing runs ❗ Q36.
- `let` / `const` = **block** scope `{ }`. `let x` inside a block = **new** variable (outer unchanged); `x = …` inside = changes the outer.
- `var` = function scope: `var` inside `if` overwrites the outer · `var i` lives after the loop (`3`); `let j` → ReferenceError.
- Before its line: `var` → `undefined` · `let` / `const` → **ReferenceError** (name not created yet) ❗ · `function f(){}` works early.
- Errors in detail: [[types-learned]] 9–11.

## 5. Naming
- **Meaningful names** (exam requirement) + **camelCase**: `totalPrice`, `isAdult`.
- Letters, digits, `$`, `_`; not starting with a digit; no `-` (→ SyntaxError); avoid reserved words.
- `UPPER_CASE` for project-wide constants. One variable per line.

## 6. Input / output (browser)
- `alert(msg)` → `undefined` · `prompt(msg, default?)` → **string** / **`null`** (Cancel) · `confirm(msg)` → **`true` / `false`** ❗ Q28.
- `prompt` gives text: `"5" + 6` → `"56"` → convert: `+prompt(…)`. Conversion traps: [[types-learned]] 7.
- Page: `document.getElementById("result").innerHTML = …;` (id **without** `#`; wrong id → `null` → TypeError).

## 7. Operators
- `%` remainder (`5 % 3` → `2`; even `n % 2 === 0`; compare with `0`, not `1`) · `**` power (ES2016; ES6 `Math.pow`) · `5 / 2` → `2.5`.
- `b = a++` → **old** value · `c = ++a` → **new**: `a = 5; b = a++; c = ++a` → `7 5 7` ❗ Q22.
- `a += 5` = `a = a + 5` (`-=` `*=` `/=`).
- Always `===` / `!==` (no conversion); `==` converts → [[types-learned]] 8.
- `&&` all true · `||` at least one · `!` flips. Range: `age > 18 && age < 50`.

## 8. Math
- `floor` down · `ceil` **up** (`2.1` → `3`) ❗ Q26 · `round` nearest (`2.5` → `3`, `-2.5` → `-2`) · `trunc` cut (`-1.5` → `-1`).
- `Math.max(1, 7, 3)` → `7` · `Math.min(…)` · `Math.PI` (no `()`) · `Math.pow(5, 2)` → `25` · `Math.sqrt(25)` → `5`.
- `Math.random()` → 0 … <1. Range with both ends: `Math.floor(Math.random() * (max - min + 1)) + min` (⚠ without `+ 1` max is never reached).
- `toFixed(2)` → **string** (`"3.33"`) — convert back before maths. `(5).toFixed(1)`, not `5.toFixed(1)`.
- floor → full groups · ceil → boxes needed.

## Look-alikes
- `//` (one line) · `/* */` (many) · `<!-- -->` (HTML only).
- `defer` in `<head>` · script at end of `<body>` — both after the HTML exists.
- strict **mode** (`"use strict"`) ≠ strict **equality** (`===`).
- `const` changed → TypeError · undeclared → ReferenceError · declared twice → SyntaxError.
- `let` before its line → ReferenceError · `var` before its line → `undefined`.
- `let x` in a block (new variable) · `x = …` in a block (changes the outer).
- `prompt` Cancel → `null` · `confirm` Cancel → `false`.
- `a++` old · `++a` new.
- `ceil` always up · `round` nearest · `floor` down · `trunc` cut.
- `toFixed` → string · `Math.round` → number.
