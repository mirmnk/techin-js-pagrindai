# DOM: what we were taught

Source: lessons 10 (DOM I, 2026-09-29) and 11 (DOM II, 2026-09-30), slides `10_DOM_1`, `11_DOM_2`; exam prep 2026-10-02; classmate repo notes (beginner mistakes). Wiki: `wiki/javascript/dom-basics.md`. Short version: [[dom-cheatsheet]]. Quizzes: [[quiz-log]].

**How signatures are written here:** `name(arg1, arg2?)` → return value. `?` = optional argument.

At the exam: **one DOM task** in the practical (worth a bit more, but you can pass without it). Partial code earns partial points.

## All DOM functions and properties used (declarations)

| Declaration | Returns | Changes the page? |
|---|---|---|
| `document.getElementById(id)` | one element / `null` | no |
| `document.getElementsByTagName(tag)` | live `HTMLCollection` | no |
| `document.getElementsByClassName(cls)` | live `HTMLCollection` | no |
| `document.querySelector(cssSelector)` | **first** match / `null` | no |
| `document.querySelectorAll(cssSelector)` | `NodeList` (snapshot, not live) | no |
| `el.innerHTML` | string (content as HTML), read / write | write = yes |
| `el.textContent` | string (plain text), read / write | write = yes |
| `el.setAttribute(name, value)` | `undefined` | yes |
| `el.getAttribute(name)` | string / `null` | no |
| `el.removeAttribute(name)` | `undefined` | yes |
| `el.style.propName` | string, read / write (camelCase) | write = yes |
| `el.className` | string (all classes), read / write | write = yes |
| `el.classList.add(cls)` / `.remove(cls)` / `.toggle(cls)` | `undefined` / `undefined` / `true` if now added | yes |
| `el.addEventListener(type, handler)` | `undefined` | no (attaches a listener) |
| `event.preventDefault()` | `undefined` | stops the default action |
| `event.target` | the element the event happened on (**property**) | — |
| `input.value` | **string** — what the user typed / chose | — |
| `document.createElement(tag)` | new element (only in memory) | no |
| `document.createTextNode(text)` | new text node (only in memory) | no |
| `parent.appendChild(child)` | the appended child | yes — adds as **last** child |
| `parent.insertBefore(newEl, existingChild)` | `newEl` | yes |
| `parent.replaceChild(newEl, oldEl)` | the removed `oldEl` | yes |
| `el.remove()` | `undefined` | yes |

---

## Step 1. What the DOM is

- **DOM** (Document Object Model) = the HTML page turned into objects; the **bridge** between JS and HTML.
- HTML = structure · CSS = look · JS = interactivity (without JS a button does nothing).
- `window` (browser window) contains: **DOM** (`document`), **BOM** (`history`, `location`, `screen`), and JS itself.
- **DOM tree** of nodes: `document` on top → element nodes (tags), **text nodes** (text, and also the Enter/spaces between tags), comment nodes.
- Script must run **after** the HTML exists: `<script src="app.js" defer>` in `<head>`, or `<script>` just before `</body>`. Otherwise `getElementById` → `null`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| DOM | BOM | the page (`document`) vs the browser (`history`, `location`, `screen`) |
| HTML file | DOM | the text you wrote vs the live objects in the browser (JS changes only the DOM, never the file) |
| element node | text node | a tag vs text — including whitespace between tags |

---

## Step 2. Finding elements

```javascript
const root  = document.getElementById("root");        // NO # — just the id
const logo  = document.querySelector("#logo");        // CSS selector: # = id
const intro = document.querySelector(".intro");       // . = class, first match
const items = document.querySelectorAll("li");        // all matches
const ps    = document.getElementsByTagName("p");     // collection → ps[0], ps.length
```

- The id must match **exactly** (case too) and be **unique** on the page. Wrong id → `null` → next line `.innerHTML` on `null` → **TypeError**.
- Collections: use `[0]`, `.length`, `for...of`. They are **not arrays** (no `map` / `filter`).
- Teacher: use `getElementById` for now; `querySelector` is the most popular today.
- The result is a **reference** to the element — keep it in a variable; check with `console.log(el)` in the browser console.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `getElementById("logo")` | `querySelector("#logo")` | id without `#` vs CSS selector with `#` |
| `querySelector` | `querySelectorAll` | first element / `null` vs all matches (collection, empty if none) |
| `getElementsByClassName` | `querySelectorAll(".x")` | live (updates when the page changes) vs snapshot |
| `getElementById` (one) | `getElementsBy…` (**s**) | one element vs a collection → needs `[0]` |

---

## Step 3. Changing content

```javascript
const p = document.getElementById("p1");
p.innerHTML = "<b>New</b> text";   // replaces, HTML tags work
p.innerHTML += " more";            // appends
p.textContent = "Plain text";      // text only, tags shown as text
const now = p.innerHTML;           // read
div.innerHTML = div.innerHTML ? "" : "Labas";   // toggle text with a ternary
```

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `innerHTML` | `textContent` | parses HTML tags vs plain text only (safer for user input) |
| `innerHTML = x` | `innerHTML += x` | replaces vs appends |
| `el.innerHTML` (element content) | `input.value` (form field) | text inside a tag vs what the user typed in a field |

---

## Step 4. Attributes

```javascript
img.setAttribute("src", "images/b.png");   // add or change (image swap demo)
link.getAttribute("href");                 // read → string / null
el.removeAttribute("id");
btn.setAttribute("disabled", "");          // button becomes grey, unclickable
```

- Attributes = what's written inside the opening tag: `id`, `src`, `alt`, `href`, `class`, `disabled`.
- `<img>` needs `alt` (shown if the image fails; read by screen readers).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `setAttribute("src", x)` | `img.src = x` | both work for common attributes |
| `value` attribute | `placeholder` attribute | real starting value (gets submitted) vs grey hint text (⚠ mixed up in the lesson) |

---

## Step 5. Styles and classes

```javascript
el.style.backgroundColor = "lightblue";   // CSS background-color → camelCase
el.style.fontSize = "50px";               // value = string WITH unit
el.style.display = "none";                // hide
el.style.cssText = "color: blue; background: white";   // several at once

el.className = "bell";             // overwrites ALL classes
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");     // add if missing, remove if present (most useful)
```

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `style.backgroundColor` | `style.background-color` | ✅ vs ❌ (`-` would mean minus) |
| `className = "x"` | `classList.add("x")` | replaces all classes vs adds one |
| `classList.toggle` | `add` / `remove` | switches on/off vs one direction |
| `style.…` | `classList` | one inline property vs switching a CSS class (cleaner) |

---

## Step 6. Events

```javascript
const button = document.getElementById("button");
button.addEventListener("click", showImage);        // function WITHOUT ()
button.addEventListener("click", (e) => {           // or an arrow right here
  e.target.style.backgroundColor = "yellow";        // e.target = clicked element
  console.log(e.clientX, e.clientY);                // mouse coordinates
});
```

```html
<button onclick="showImage()">Show</button>   <!-- in HTML: WITH () -->
```

| Event | When |
|---|---|
| `click` | element clicked |
| `load` | page finished loading |
| `change` | form field value **committed** (blur / Enter) — ⚠ not every keystroke |
| `input` | every keystroke (not in slides, the correct one for "live" checks) |
| `mouseover` / `mouseout` | mouse onto / off the element |
| `focus` / `blur` | field gets / **loses** focus |
| `submit` | form submitted |
| `keydown` / `keyup` | key pressed / released (`keypress` is deprecated) |

- The handler gets an **event object** (`e` / `event`): `e.target` (property, no `()`), `e.preventDefault()` (method).
- `addEventListener` can attach several handlers; `el.onclick = f` keeps only one.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `addEventListener("click", f)` | `addEventListener("click", f())` | passes the function (runs on click) vs calls it **now** and passes its result (`undefined`) |
| `"click"` | `"onclick"` | event name in `addEventListener` vs HTML attribute / property name |
| `onclick="f()"` (HTML) | `el.onclick = f` (JS) | with `()` vs without |
| `change` | `input` | when the value is committed vs every keystroke |
| `e.target` | `e.preventDefault()` | property vs method |

---

## Step 7. Forms

```javascript
const form = document.querySelector("#carsForm");
const fname = document.querySelector("#fname");

form.addEventListener("submit", (event) => {
  event.preventDefault();                         // 1. stop the page reload
  const name = fname.value;                       // 2. read .value (a STRING)
  const amount = Number(document.querySelector("#bill").value);   // numbers → convert!
  const checked = document.querySelector('input[name="gender"]:checked');
  const gender = checked ? checked.value : "";    // null if nothing chosen
});
```

- Listen for **`submit` on the form**, not `click` on the button.
- Submit **reloads the page** by default → `preventDefault()` first, or everything flashes and disappears.
- `.value` is always a **string** → `Number(...)` before maths (`"10" + 5` → `"105"`).
- Radio buttons with the **same `name`** = one group, one choice. `:checked` finds the chosen one; `null` if none.
- Structure: `<form>` → `<label>` + `<input type="text">`, `<select>` + `<option>`, `<input type="radio">`, `<input type="submit">`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `form` + `"submit"` | `button` + `"click"` | values final, Enter works vs only the click |
| `input.value` | `input` (the element) | its text vs the element itself (forgetting `.value` → you print `[object HTMLInputElement]`) |
| `.value` | `Number(input.value)` | string vs number |

---

## Step 8. Creating, inserting, removing elements

```javascript
const p = document.createElement("p");             // only in memory
const text = document.createTextNode("New");       // only in memory
p.appendChild(text);                               // text into <p>
p.className = "content";                           // can set things before attaching
document.getElementById("container").appendChild(p);   // NOW visible (last child)

list.insertBefore(newLi, list.children[0]);        // called on the PARENT
list.replaceChild(newLi, oldLi);                   // NEW first, OLD second
oldLi.remove();
```

- Created elements are **invisible** until attached to an element already on the page (often an empty `<div id="container">`).
- JS-created / removed elements never appear in the HTML file, only in the browser.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `createElement` | `appendChild` | makes it (memory) vs shows it (page) — forgetting `appendChild` = nothing appears |
| `replaceChild(new, old)` | `replaceChild(old, new)` | ✅ vs ❌ — new comes **first** |
| `parent.insertBefore(newEl, ref)` | `newEl.insertBefore(...)` | ✅ called on the parent vs ❌ (⚠ mixed up in the lesson) |
| `appendChild` | `insertBefore` | at the end vs before a given child |
| `el.remove()` | `parent.replaceChild` | delete vs swap |

---

## Step 9. Navigating the tree (know it, rarely used)

| Property | Gives |
|---|---|
| `parentNode` | the parent |
| `childNodes` | all child nodes, **including whitespace `#text`** |
| `children` | only child **elements** |
| `firstChild` / `lastChild` | first / last node (may be `#text`) |
| `previousSibling` / `nextSibling` | node before / after (may be `#text`) |
| `previousElementSibling` / `nextElementSibling` | element before / after (skips text) |
| `nodeName` | `"P"`, `"HR"`, `"#text"` |

- The Enter between tags is a text node → `nextSibling` often gives `#text` → use `nextElementSibling`.
- In practice: just put an `id` on what you need.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `nextSibling` | `nextElementSibling` | any node (often `#text`) vs only elements |
| `childNodes` | `children` | with text nodes vs elements only |

---

## Beginner mistakes (lessons + classmate notes)

1. `getElementById("#id")` — no `#` here (only in `querySelector`).
2. Script runs before the HTML → `null` → TypeError. Use `defer` / script at the end of `<body>`.
3. Forgetting `appendChild` → created element never shows.
4. `replaceChild(old, new)` → order is **new, old**.
5. Forgetting `event.preventDefault()` on `submit` → page reloads.
6. Forgetting `.value` (printing the element) or forgetting `Number(...)` (string maths).
7. `addEventListener("click", f())` → calls `f` immediately.
8. `style.background-color` → use camelCase `backgroundColor`; values need units (`"50px"`).
9. `getElementsByClassName(...)` used like one element → needs `[0]`.

## Recall from memory (answer before looking)

1. What does `document.getElementById("x")` return if there is no such id?
2. Which argument comes first in `replaceChild`?
3. Why `preventDefault()` in a `submit` handler?
4. What type is `input.value`?
5. `nextSibling` vs `nextElementSibling`?
