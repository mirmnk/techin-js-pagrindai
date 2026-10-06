# Strings: cheat sheet (must remember)

Full version: [[strings-learned]] — same section numbers. ❗ = my quiz mistake.

**Mode:** ⭐ my course always uses `"use strict"`. **No string method changes the string** → save the result: `s = s.trim();` (needs `let`).

## 1. Quotes
- `'…'` = `"…"`; `` `…${x}…` `` only in backticks (also multi-line). Teacher: prefer backticks.
- Escapes: `\n` new line · `\"` `\'` quote · `\\` backslash · `\t` tab.

## 2. length and indexes
- `s.length` — **property**, `s.length()` → TypeError (not a function).
- `s[0]`, `s.charAt(0)`; last `s[s.length - 1]` (ES2022: `s.at(-1)`).
- Out of range: `s[10]` → `undefined`, `s.charAt(10)` → `""`. `""[0].toUpperCase()` → TypeError.

## 3. Immutable ❗ Q52
- 🔒 `s[0] = "L"` → **TypeError** (string is read-only) → nothing after it runs. Normal mode: ignored.
- Build a new one: `w = w[0].toUpperCase() + w.slice(1);`

## 4. Case and spaces
- `toUpperCase()` / `toLowerCase()` · `trim()` both ends (inner spaces stay).
- Chain: `input.trim().toLowerCase()`. `prompt` Cancel → `null.trim()` → TypeError.

## 5. Searching
- `includes(x, pos?)` → boolean, **case-sensitive** → `s.toLowerCase().includes("java")`.
- `search(regex)` → not allowed (no regex).

## 6. slice vs substring
- Both `(start, end)`, **end not included**, one argument → to the end.
- `slice(-3)` = last 3 · `slice(0, -1)` = drop last · `substring` makes negatives `0` and swaps start/end. **Use `slice`.**
- `substr(start, length)` ⚠ old.

## 7. split / join / replace
- `str.split(sep)` → **array** of strings (`" "` words, `""` chars, no arg → one item). `arr.join(sep)` → string (**array** method; default `","`).
- `replace(a, b)` → **first** match · `replaceAll(a, b)` (ES2021) → all; ES6: `split(a).join(b)`.
- `concat(" ", b)` — no separator parameter, just glues arguments.

## 8. String ↔ array ❗ Q55
- `[...s]` best (emoji safe) · `split("")` · `Array.from(s, fn)` · `for...of`.
- Reverse: `s.split("").reverse().join("")` (strings have no `reverse`).
- `"level".split("").reverse().join("") === "level"` → **`true`** (result is a string).

## 9. Comparing
- `===` by **characters**; case and spaces matter.
- `<` by **character codes**: capitals before small letters (`"B" < "a"` → `true`); `"11" < "3"` → `true`; `"11" < 3` → `false`.

## 10. Counting, regex
- Count a character: loop + counter · `split(ch).length - 1` · `[...s].filter(c => c === ch).length`.
- **No regex** in course tasks.

## Look-alikes
- `str.length` (property) · `str.length()` → TypeError.
- `s[10]` → `undefined` · `s.charAt(10)` → `""`.
- `s[0] = "L"` → 🔒 TypeError · `arr[0] = "L"` → changes the array.
- `replace` → first · `replaceAll` → all.
- `slice(-3)` → last 3 · `substring(-3)` → whole string.
- `split` (string → array) · `join` (array → string).
- `"ab" === "ab"` → `true` · `["a"] === ["a"]` → `false`.
