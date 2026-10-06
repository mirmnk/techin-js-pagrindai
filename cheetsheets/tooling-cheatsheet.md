# Tooling: cheat sheet (must remember)

Full version: [[tooling-learned]] — same section numbers. ❗ = my quiz mistake. ⚠ = lesson mistake / trap.

## 1. VS Code + Live Server
- **Auto Save** on. **Go Live** → page in the browser (port 5500), reloads on save. No button → extension enabled?
- One `index.html` + `task1.js`, `task2.js`… · `<script defer src="task1.js"></script>` in `<head>` · `"use strict";` on top.
- `Ctrl + /` comment · `Shift + Alt + F` format · `log` + Enter → `console.log()`.

## 2. Folder and terminal
- `code .` opens this folder · `` Ctrl + ` `` terminal · use **Git Bash** (PowerShell may be blocked).

## 3. Browser or Node?
- `node task1.js` → terminal output. Browser → `F12` Console.
- `prompt` / `alert` / `document` in Node → ReferenceError (name doesn't exist) → Go Live.
- ⚠ "interpreted, not compiled" = course simplification (use it in the test).

## 4. npm project
- `node -v` → `npm init` (Enter × all) → `package.json` → add `"type": "module"`.
- `npm i moment` → `node_modules/` + `dependencies` · `npm i -D eslint` → `devDependencies`.
- **Delete `node_modules`** before zipping · restore with `npm i` · `.gitignore` it.

## 5. Modules
- `export const add = …` → `import { add } from "./math.js";` · package: `import moment from "moment";`.
- ⚠ Modules ≠ OOP.

## 6. ESLint
- Wizard: `npm init @eslint/config@latest` → problems · JS modules · no framework · no TS · **browser + node** · npm.
- ⚠ `EALLOWSCRIPTS` (new npm) → `npm install -D eslint @eslint/js globals` + write `eslint.config.js` yourself.
- ⚠ Config **must** have `globals: { ...globals.browser, ...globals.node }`, else *'console' is not defined*.
- Rules: `"off"/"warn"/"error"` = `0/1/2`. Run: `npx eslint task1.js` · `npx eslint .`. VS Code extension + `Ctrl + .`.
- ⚠ `no-unused-vars` = never **used** (not "no value").
- Catches my mistakes: `no-const-assign` (❗ Q9) · `no-undef` (❗ Q2, Q5) · `eqeqeq` (❗ Q20) · `no-fallthrough` (❗ Q29) · `array-callback-return` · `use-isnan` · `no-unexpected-multiline` · `camelcase`. Declared twice → *Parsing error*.

## 7. Base project
- Copy base (no `node_modules`) → rename → `code .` → `npm i` → tasks → delete `node_modules` → zip → upload.

## 8. Debugging
- `F12` → Console: red error = name + message + file:line. `console.log` values. My repo: `.vscode/launch.json` → `F5`.

## 9. Exam PC ([[exam-plan]] 2b)
- Auto Save · Live Server + ESLint enabled · Git Bash · `node -v` · copy kit → `npm i` · globals in config · test `node` + Go Live + `F12`.

## Look-alikes
- `dependencies` (run) · `devDependencies` (`-D`, tools).
- `npm` installs · `npx` runs a tool.
- `package.json` keep · `node_modules` delete before zipping.
- ESLint warns before running · `"use strict"` errors while running.
- `"warn"`/`1` yellow · `"error"`/`2` red.
- `"./math.js"` my file · `"moment"` package.
