# DOM: cheat sheet (must remember)

Full version: [[dom-learned]] — same step numbers. Exam: **one DOM task** in the practical.

## 1. Basics
- DOM = HTML page as objects (bridge JS ↔ HTML). Tree: element nodes, **text nodes (incl. whitespace)**, comments.
- Script after HTML: `<script src="app.js" defer>` in `<head>` or before `</body>` — otherwise `null`.

## 2. Find
| Signature | Returns |
|---|---|
| `document.getElementById(id)` | element / `null` — **no `#`** |
| `document.querySelector(css)` | first match / `null` — `"#id"`, `".cls"`, `"p"` |
| `document.querySelectorAll(css)` | all matches (snapshot) |
| `document.getElementsByClassName(cls)` / `ByTagName(tag)` | live collection → `[0]` |

## 3. Content
- `el.innerHTML = "…"` replaces (HTML) · `+=` appends · `el.textContent` plain text · read = same property.

## 4. Attributes
- `setAttribute(name, value)` · `getAttribute(name)` → string / `null` · `removeAttribute(name)` · `setAttribute("disabled", "")`.

## 5. Style / classes
- `el.style.backgroundColor = "red"` (camelCase, units: `"50px"`) · `style.display = "none"`.
- `classList.add / remove / toggle(cls)` · `className = "x"` overwrites all.

## 6. Events
- `el.addEventListener("click", f)` — **no `()`** · HTML `onclick="f()"` — **with `()`**.
- Handler gets `e`: `e.target` (property) · `e.preventDefault()` (method) · `e.clientX/Y`.
- `change` = value committed · `input` = every keystroke · `blur` = this element lost focus.

## 7. Forms
- `form.addEventListener("submit", (e) => { e.preventDefault(); … })`.
- `input.value` → **string** → `Number(...)` for maths.
- Radio chosen: `querySelector('input[name="g"]:checked')` → `null` if none → check first.

## 8. Create / insert
| Signature | Note |
|---|---|
| `document.createElement(tag)` / `createTextNode(text)` | only in memory |
| `parent.appendChild(child)` | makes it visible, last child |
| `parent.insertBefore(newEl, existingChild)` | on the **parent** |
| `parent.replaceChild(newEl, oldEl)` | **new first** |
| `el.remove()` | delete |

## 9. Navigate
- `parentNode` · `children` (elements) vs `childNodes` (+ `#text`) · `nextElementSibling` vs `nextSibling` (often `#text`).

## Look-alikes
- `getElementById("x")` · `querySelector("#x")`.
- `querySelector` → one · `querySelectorAll` → all.
- `innerHTML` (HTML) · `textContent` (text) · `value` (form field).
- `f` (pass) · `f()` (call now).
- `submit` on form · `click` on button.
- `replaceChild(new, old)` — not `(old, new)`.
- `createElement` without `appendChild` → invisible.
- `value` attribute (real value) · `placeholder` (grey hint).
