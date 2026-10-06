# Dates: everything from the course

Sources: lesson 07 "Datos" (2026-09-22: slides `7_datos` + recording), wiki page `date-object`, lesson-07 notes, lesson-12 Kahoot notes, and **my quiz mistakes** ([[quiz-log]]). npm / ESLint from the same lesson: [[tooling-learned]]. Short version: [[dates-cheatsheet]].

**Legend:** `name(arg?)` → return value (`?` = optional) · ❗ = I got this wrong in a quiz (quiz + question) · ⚠ = lesson mistake or trap.

**Every value is checked in Node** (2026-10-05), with `"use strict"`, time zone **Europe/Vilnius**. Printed dates depend on the computer's clock and time zone, so the examples show getter results, not the full printout.

**Contents:** 1 Timestamp · 2 Creating a date · 3 Reading parts (get…) · 4 Changing parts (set…) · 5 Comparing dates · 6 Date arithmetic · 7 Month and weekday names · 8 Moment.js · My mistakes · Recall

---

## All Date functions (declarations)

| Declaration | Returns | Changes the date? |
|---|---|---|
| `new Date()` | Date object = **now** | — |
| `new Date(ms)` | Date from a timestamp | — |
| `new Date(dateString)` | Date from text (`"2017-10-05"`) | — |
| `new Date(year, monthIndex, day?, h?, min?, s?, ms?)` | Date from parts; **month 0–11**; missing parts = 0 | — |
| `Date.now()` (ES5) | **number** — current timestamp | — |
| `date.getTime()` | number — timestamp (ms since 1970) | no |
| `date.getFullYear()` | number, 4 digits | no |
| `date.getMonth()` | number **0–11** (0 = January) | no |
| `date.getDate()` | number 1–31 (day of the **month**) | no |
| `date.getDay()` | number **0–6, 0 = Sunday** (day of the **week**) | no |
| `date.getHours()` / `getMinutes()` / `getSeconds()` / `getMilliseconds()` | number 0–23 / 0–59 / 0–59 / 0–999 | no |
| `date.setFullYear(year)` / `setMonth(m)` / `setDate(d)` / `setHours(h)` / `setMinutes(m)` / `setSeconds(s)` / `setMilliseconds(ms)` / `setTime(ms)` | the new timestamp | ⚠️ **yes** (mutates) |

---

## 1. Timestamp

- JS does not store "6 October" or "Tuesday". It stores **one number**: milliseconds since **1970-01-01 00:00 UTC** = the **timestamp**.
- After 1970 → positive; before 1970 → **negative**. 1 s = 1000 ms; 1 day = `24 * 3600 * 1000` = `86400000` ms.
- A **number** in `new Date(…)` means **milliseconds**, not a year.

```javascript
new Date(0).getFullYear();             // 1970 — the start of JS time (1 January 1970)
new Date(0).getTime();                 // 0
new Date(86400000).getDate();          // 2    — +1 day = 2 January 1970
new Date(-86400000).getFullYear();     // 1969 — negative = before 1970 (31 December 1969)
new Date(2026).getFullYear();          // 1970 — 2026 MILLISECONDS, not the year 2026!
typeof Date.now();                     // "number" — the current timestamp, no object
typeof new Date();                     // "object"
```

- `Date.now()` = `new Date().getTime()`, without creating an object (ES5).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `new Date()` | `Date.now()` | Date object vs number (timestamp) |
| `new Date(2026)` | `new Date(2026, 0)` | 2026 ms after 1970 vs 1 January 2026 |
| `Date.now().getMonth()` | `new Date().getMonth()` | TypeError (not a function — a number) vs month |

---

## 2. Creating a date

| Form | Example | Meaning |
|---|---|---|
| now | `new Date()` | from the computer's clock |
| timestamp | `new Date(1607110465663)` | ms since 1970 |
| string | `new Date("2017-10-05")` | from text |
| parts | `new Date(2017, 9, 5, 14, 30)` | year, **month (0–11)**, day, h, min, s, ms |

```javascript
const d = new Date(2017, 9, 5, 14, 30);   // 9 = OCTOBER (month counts from 0)
d.getFullYear();   // 2017
d.getMonth();      // 9
d.getDate();       // 5
d.getHours();      // 14
d.getSeconds();    // 0 — missing parts are 0

new Date(2011, 0, 1);                    // 1 Jan 2011, 00:00:00 (same as (2011, 0, 1, 0, 0, 0, 0))
new Date(2011, 0, 1, 2, 3, 4, 567);      // 1 Jan 2011, 02:03:04.567
new Date("2026-10-06").getMonth();       // 9 — in a string, "10" is October
```

- The month in the **parts** form also counts from **0**. The month in a **string** is normal: `"2026-10-06"` = October.
- A date written as text is **just a string** until you pass it to `new Date(…)`.
- ⚠ The slide compares `new Date("01/12/2018")`: Node reads it as **month/day** → 12 January (`getMonth()` → `0`). Write strings as `YYYY-MM-DD`.
- The result depends on the computer's clock and time zone (the teacher's school PC showed a wrong time).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `new Date(2026, 9, 6)` | `new Date("2026-10-06")` | month 9 = October (0-based) vs `10` = October in text |
| `new Date(2026)` | `new Date(2026, 0)` | 2026 ms (year 1970) vs 1 January 2026 |
| `"2026-10-06"` | `new Date("2026-10-06")` | just a string vs a Date |

---

## 3. Reading parts (get…) ❗ big test Q57

| Method | Range | Trap |
|---|---|---|
| `getFullYear()` | 4 digits | |
| `getMonth()` | **0–11** | 9 = **October** → for people: `getMonth() + 1` |
| `getDate()` | **1–31** | day of the **month** |
| `getDay()` | **0–6** | day of the **week**, **0 = Sunday** |
| `getHours()` | 0–23 | |
| `getMinutes()` / `getSeconds()` | 0–59 | |
| `getMilliseconds()` | 0–999 | |
| `getTime()` | timestamp | |

```javascript
const exam = new Date(2026, 9, 6);   // Tue 6 October 2026
exam.getMonth();       // 9   — October (0-based)       ❗ Q57
exam.getDate();        // 6   — day of the month         ❗ Q57
exam.getDay();         // 2   — Tuesday (0 = Sunday)     ❗ Q57
exam.getMonth() + 1;   // 10  — month number for people
new Date(2026, 9, 4).getDay();   // 0 — Sunday
new Date(2026, 9, 5).getDay();   // 1 — Monday
```

❗ **Q57:** I answered "September, a date, Tuesday" — getters return **numbers**: `9`, `6`, `2`.

⚠ **Lesson mistake:** `getDay()` **0 is Sunday**, not Monday. Monday = 1 … Saturday = 6.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `getDate()` | `getDay()` | day of month 1–31 vs weekday 0–6 |
| `getMonth()` | `getMonth() + 1` | 0–11 (for arrays) vs 1–12 (for people) |
| `getDay()` 0 | Monday | 0 = **Sunday** |
| `getTime()` | `Date.now()` | this date's timestamp vs now |

---

## 4. Changing parts (set…)

- `setFullYear()`, `setMonth()`, `setDate()`, `setHours()`, `setMinutes()`, `setSeconds()`, `setMilliseconds()`, `setTime()` **change the existing Date object** (mutate).

```javascript
const d = new Date(2026, 9, 6);
d.setFullYear(2050);           // d is now 6 Oct 2050 — same day and time
d.getFullYear();               // 2050
```

- `const` + setter is fine: a Date is an **object**, `const` only locks the name ([[types-learned]] section 6).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `getMonth()` | `setMonth(m)` | reads vs changes the date |
| `d.setFullYear(2050)` | `d = new Date(…)` (const `d`) | ✅ changes the object vs TypeError (const can't be changed) |

---

## 5. Comparing dates

- `<`, `>`, `<=`, `>=` **work** on Date objects: JS compares their **timestamps**. Typical use: a birth date can't be in the future.
- `===` compares two Date objects **by reference** → `false` even for the same moment → compare `getTime()`.
- Strings must become Dates first (`new Date(text)`).

```javascript
const a = new Date(2026, 0, 1);
const b = new Date(2026, 0, 1);
a === b;                       // false — two different objects
a.getTime() === b.getTime();   // true  — same moment
a <= b;                        // true
a < b;                         // false
new Date(2030, 0, 1) > new Date(2026, 9, 6);   // true — e.g. "is in the future"
```

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `a < b` | `a === b` | compares timestamps vs compares references |
| `a === b` | `a.getTime() === b.getTime()` | `false` (two objects) vs `true` (same moment) |

---

## 6. Date arithmetic

- Difference = difference of the **timestamps** in ms: `b.getTime() - a.getTime()` (or simply `b - a`).
- ms → bigger units: ÷ 1000 → s, ÷ 3600 → h, ÷ 24 → days, ÷ 365 → years.

```javascript
const start = new Date(2026, 8, 7);   // 7 Sep 2026
const exam  = new Date(2026, 9, 6);   // 6 Oct 2026
exam.getTime() - start.getTime();      // 2505600000 (ms)
(exam - start) / 86400000;             // 29 days
```

- **Age in years (approx.)**: (now − birth) in ms ÷ 1000 ÷ 3600 ÷ 24 ÷ 365, round **down**. It's **inexact** (leap years): for someone born 2000-10-06, on 2026-10-05 it gives `26`, but the real age is 25 (birthday tomorrow).
- `+` with a date **joins text** (`date + 1` → string); use `-` or `getTime()`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `b - a` | `b + a` | ms difference vs joined text |
| `÷ 86400000` | `÷ 1000 ÷ 3600 ÷ 24` | same: ms → days |

---

## 7. Month and weekday names

`getMonth()` / `getDay()` give **numbers** → map them to words with an **array** (index = number) or a `switch`:

```javascript
const months = ["sausis", "vasaris", "kovas", "balandis", "gegužė", "birželis",
  "liepa", "rugpjūtis", "rugsėjis", "spalis", "lapkritis", "gruodis"];
const days = ["sekmadienis", "pirmadienis", "antradienis", "trečiadienis",
  "ketvirtadienis", "penktadienis", "šeštadienis"];   // index 0 = SUNDAY
const exam = new Date(2026, 9, 6);
months[exam.getMonth()];   // "spalis"
days[exam.getDay()];       // "antradienis"
```

- The months array works **because** `getMonth()` starts at 0. The days array must **start with Sunday**.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `months[getMonth()]` | `months[getMonth() + 1]` | correct vs one month too far |
| days array from Sunday | from Monday | correct vs every name one day off |
| array of names | `switch` | short vs long (both fine) |

---

## 8. Moment.js (library)

The lesson installed **Moment.js** through npm as a real example of a package ([[tooling-learned]] section 4):

```javascript
// terminal: npm install moment          (package.json needs "type": "module")
import moment from "moment";
const now = moment();      // now (a Moment object)
console.log(now);
```

- More methods exist (formatting, adding days…), but course tasks are solved **without** libraries. Moment is in **maintenance mode** since 2020.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `moment()` | `new Date()` | Moment object (library) vs built-in Date — both = now |

---

## My mistakes → where they are explained

| Quiz | Question | Topic | Section |
|---|---|---|---|
| big test Q57 | `new Date(2026, 9, 6)`: `getMonth()`, `getDate()`, `getDay()` | getters return numbers: `9`, `6`, `2` | 3 |

---

## Recall from memory (answer, then check)

1. What is a timestamp? Which date is `new Date(0)`?
2. `new Date(2026, 9, 6)` — which month? `getMonth()`, `getDate()`, `getDay()`?
3. `getDay()` returns `0` — which day?
4. `new Date(2026).getFullYear()` — why not 2026?
5. `const a = new Date(2026, 0, 1), b = new Date(2026, 0, 1);` — `a === b`? `a <= b`? How to test "same moment"?
6. How do you get the number of days between two dates?
7. `const d = new Date(); d.setFullYear(2050);` — error? What happens to `d`?
8. Why is "age = ms ÷ … ÷ 365" only approximate?
9. Your weekday-names array starts with "pirmadienis". What goes wrong?
10. How do you install and use Moment.js?

<details><summary>Answers</summary>

1. Milliseconds since 1970-01-01 00:00 UTC. 1 January 1970.
2. October; `9`, `6`, `2` (Tuesday).
3. Sunday.
4. A single number = milliseconds → 2026 ms after 1970 → year 1970.
5. `false` (two objects); `true`; `a.getTime() === b.getTime()`.
6. `(b - a) / 86400000` (ms → days).
7. No error (a Date is an object); `d` itself changes to the year 2050.
8. Leap years — a year is not always 365 days.
9. Every name is one day off: `getDay()` 0 = Sunday.
10. `npm install moment`, `"type": "module"`, `import moment from "moment";`, `moment()` = now.

</details>
