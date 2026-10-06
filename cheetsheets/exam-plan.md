# JS exam plan: Tue 2026-10-06

Room **214** (overflow **219**) · be there **16:30** · start ~17:30 · theory ~30 min → practical **18:00–20:30** → home, bed.
Fill in the `___` blanks tonight.

---

## 1. Tonight (Mon 10-05)

- [x] **mokymas.lt login works** (theory test site) — password changed 10-05.
  - [ ] New password written on **paper**, because the phone may go into a box. Reset goes to school Outlook; problems → Iveta.
- [x] Pseudonym sent to Iveta (for publishing results)
- [ ] `git push` in `techin-js-pagrindai`: everything is on GitHub
- [ ] Exam kit zip (section 4) → copied to **OneDrive** **and** a **flash drive**
- [ ] Check that OneDrive / GitHub log in **without the phone** (2FA codes!). If not, the flash drive is the main copy.
- [x] Pasiruošimas KD tasks (`2026-10-02/pasiruosimas_kd_2026.md`) finished and turned in
- [ ] Quick read: [[types-cheatsheet]] sections 0 and 9 · [[quiz-log]] open weak spots
- [ ] Clothes and bag ready (section 3)
- [ ] Lights out by **___** (aim for 7–8 h of sleep; no new topics after ~21:00)

## 2. Exam day timeline (Tue 10-06)

| Time | What |
|---|---|
| ___ | wake up (usual time, no alarm changes) |
| 08:00 | 10-min quiz (scheduled reminder): error types first |
| **10:00** | 🍚 cook rice for the family |
| **12:00** | 🍲 cook soup (lunch) |
| between meals | light review only: cheat sheets, no new material |
| ~13:30 | optional **short nap, 20–30 min max** (longer → groggy in the evening) |
| **15:00** | 🍽 cook the other meal for the family; eat yourself (not heavy); water |
| ~15:30 | final check of the bag; 5-min look at [[types-cheatsheet]] section 9 |
| **___** | **leave home** = 16:30 − travel ___ min − 10 min buffer |
| **16:30** | arrive; find room 214; sign attendance; pick a PC |
| 16:30–17:20 | **PC setup checklist** (section 2b) |
| ~17:30 | **theory**: 30 questions / 30 min (locked browser) |
| **18:00–20:30** | **practical**: ~7 tasks, one DOM |
| ~20:10 | upload a first zip, even if unfinished |
| 20:30 | final zip + upload (GitHub link **and** zip); tell the teacher you're done |
| after | home → **bed** (no checking answers tonight) |

## 2b. Exam PC setup (16:30–17:20), in this order

1. [ ] Copy `exam-kit-2026-10-06.zip` from the **flash drive** (or OneDrive) → Desktop → unzip
2. [ ] **Git Bash** opens (PowerShell may be blocked) → `node -v` and `npm -v` print versions
   - no Node → skip npm/ESLint; run code in the browser with Live Server
3. [ ] **VS Code** opens the folder (`code .` in Git Bash, or File → Open Folder)
4. [ ] Extensions installed (install if missing and allowed):
   - **ESLint** (`dbaeumer.vscode-eslint`)
   - **Prettier** (`esbenp.prettier-vscode`)
   - **Live Server** (`ritwickdey.LiveServer`)
5. [ ] Settings (Ctrl+,):
   - **Auto Save**: File → Auto Save ✔ (or `files.autoSave`: `afterDelay`)
   - **Default Formatter**: Prettier
   - **Format On Save** ✔
6. [ ] ⚠ **AI off**: disable / sign out of GitHub Copilot and Copilot Chat if the PC has them (screens are monitored; no AI allowed)
7. [ ] **Exam folder**: `techin-js-pagrindai/js-intro-exam/` (my ESLint 10 project) → `npm install` (or `npm ci`) → `npx eslint .` runs → create `task1.js`…
8. [ ] **Debug**: `.vscode/launch.json` is in the repo folder (it's in the **zip**, not on GitHub — `.gitignore` skips `.vscode/`) → open a small `.js` file → F5 "Node: current file" works
9. [ ] **Live Server**: right-click an `index.html` → Open with Live Server → page opens; **F12** console works
10. [ ] **Keyboard**: type `` ` `` `{ }` `[ ]` `=>` once (Lithuanian layout?) — switch to English if needed
11. [ ] **Browser**: open the bookmarks (section 5) in tabs; **mokymas.lt login** works
12. [ ] **Upload**: know where (Assignments) and how to zip on Windows (right-click → Send to → Compressed folder); zip **without** `node_modules`
13. [ ] Paper + pens on the desk; phone in the box

## 3. Clothes and bag

- Layers (classrooms can be warm or cold), comfortable for ~3.5 h of sitting; check the weather in the morning.
- [ ] Flash drive with the exam kit
- [ ] Paper + 2 pens (tracing loops in the theory part)
- [ ] mokymas.lt login on paper
- [ ] Water, small snack
- [ ] Phone charged (it may go into a box)
- [ ] Laptop: optional; you **can't** use it during the exam (school PCs only)
- [ ] Pick up your **student ID** (moksleivio pažymėjimas) on the day

## 4. Exam kit (zip → OneDrive + flash drive)

- `techin-js-pagrindai/`: all my tasks by topic (**without** `node_modules`)
- `js-test-npm-project/`: base npm project (**without** `node_modules`, `npm i` restores it)
- Notes: [[types-cheatsheet]], [[arrays-cheatsheet]], [[dom-cheatsheet]] (+ the `-learned` versions), lesson `notes.md` files
- This plan

## 5. Open during the practical (allowed: own works + websites; **no AI**, no classmates)

**Theory part: nothing. Only your head.**

### My own works: where to look per topic

| Need | My example folder |
|---|---|
| if / switch / ternary | `03_if-switch/` |
| functions, arrow functions | `04_javascript-funkcijos/` |
| loops | `05_javascript-ciklai/` |
| arrays: map / filter / sort / reduce | `06_masyvai/01_arrays/`, `12_pasiruosimas/02_reduce-task/` |
| dates | `07_datos/01_dates/` |
| strings: split, count characters, unique | `08_eilutes/` |
| objects, destructuring, merge by id | `09_objektai/` |
| DOM: elements, events, forms | `10_dom/` (4 folders) |
| DOM: form + calculation (tip calculator) | `12_pasiruosimas/01_dom-tips-calculator/`, `2026-10-02/` |
| mixed practice (exam-like) | `11_pasikartojimas/`, `2026-10-02/` |
| GitHub copy | https://github.com/mirmnk/techin-js-pagrindai |

### Cheat sheets (my notes)

- [[arrays-cheatsheet]]: signatures, "changes vs returns new"
- [[types-cheatsheet]]: conversion, `prompt` → string, error types
- [[dom-cheatsheet]]: find, events, forms, create / append

### Online references (bookmark tonight · all links also in `exam-links.html` in the kit — open it in the browser and click)

**Repos**

- My repo: techin-js-pagrindai: https://github.com/mirmnk/techin-js-pagrindai
- Classmate repo (Vidmantas?): Kizo5060/JavaScript: https://github.com/Kizo5060/JavaScript

**JavaScript reference**

- W3Schools JS reference (all objects): https://www.w3schools.com/jsref/default.asp
- W3Schools Array: https://www.w3schools.com/jsref/jsref_obj_array.asp
- W3Schools String: https://www.w3schools.com/jsref/jsref_obj_string.asp
- W3Schools Number: https://www.w3schools.com/jsref/jsref_obj_number.asp
- W3Schools Math: https://www.w3schools.com/jsref/jsref_obj_math.asp
- W3Schools Date: https://www.w3schools.com/jsref/jsref_obj_date.asp
- MDN JavaScript reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
- MDN Array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
- MDN String: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
- MDN Object: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
- MDN Date: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

**DOM reference**

- W3Schools HTML DOM tutorial: https://www.w3schools.com/js/js_htmldom.asp
- W3Schools DOM methods: https://www.w3schools.com/js/js_htmldom_methods.asp
- W3Schools Document object: https://www.w3schools.com/jsref/dom_obj_document.asp
- W3Schools Element object: https://www.w3schools.com/jsref/dom_obj_all.asp
- W3Schools Events: https://www.w3schools.com/jsref/dom_obj_event.asp
- W3Schools addEventListener: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
- W3Schools Style object: https://www.w3schools.com/jsref/dom_obj_style.asp
- W3Schools HTML forms: https://www.w3schools.com/html/html_forms.asp
- MDN DOM: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- MDN Element: https://developer.mozilla.org/en-US/docs/Web/API/Element
- MDN addEventListener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
- domevents.dev (from the DOM lesson): https://domevents.dev/

**Exam**

- mokymas.lt (theory test): https://mokymas.lt/

- ___ (add your own)

## 6. Strategy

**Theory (30 Q / 30 min)**
- ~1 min per question; unsure → choose, mark it, come back at the end.
- Cross out the surely-wrong options first. Round buttons = one answer; squares = one or more.
- Code questions: trace on paper (variables in columns). Error questions: the 3 questions (can it be read? does the name exist? is the value used wrongly?).
- Read **what** they ask: the value **after** the loop? the type? the printed output?

**Practical (~7 tasks, ~2 h)**
1. First 5 min: read **all** tasks; mark easy / medium / hard.
2. Easy ones first; ~15 min per task, then move on.
3. Do **exactly** what the task says ("arrow function", "ternary", "use prompt"…). Points are given per part.
4. Meaningful camelCase names; functions = verbs; arrow functions.
5. Never delete an attempt: partial credit. Commented code is OK, but a comment alone earns nothing.
6. DOM task: worth more, but you can pass without it. Do it when the easy ones are done.
7. Stuck? Check the silly things: autosave, a typo in an id, `defer`, `.value` → `Number()`, `preventDefault()`.
8. ~20:10: upload a first zip. At the end: final zip + upload (GitHub link **and** zip).

## 7. Notes (open, add anything)

- 
