# Dates: cheat sheet (must remember)

Full version: [[dates-learned]] — same section numbers. ❗ = my quiz mistake.

## 1. Timestamp
- A date = **ms since 1970-01-01 00:00 UTC**. Negative = before 1970. 1 day = `86400000` ms.
- `Date.now()` → **number** (ES5) · `new Date()` → **object** (now).
- One number in `new Date(n)` = **ms**: `new Date(2026)` → year 1970!

## 2. Creating
- `new Date()` · `new Date(ms)` · `new Date("2026-10-06")` · `new Date(2026, 9, 6, 17, 30)`.
- Parts form: **month 0–11** (9 = October); missing parts = 0. In a string `"2026-10-06"` month is normal.
- ⚠ Write strings as `YYYY-MM-DD` (`"01/12/2018"` = 12 January).

## 3. Getters ❗ Q57
| Method | Range |
|---|---|
| `getFullYear()` | 2026 |
| `getMonth()` | **0–11** → `+ 1` for people |
| `getDate()` | 1–31 (day of month) |
| `getDay()` | **0–6, 0 = Sunday** ⚠ (lesson said Monday) |
| `getHours()` / `getMinutes()` / `getSeconds()` | 0–23 / 0–59 / 0–59 |
| `getTime()` | timestamp |
- `new Date(2026, 9, 6)` → `getMonth()` **9** · `getDate()` **6** · `getDay()` **2** (Tuesday) ❗.

## 4. Setters
- `setFullYear()`, `setMonth()`, `setDate()`, `setHours()`… **change the date** (mutate). `const` is fine.

## 5. Comparing
- `<` `>` `<=` `>=` work (compare timestamps).
- `a === b` → `false` for two objects → `a.getTime() === b.getTime()`.

## 6. Arithmetic
- Days between: `(b - a) / 86400000` (`+` joins text!).
- Age approx: ms ÷ 1000 ÷ 3600 ÷ 24 ÷ 365, round down — inexact (leap years).

## 7. Names
- `months[d.getMonth()]` (array from January) · `days[d.getDay()]` (array from **Sunday**).

## 8. Moment.js
- `npm install moment` + `"type": "module"` → `import moment from "moment";` → `moment()` = now.
- Not needed for tasks; maintenance mode since 2020.

## Look-alikes
- `getDate()` (1–31) · `getDay()` (weekday, 0 = Sunday).
- `getMonth()` 0–11 · `getMonth() + 1` for people.
- `new Date()` (object) · `Date.now()` (number).
- `new Date(2026)` (ms) · `new Date(2026, 0)` (year).
- `a < b` (time) · `a === b` (reference).
- `get…` reads · `set…` mutates.
