# Strings: everything from the course

Sources: lesson 08 "Eilutės" (2026-09-24: slides `8_Strings` + recording), wiki page `strings`, lesson-08 notes, lesson-12 Kahoot notes, and **my quiz mistakes** ([[quiz-log]]). Short version: [[strings-cheatsheet]].

**Legend:** `name(arg?)` → return value (`?` = optional) · ❗ = I got this wrong in a quiz (quiz + question) · 🔒 = differs in strict mode · ⚠ = lesson mistake or trap · ES2016+ features are tagged (course = ES6) with the ES6 alternative.

**Every value is checked in Node** (2026-10-05), **with `"use strict"`** (my course always uses it).

**Contents:** 1 Quotes, escapes, template literals · 2 `length` and indexes · 3 Immutable · 4 Case and spaces · 5 Searching · 6 Cutting: `slice` / `substring` · 7 Splitting, replacing, joining · 8 String ↔ array · 9 Comparing strings · 10 Counting characters, regex · My mistakes · Recall

---

## All string methods from the course (declarations)

**No string method changes the string.** Every method **returns a new value** → save it in a variable.

| Declaration | Returns |
|---|---|
| `str.length` (**property**, no `()`) | number of characters |
| `str[index]` | 1-letter string / `undefined` |
| `str.charAt(index)` | 1-letter string / `""` |
| `str.toUpperCase()` / `str.toLowerCase()` | new string |
| `str.trim()` | new string, spaces cut at **both** ends |
| `str.includes(search, position?)` | boolean, **case-sensitive** |
| `str.slice(start, end?)` | piece; `end` **not** included; negatives = from the end |
| `str.substring(start, end?)` | piece; `end` not included; negatives → `0`; swaps if start > end |
| `str.substr(start, length)` | piece by **length** — ⚠ old (deprecated), don't use |
| `str.split(separator)` | **array** of strings |
| `arr.join(separator? = ",")` | string — an **array** method |
| `str.replace(search, newText)` | new string, **first** match only |
| `str.replaceAll(search, newText)` (ES2021) | new string, **all** matches — ES6: `str.split(search).join(newText)` |
| `str.concat(str1, str2?, …)` | new string, arguments glued in order |
| `str.search(regex)` | index / `-1` — ⚠ regex **not allowed** in tasks |

---

## 1. Quotes, escape characters, template literals

- Quotes separate **text** from **names**: `name` = a variable, `"name"` = text.
- `'single'` = `"double"`. `` `backticks` `` = **template literal**: `${expression}` works **only** there, and the text may span several lines. Teacher: **prefer backticks** (no quote juggling).
- HTML written in JS (`"<p>Hi</p>"`) is also just a string.
- **Escape character** `\` = "the next character is not code":

| Escape | Result |
|---|---|
| `\n` | new line |
| `\"` / `\'` | a quote inside the same kind of quotes |
| `\\` | one backslash (`"C:\\temp".length` → `7`) |
| `\t` | tab |

```javascript
"She said \"hi\"";        // escape the quote
'She said "hi"';          // or mix quote kinds
`She said "hi"`;          // or use backticks — no escaping needed
'I\'m the Walrus!';       // "I'm the Walrus!"
`2 + 3 = ${2 + 3}`;       // "2 + 3 = 5"
"2 + 3 = ${2 + 3}";       // "2 + 3 = ${2 + 3}" — literal text, no ${} in quotes
`Hello
World`;                   // "Hello\nWorld" — a real line break
```

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `` `${x}` `` | `"${x}"` | inserts the value vs literal text |
| `"\n"` | `"\\n"` | a line break vs backslash + n |
| `name` | `"name"` | a variable vs text |

---

## 2. `length` and indexes

- `str.length` = number of characters (spaces count). It is a **property**: no `()`. Teacher: a very common bug.
- Indexes from **0**, last index = `length - 1` (like arrays).

```javascript
const str = "Hello";
str.length;              // 5
str.length();            // TypeError (not a function — length is a property)
str[0];                  // "H"
str.charAt(1);           // "e"
str[str.length - 1];     // "o"  — last character
str[10];                 // undefined   — out of range
str.charAt(10);          // ""          — out of range
str[-1];                 // undefined   — no negative indexes with [ ]
""[0].toUpperCase();     // TypeError (undefined has no properties) — empty string has no [0]
```

- `str.at(-1)` (ES2022) also gives the last character — ES6: `str[str.length - 1]`.
- Loop over the characters: `for (let i = 0; i < str.length; i++)` (`<`, not `<=`).
- JS has **no `char` type**: one character = a string of length 1 (`typeof "abc"[0]` → `"string"`).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `str.length` | `str.length()` | number vs TypeError (not a function) |
| `str[10]` | `str.charAt(10)` | `undefined` vs `""` |
| `str[str.length]` | `str[str.length - 1]` | `undefined` vs last character |

---

## 3. Immutable: a string can never change ❗ big test Q52

- You **can't change** a string in place (arrays you can). 🔒 My course uses strict mode → trying is a **TypeError**. (Normal mode: silently ignored.)
- ⚠ The slide says `str[0] = 'h'; // error`. True only in strict mode / modules; normal mode ignores it.
- To "change" a string: **build a new one** and assign it (needs `let`).

```javascript
"use strict";
const s = "labas";
s[0] = "L";               // 🔒 TypeError (string is read-only) — normal mode: ignored, s stays "labas"

s.toUpperCase();          // "LABAS" — a NEW string; s is still "labas"
let word = "labas";
word = word[0].toUpperCase() + word.slice(1);   // "Labas" — new string, saved
```

**Q52 in the big test:** `const s = "labas"; s[0] = "L";` then 3 `console.log`s. 🔒 In **strict mode** (my course): TypeError on line 2 → **nothing after it prints**. In normal mode: no error, `labas LABAS labas`. An error always **stops** the program — never "TypeError **and** the next lines".

- Forgetting to save the result is the most common string bug: `name.trim();` alone does nothing useful.
- `const big = s.toUpperCase()` is fine; `const s` + `s = s.toUpperCase()` → TypeError (const can't be changed).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `s[0] = "L"` | `arr[0] = "L"` | 🔒 TypeError (string is read-only) vs changes the array |
| `s.toUpperCase()` | `arr.sort()` | returns a new string vs changes the array itself |
| `s.toUpperCase();` | `s = s.toUpperCase();` | result thrown away vs saved (needs `let`) |

---

## 4. Changing case and removing spaces

```javascript
"Labas".toUpperCase();        // "LABAS"
"Labas".toLowerCase();        // "labas"
"ąčęėįšųūž".toUpperCase();    // "ĄČĘĖĮŠŲŪŽ" — Lithuanian letters work
"  Labas Rytas  ".trim();     // "Labas Rytas" — both ends
" a  b ".trim();              // "a  b"        — inner spaces stay
```

- Typical use: clean user input before checking it: `input.trim().toLowerCase()` (methods can be **chained**, left to right).
- `prompt` Cancel gives `null` → `null.trim()` → TypeError (null has no properties). Check `=== null` first ([[types-learned]] section 5).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `trim()` | inner spaces | only the ends are cut |
| `toUpperCase()` | `toUoerCase()` | method vs TypeError (not a function — typo) |

---

## 5. Searching: `includes`

```javascript
const sentence = "Java is to JavaScript what Car is to Carpet.";
sentence.includes("Java");                    // true
sentence.includes("java");                    // false — case-sensitive!
sentence.toLowerCase().includes("java");      // true  — normalise first
sentence.includes("Java", 20);                // false — 2nd argument = start position
sentence.includes("");                        // true  — empty text is always "inside"
```

- `includes` takes **one** search string, not a list.
- `search(regex)` is on the slides, but **regex is not allowed** in course tasks (section 10).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `"Java".includes("java")` | `"java".includes("java")` | `false` vs `true` (case) |
| `str.includes(x)` | `arr.includes(x)` | part of the text vs one whole item |

---

## 6. Cutting a piece: `slice` vs `substring`

Both: `(start, end)`, **`end` not included**, one argument → to the end of the string.

```javascript
const m = "JavaScript is fun.";
m.slice(0, 10);          // "JavaScript"
m.substring(0, 10);      // "JavaScript"
m.slice(4);              // "Script is fun."
m.slice(-4);             // "fun."               — negative = count from the end
m.substring(-4);         // "JavaScript is fun." — negative becomes 0
m.slice(0, -1);          // "JavaScript is fun"  — drop the last character
m.slice(4, 0);           // ""                   — slice never swaps
m.substring(4, 0);       // "Java"               — substring swaps to (0, 4)
m.substr(4, 6);          // "Script"  ⚠ old: 2nd argument = LENGTH; don't use
```

- Length of the piece = `end - start`. **Use `slice`**: same as the array `slice`, and negatives work.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `slice(-3)` | `substring(-3)` | last 3 characters vs the whole string |
| `slice(4, 0)` | `substring(4, 0)` | `""` vs `"Java"` (swapped) |
| `substring(4, 10)` | `substr(4, 10)` | end index vs length (old) |
| `str.slice(1, 3)` | `arr.slice(1, 3)` | same rules; string piece vs array piece |

---

## 7. Splitting, replacing, joining

```javascript
"What a beautiful world".split(" ");     // ["What", "a", "beautiful", "world"]  — by words
"Labas".split("");                       // ["L", "a", "b", "a", "s"]             — by characters
"a,b,,c".split(",");                     // ["a", "b", "", "c"] — separator disappears
"a b".split();                           // ["a b"] — no separator → one item
"Hello world this is JavaScript".split(" ").join("-");   // "Hello-world-this-is-JavaScript"

"1 abc 2 abc 3".replace("abc", "xyz");      // "1 xyz 2 abc 3" — FIRST match only
"1 abc 2 abc 3".replaceAll("abc", "xyz");   // "1 xyz 2 xyz 3" — ES2021
"1 abc 2 abc 3".split("abc").join("xyz");   // "1 xyz 2 xyz 3" — ES6 way to replace all
"abc".replace("x", "y");                    // "abc" — no match, no error

"Hello".concat(" ", "world!");   // "Hello world!" — arguments glued in order
```

- `split` = **string** method → array of **strings** (numbers inside need `.map(Number)`). `join` = **array** method → string. ⚠ The teacher called both "string methods" (lesson 12): `"a,b".join("-")` → TypeError (not a function — strings have no `join`).
- `split` + take an index = pull one piece out of text (e.g. a word).
- ⚠ `concat` has **no separator parameter** — `" "` is just one more argument. `+` or a template literal does the same.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `replace(a, b)` | `replaceAll(a, b)` | first match vs all (ES2021) |
| `str.split(",")` | `arr.join(",")` | string → array vs array → string |
| `split("")` | `split(" ")` | characters vs words |
| `split()` | `split("")` | one item (whole string) vs characters |
| `str.concat(" ", b)` | `` `${str} ${b}` `` | same result |

---

## 8. String ↔ array

**String → array of characters** (lesson-08 notes, `const s = "Labas"`):

| Way | Result | Emoji 😀 |
|---|---|---|
| `s.split("")` | `["L","a","b","a","s"]` | ⚠ broken into 2 halves |
| `[...s]` (spread) | same | ✅ whole |
| `Array.from(s)` / `Array.from(s, ch => ch.toUpperCase())` | same / `["L","A","B","A","S"]` | ✅ whole |
| `for (let i…)` + `push(s[i])` | same | ⚠ broken |
| `for (const ch of s)` + `push(ch)` | same | ✅ whole |

- Best short form: `[...s]`. Lithuanian letters (ą, č, ė…) work with every way.
- **Array → string**: `arr.join("")` (no separator), `arr.join(" ")`, `arr.join()` → with commas.
- **Reverse a string** = string → array → `reverse()` → `join("")`. Strings have **no** `reverse` (`"abc".reverse()` → TypeError (not a function)).

```javascript
"abc".split("").reverse().join("");                     // "cba"
"level".split("").reverse().join("") === "level";       // true   ❗ big test Q55
```

❗ **Q55:** I answered `false`. After `join("")` the result is a **string** again, and strings compare **by characters** → `true`. (Two arrays would be `false`.)

- **Palindrome idea:** a word that reads the same backwards → reverse it and compare with `===`. Normalise first (case, spaces) if the task needs it.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `[..."ab😀"]` | `"ab😀".split("")` | 3 items vs 4 (emoji broken) |
| `"cba" === "cba"` | `["c"] === ["c"]` | `true` (characters) vs `false` (two arrays) |
| `arr.reverse()` | `"abc".reverse()` | flips the array vs TypeError (not a function) |
| `join("")` | `join()` | `"abc"` vs `"a,b,c"` |

---

## 9. Comparing strings

```javascript
"ab" === "ab";            // true   — same characters ❗ big test Q55
"Ab" === "ab";            // false  — case matters
" Ona" === "Ona";         // false  — spaces matter → trim() first
"5" === 5;                // false  — different types
"a" < "b";                // true   — alphabetical, by character codes
"B" < "a";                // true   — ALL capitals come before small letters
"Zoo".toLowerCase() < "apple".toLowerCase();   // false — normalise first
"11" < "3";               // true   — both strings → character by character
"11" < 3;                 // false  — one number → both become numbers
```

- `===` compares strings **by characters** (arrays/objects by address — [[types-learned]] section 6).
- Input from `prompt` / `input.value` is a string → convert with `Number(...)` before comparing numbers.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `"11" < "3"` | `"11" < 3` | `true` (text order) vs `false` (numbers) |
| `"B" < "a"` | `"b" < "a"` | `true` vs `false` (capitals first) |
| `===` on strings | `===` on arrays | characters vs addresses |

---

## 10. Counting characters, and "regex — not now"

**Ideas** to count how many times a character appears (`"banana"`, `"a"` → 3):

| Idea | How |
|---|---|
| loop + counter | `for` over the indexes, `if (s[i] === ch) count++` |
| `split` | `s.split(ch).length - 1` (pieces = matches + 1) |
| array + `filter` | `[...s].filter(c => c === ch).length` |

- Case-insensitive count → `toLowerCase()` the text first.
- **Regex** (regular expressions) describe text patterns in a few symbols (e.g. password rules). The teacher asks **not** to use regex in course tasks: solve with loops and string methods. Regex comes later (e.g. React course).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `s.split("a").length` | `s.split("a").length - 1` | pieces vs matches |
| loop + `===` | `includes` | how many vs is there any |
| string methods | regex | allowed in tasks vs not now |

---

## My mistakes → where they are explained

| Quiz | Question | Topic | Section |
|---|---|---|---|
| big test Q52 | `s[0] = "L"` then 3 logs | immutable; 🔒 strict → TypeError, nothing after prints | 3 |
| big test Q55 | `"level".split("").reverse().join("") === "level"` | after `join` it's a string; `===` by characters → `true` | 8, 9 |
| error quiz Q6 | `"ona".touppercase()` | TypeError (not a function — typo, case matters) | 4 |

---

## Recall from memory (answer, then check)

1. `"abc".length()` — result?
2. `"use strict"; const s = "hi"; s[0] = "H"; console.log(s);` — what happens?
3. `"Hello"[10]` and `"Hello".charAt(10)`?
4. `"JavaScript".slice(-6)` and `"JavaScript".substring(-6)`?
5. `"a-b-c".replace("-", "+")` — and how to replace **all** in ES6?
6. Is `join` a string method or an array method?
7. `"level".split("").reverse().join("") === "level"`?
8. `"B" < "a"`, `"11" < "3"`, `"11" < 3`?
9. `let s = "  ona "; s.trim(); console.log(s);` — what is printed, and the fix?
10. Three ideas to count the letter `"a"` in a word without regex?

<details><summary>Answers</summary>

1. TypeError (not a function — `length` is a property).
2. 🔒 TypeError (string is read-only); `console.log` never runs. (Normal mode: `"hi"`.)
3. `undefined` and `""`.
4. `"Script"` and `"JavaScript"` (negative → 0).
5. `"a+b-c"` (first only). ES6: `str.split("-").join("+")`; ES2021: `replaceAll`.
6. Array method (`arr.join(sep)` → string). `split` is the string method.
7. `true` — the result is a string; strings compare by characters.
8. `true` (capitals first), `true` (text order), `false` (numbers).
9. `"  ona "` — the result was not saved. Fix: `s = s.trim();`.
10. Loop + counter; `s.split("a").length - 1`; `[...s].filter(c => c === "a").length`.

</details>
