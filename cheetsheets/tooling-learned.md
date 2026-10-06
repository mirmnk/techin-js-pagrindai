# Tooling: VS Code, Node, npm, ESLint

Sources: lessons 01–04 (VS Code, Live Server, running JS), lesson 07 "Datos" second half (2026-09-22: npm, modules, ESLint), wiki pages `dev-environment-vscode-live-server`, `how-javascript-runs`, `npm-project-and-eslint`, lesson-07 and lesson-13 notes, my base project `js-test-npm-project`, Claude chat setup sessions (ESLint fix), and my suggested `eslint.config.js`. Dates from the same lesson: [[dates-learned]]. Short version: [[tooling-cheatsheet]].

**Legend:** `command` → what it does · ❗ = I got this wrong in a quiz (quiz + question) · ⚠ = lesson mistake or trap.

**Checked** (2026-10-05) in Node 22 / npm 10 / ESLint 10: every command result and every ESLint message below.

**Contents:** 1 VS Code + Live Server · 2 Folder and terminal · 3 Browser or Node? · 4 npm project · 5 Modules · 6 ESLint · 7 Base-project workflow · 8 Debugging · 9 Exam-PC checklist · Recall

---

## All commands and shortcuts (declarations)

| Command / key | Where | Does |
|---|---|---|
| `code .` | terminal | opens the current folder in VS Code |
| `` Ctrl + ` `` | VS Code | opens the terminal |
| **Go Live** | VS Code status bar | starts Live Server (port 5500), opens the page |
| `node -v` / `node --version` | terminal | prints the Node version |
| `node file.js` (or `node file`) | terminal | runs a JS file in Node |
| `npm init` (Enter × all) | terminal | creates `package.json` |
| `npm install pkg` / `npm i pkg` | terminal | installs into `node_modules/`, adds to `dependencies` |
| `npm install -D pkg` | terminal | same, but into `devDependencies` (dev tools) |
| `npm install` / `npm i` | terminal | restores everything listed in `package.json` |
| `npm init @eslint/config@latest` | terminal | ESLint setup wizard |
| `npx eslint file.js` / `npx eslint .` | terminal | lint one file / the whole folder |
| `Ctrl + .` | VS Code | quick fix for the problem under the cursor |
| `Ctrl + /` | VS Code | comment / uncomment line |
| `Shift + Alt + F` | VS Code | format document |
| `F12` | browser | DevTools → **Console** tab |

---

## 1. VS Code + Live Server

- **VS Code** = the course editor (installed on school PCs). Turn on **File → Auto Save** — classic trap: "code is correct but nothing changes" = file not saved.
- **Live Server** extension → **Go Live** button (bottom bar) → opens the page in the browser (port 5500) and reloads on save. No button → check the extension is **enabled**.
- Task folder used in class: **one `index.html`** + `task1.js`, `task2.js`… (one small file per task — easy to find in the exam).
- HTML skeleton: `!` + Enter. Script in `<head>` with **`defer`**: `<script defer src="task1.js"></script>` → test another task by changing `src`.
- `"use strict";` at the top of every JS file.
- `log` + Enter → `console.log()`. Hover a name → see where it's used; unused names are greyed out.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `<script defer src>` in `<head>` | `<script>` at the end of `<body>` | both run after the HTML exists |
| Auto Save on | off | changes always used vs "nothing works" |

---

## 2. Opening a folder, the terminal

- Right-click the folder → *Open in Terminal* → `code .` (`.` = "this folder"). Or type `cmd` in the Explorer address bar.
- Terminal in VS Code: `` Ctrl + ` `` (backtick, above Tab).
- Teacher: choose **Git Bash** as the VS Code terminal. **PowerShell may be blocked** on school PCs.
- Short vs long options: `node -v` = `node --version` (one dash + letter, two dashes + word).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| Git Bash | PowerShell | works on school PCs vs may be blocked |
| `-v` | `--version` | same, short vs long |

---

## 3. Browser or Node? (how JS runs)

- JS needs an **engine** (interpreter). Two environments: the **browser** (frontend) and **Node.js** (backend, "JavaScript runtime environment").
- ⚠ "Interpreted line by line, not compiled" = the course's simplification (modern engines compile on the fly). Use the course wording in the theory test.
- **Node:** `node task1.js` (or `node task1`) → output in the terminal. Simplest way for pure-logic tasks.
- **Browser:** needs `index.html` + `<script>`; output in DevTools → **Console** (`F12` / right-click → Inspect).
- Browser-only names **don't exist in Node**:

```javascript
"use strict";
const n = prompt("x");             // in Node: ReferenceError (name doesn't exist) — prompt is not defined
document.getElementById("a");      // in Node: ReferenceError (name doesn't exist) — document is not defined
```

→ Tasks with `prompt` / `alert` / `confirm` / DOM: **Go Live + browser console**. Pure logic: either.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| browser | Node | has `document`, `prompt`, `alert` vs doesn't |
| `console.log` in browser | in Node | DevTools Console vs terminal |

---

## 4. npm project

**npm** (Node Package Manager) comes with Node. Steps from class:

1. New folder → open it in VS Code → terminal.
2. `npm init` → Enter for every question → **`package.json`** = the project's "control centre".
3. Add **`"type": "module"`** to `package.json` → `import` / `export` work.
4. `npm install moment` → code goes into **`node_modules/`** (thousands of files) and the name + version into **`dependencies`**. (`--save` = default since npm 5.)
5. Dev tools (ESLint) go to **`devDependencies`** (`npm install -D …`).

My base project's `package.json` (shortened):

```json
{
  "name": "js-test-npm-project",
  "version": "1.0.0",
  "type": "module",
  "main": "index.js",
  "dependencies": { "moment": "^2.31.0" },
  "devDependencies": { "@eslint/js": "^10.0.1", "eslint": "^10.11.0", "globals": "^17.12.0" }
}
```

- **Delete `node_modules` before zipping / uploading / copying** — it's huge and can always be rebuilt.
- Rebuild: `npm i` (`npm install`) — npm reads `package.json` and downloads everything again.
- Git: put `node_modules/` in **`.gitignore`** → never committed.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `dependencies` | `devDependencies` (`-D`) | needed to run vs only for developers |
| `package.json` | `node_modules/` | the list (keep) vs the downloaded code (delete before zipping) |
| `npm` | `npx` | installs packages vs runs an installed tool |

---

## 5. Modules (idea)

- **Module** = a file that `export`s something so another file can `import` it — building code from small pieces "like modular furniture".

```javascript
// math.js
export const add = (a, b) => a + b;

// useMath.js
import { add } from "./math.js";   // own file
import moment from "moment";       // package from node_modules
console.log(add(2, 3));            // 5
```

- ⚠ The lesson mixed modules with **OOP**. Different ideas: modules split code into **files**; OOP organises code around **objects/classes**.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| module | OOP class | code split into files vs objects with methods |
| `"./math.js"` | `"moment"` | my file vs package from `node_modules` |

---

## 6. ESLint

**ESLint** = a **linter**: reads the code and reports likely bugs **before** running. Stricter than `"use strict"` (that one stops the program **while** running).

### Installing

- Class wizard: `npm init @eslint/config@latest` → JavaScript · "to check syntax and find problems" · **JavaScript modules** (import/export) · framework: none · TypeScript: no · runs in: **browser + node** (Space selects both) · install now: yes · npm.
- ⚠ With new npm the wizard's install step can stop with **`EALLOWSCRIPTS`**. Fix: install the packages yourself, then create `eslint.config.js` by hand (below):

```bash
npm install -D eslint @eslint/js globals
```

- ⚠ **Config file `eslint.config.js` must include `globals.browser` + `globals.node`**, or every `console`, `document`, `prompt`, `alert` is an error. My base project's config has no `globals` — checked:

```text
'console' is not defined    no-undef
'document' is not defined   no-undef
'prompt' is not defined     no-undef
```

### Rules and running

- Own rules go in the `rules` object: `"no-unused-vars": "warn"`. Values: `"off"` / `"warn"` / `"error"` = `0` / `1` / `2`. Error = red, warning = yellow.
- Run: `npx eslint task1.js` (one file) · `npx eslint .` (whole folder).
- VS Code extension **ESLint** → problems underlined while typing; `Ctrl + .` = quick fix.
- ⚠ **`no-unused-vars`** = the variable is **never used**. The teacher said it fires because the variable "has no value" — wrong: `let test = 5;` still gives *'test' is assigned a value but never used*.
- Declared twice → ESLint shows **`Parsing error: Identifier 'a' has already been declared`** — the same SyntaxError, before running.

### My suggested `eslint.config.js`

```javascript
// eslint.config.js — suggested for Miro's course projects (ESLint 10, flat config)
// Needs: npm i -D eslint @eslint/js globals   (already in js-test-npm-project)
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: ["js/recommended"], // no-undef, no-const-assign, no-fallthrough, no-unreachable, use-isnan, valid-typeof, no-unexpected-multiline…
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // import/export ("type": "module" in package.json)
      globals: { ...globals.browser, ...globals.node }, // console, document, prompt, alert… are known
    },
    rules: {
      // course rules
      "no-var": "error", // let/const only
      "prefer-const": "warn", // const by default
      eqeqeq: "error", // === only (no == traps)
      "prefer-arrow-callback": "warn", // arrow functions preferred
      camelcase: "warn", // meaningful camelCase names (exam requirement)

      // my weak spots
      "array-callback-return": "error", // map/filter with { } but no return
      "default-case": "warn", // switch without default
      "no-shadow": "warn", // same name inside a block hides the outer one
      "no-unused-vars": "warn",
    },
  },
]);
```

### Rule → which of my mistakes it catches

| Rule | Catches (ESLint message) | My mistake |
|---|---|---|
| `no-const-assign` | `rate = 0.25` / `max++` on a `const` → *'rate' is constant* | ❗ big test Q9, re-quiz Q3 |
| `no-undef` | `username` vs `userName`; `total = 10` never declared → *'total' is not defined* | ❗ big test Q2, Q5 |
| `eqeqeq` | `x == 0` → *Expected '===' and instead saw '=='* | ❗ big test Q20, quiz 10-05 Q11 |
| `no-fallthrough` | `case` without `break` → *Expected a 'break' statement* | ❗ big test Q29 |
| `array-callback-return` | `map(n => { n * 2; })` → *expects a return value* | `[undefined, …]` trap |
| `use-isnan` | `x === NaN` → *Use the isNaN function* | lesson-08 `parseInt(ch) !== NaN` |
| `no-unexpected-multiline` | missing `;` before a `[` line → *Unexpected newline* | [[types-learned]] 12e |
| `camelcase` | `user_name` → *not in camel case* | exam: meaningful names |

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| ESLint | `"use strict"` | warns before running vs error while running |
| `"warn"` / `1` | `"error"` / `2` | yellow vs red |
| `no-unused-vars` | "no value" | never **used** vs (wrong lesson reason) |
| without `globals` | with `globals.browser` + `.node` | `console` "not defined" vs known |

---

## 7. The teacher's base-project workflow

1. Keep **one** set-up project: npm + `"type": "module"` + ESLint (mine: `js-test-npm-project`).
2. New topic: delete `node_modules` → **copy** the base → rename (e.g. `dates`) → open (`code .`) → `npm i` → create `task1.js`, `task2.js`…
3. Done: delete `node_modules` → zip → upload to Teams **Assignments**.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| copy base + `npm i` | `npm init` every time | 1 minute vs full setup again |
| zip without `node_modules` | with | small vs huge upload |

---

## 8. Debugging

- **Browser:** `F12` → **Console**: a red error = name + message + file:line (click it to jump there). Add `console.log` to see values step by step.
- My repo also has `.vscode/launch.json` → `F5` starts the VS Code debugger.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| browser Console (`F12`) | terminal | output of Go Live pages vs output of `node file.js` |

---

## 9. Exam-PC setup checklist (summary)

Full list: [[exam-plan]] section 2b.

- [ ] VS Code opens; **Auto Save** on; extensions **Live Server** + **ESLint** enabled.
- [ ] Terminal = **Git Bash**; `node -v` works.
- [ ] Copy the kit (flash drive / OneDrive) → base project → `code .` → `npm i`.
- [ ] `eslint.config.js` has `globals.browser` + `globals.node`.
- [ ] Test: `node task1.js` prints; **Go Live** opens `index.html`; `F12` Console shows logs.
- [ ] At the end: delete `node_modules` → zip → upload.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `npm i` on the exam PC | copying `node_modules` | small + fast (needs internet) vs huge copy |

---

## Recall from memory (answer, then check)

1. Which terminal should you use on school PCs, and why?
2. What does `npm init` create? What line enables `import`/`export`?
3. Where does `npm install moment` put the code, and where is it recorded?
4. What do you delete before zipping a project, and how do you get it back?
5. Why does ESLint say *'console' is not defined*, and how do you fix it?
6. The ESLint wizard fails with `EALLOWSCRIPTS` — what do you run instead?
7. Rule values: what are `0`, `1`, `2`? Why does `no-unused-vars` fire on `let test = 5;`?
8. A task uses `prompt`. Can you run it with `node`? What do you use?
9. Modules vs OOP — same thing?
10. The teacher's base-project workflow in 3 steps?

<details><summary>Answers</summary>

1. Git Bash — PowerShell may be blocked.
2. `package.json`; `"type": "module"`.
3. `node_modules/`; `package.json` → `dependencies`.
4. `node_modules`; `npm i`.
5. The config has no `globals` → add `globals: { ...globals.browser, ...globals.node }`.
6. `npm install -D eslint @eslint/js globals`, then write `eslint.config.js` yourself.
7. off / warn / error. The variable is never **used** — having a value doesn't matter.
8. No — ReferenceError (prompt is not defined). Go Live + browser console (`F12`).
9. No — modules split code into files; OOP is about objects/classes.
10. Copy the base (no `node_modules`) → `npm i` + task files → delete `node_modules`, zip, upload.

</details>
