# Arrays: what we covered

Source: Claude chat study sessions, 2026-10-02 → 2026-10-03 (guided steps 1–4 + questions while doing the if-switch tasks).
Short version: [[arrays-cheatsheet]]. Wiki: `wiki/javascript/arrays-basics.md`, `array-methods.md`, `reduce.md`.

**Parameter** = name in the signature (`slice(start, end)`); **argument** = value you pass when calling (`a.slice(1, 3)`).

**How signatures are written here:** `name(arg1, arg2?)` → return value. `?` = optional argument. `fn(value, index, array)` = the callback you pass; JS calls it for each item with these 3 arguments (you can use only the first ones).

## Study plan (guided session) and status

| Step | Topic | Status |
|---|---|---|
| 1 | Basics: create, index, `length`, add/remove at the ends | ✅ done (exercises 5/5) |
| 2 | Looping: `for`, `for...of`, `forEach` | ✅ done |
| 3 | Searching: `indexOf`, `includes`, `find`, `findIndex`, `some`, `every` | ✅ done (7/7) |
| 4 | Transforming: `map`, `filter` | ✅ done (5/7) |
| 5 | `reduce` | ✅ done (7/7) |
| 6 | Cutting and joining: `slice`, `splice`, `concat`, `join`, `split` | ✅ done (8/8) |
| 7 | Ordering: `sort`, `reverse` (+ copy first: `[...a].sort()`, `[...a].reverse()`) | ✅ done (6/6) |
| 8 | Summary: changes the array vs returns a new one, copy vs reference | ✅ done (11/11) |
| 9 | Destructuring, spread, rest (added on request) | ✅ done · exercises 6/8, spread-or-rest recheck ✅, rest-parameter recheck 3/3 |
| 10 | Mixed quiz (one question at a time) | ✅ done — **15/20** (missed: Q3 ½ splice return, Q6 find → undefined, Q7 indexOf no conversion, Q9 ½ rename, Q13 undefined.x → TypeError, Q16 [].every → true) · Re-quiz of missed patterns: **7.5/9** (still weak: `find` not found → `undefined`; `splice` changes the original) · Full arrays quiz 2026-10-04: **22/23** (missed: Q15 splice argument roles) |
| Extra A | `Math.max` / `Math.min` | ✅ (from task questions) |
| Extra B | Winner / tie pattern for 3 values | ✅ (from task 03-10) |

Sections below follow this numbering (Step 1 … Step 10).

### ES versions (course = ES6 / ES2015)

Everything not listed here is ES6 or older. These newer features work in all current browsers, but **for the course/exam prefer the ES6 form**:

| Feature | Version | ES6 alternative |
|---|---|---|
| `a.includes(x)` | ES2016 | `a.indexOf(x) !== -1` |
| `Object.entries(obj)` | ES2017 | `for (const key in obj)` + `obj[key]` |
| `{ ...obj }` object spread / rest | ES2018 | (array spread `[...a]` **is** ES6) |
| `?.` and `??` | ES2020 | taught in lesson 3 anyway (`?.`) |
| `a.at(-1)` | ES2022 | `a[a.length - 1]` |
| `findLast` / `findLastIndex` | ES2023 | loop from the end |
| `a.toSorted(fn)` | ES2023 | `[...a].sort(fn)` or `a.slice().sort(fn)` |
| `a.toReversed()` | ES2023 | `[...a].reverse()` or `a.slice().reverse()` |

---

## Step 1. Basics

```javascript
const a = [10, 20, 30];
a[0];             // 10   indexes start at 0
a[a.length - 1];  // 30   last item
a.at(-1);         // 30   negative index counts from the end
a[5];             // undefined (no error)
a.length;         // 3
a[a.length];      // always undefined (last index is length - 1)
```

- `at(index)` → the item, or `undefined` if out of range. Negative index counts from the end.
- `length` is a **property**, not a function (no `()`): number of items.

### Add / remove at the ends (all four CHANGE the array)

| Signature | Where | Returns |
|---|---|---|
| `push(item1, …, itemN)` | adds one or more at the **end** | new length |
| `pop()` | removes the last item | removed item (`undefined` if empty) |
| `unshift(item1, …, itemN)` | adds one or more at the **start** | new length |
| `shift()` | removes the first item | removed item (`undefined` if empty) |

push/pop = back of the array; shift/unshift = front.

### Reference, not copy

- `const b = a;` → **same** array under two names. `b.push(99)` changes `a` too.
- `const arr` can still be changed with `push`, `pop`, `arr[0] = …`. `const` only forbids **reassigning**: `arr = [4, 5]` → `TypeError: Assignment to constant variable` (at run time).
- `[1, 2] === [1, 2]` → `false` (two different arrays).
- `typeof []` → `"object"`; check with `Array.isArray(value)` → `true` / `false` (static: called on `Array`, like `Number.isInteger`).
- `arr.length = 1` cuts the array.
- Copy: `[...a]` (spread) gives a new array with the same items.

### Writing past the end: holes

```javascript
const a = [];
a[5] = "x";
a.length;     // 6 — length = last index + 1
a;            // [ <5 empty items>, "x" ]   5 "holes" (empty slots)
a[0];         // undefined (reading a hole)
```

- Writing beyond the end is **not** an error: JS fills the gap with **holes** and sets `length` to last index + 1.
- Loops treat holes differently: `forEach` / `map` **skip** them (callback runs once here); `for...of` / classic `for` give `undefined` for each hole.
- `arr.length = 1` cuts; setting `length` bigger only adds holes. `delete arr[1]` leaves a hole (use `splice` to really remove).

### Index vs ordinary property

An array is an object, so you can put **any** key on it — but only **index keys** (whole numbers 0, 1, 2…) are array items.

```javascript
const a = [];
a[5] = "x";        // index → item, length becomes 6
a["2"] = "s";      // "2" is the same as index 2 → item
a[-1] = "neg";     // NOT an index → ordinary property
a[1.5] = "half";   // NOT an index → ordinary property
a.foo = "bar";     // ordinary property

a.length;          // 6 — ordinary properties don't count
a[-1];             // "neg"  (the property named "-1", not the last item!)
a.at(-1);          // "x"    (at() really counts from the end)
```

| Key | Kind | Changes `length`? | Seen by `forEach` / `map` / `for...of` / `join`? | Seen by `for...in`? |
|---|---|---|---|---|
| `0`, `5`, `"2"` | index (item) | yes | yes | yes |
| `-1`, `1.5`, `"foo"` | ordinary property | no | **no** | yes |

- That's why `a[-1]` doesn't give the last item: it reads (or writes) a property literally named `"-1"`.
- One more reason to avoid `for...in` on arrays: it also lists ordinary properties.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `a.at(-1)` | `a[-1]` | `at` understands negative indexes → last item; `a[-1]` → `undefined` (looks for a property named "-1") |
| `a.push(x)` | `a.unshift(x)` | same job, other end: push = end, unshift = start (both change the array, both return new length) |
| `a.pop()` | `a.shift()` | same job, other end: pop = last, shift = first (both return the removed item) |
| `a.push(x)` | `[...a, x]` / `a.concat(x)` | push **changes** `a`; spread / `concat` build a **new** array, `a` untouched. (`concat(value1, …)` → new array — section 6) |
| `const b = a` | `const b = [...a]` | same array (reference) vs a **copy** (changing `b` doesn't touch `a`) |
| `Array.isArray(x)` | `typeof x` | `typeof []` → `"object"` (can't tell array from object); `Array.isArray` → `true` / `false` |
| `const arr` + `push` | `const arr` + `arr = …` | changing the **contents** is allowed; **reassigning** the variable → TypeError |

---

## Step 2. Looping

```javascript
for (let i = 0; i < a.length; i++) { a[i] }   // classic: index, any step, backwards, break
for (const x of a) { x }                      // VALUES
a.forEach((x, i) => { });                     // value + index, no break
for (const [i, x] of a.entries()) { }         // value + index with for...of
for (const i in a) { }                        // ⚠️ INDEXES AS STRINGS "0","1","2" — for objects, not arrays
```

- `forEach(fn(value, index, array))` → `undefined` (always). Runs `fn` once per item; `fn`'s return value is ignored.
- `entries()` → iterator of `[index, value]` pairs · `keys()` → iterator of indexes · `values()` → iterator of values (details below).

| Need | Use |
|---|---|
| just the values | `for...of` |
| index / step ≠ 1 / backwards | classic `for` (e.g. `i += 2` for even indexes) |
| stop early | `for` / `for...of` with `break` |
| value + index, short | `forEach((x, i) => …)` |

### `entries()`: index + value pairs

```javascript
const a = ["a", "b"];

for (const [i, x] of a.entries()) {
  console.log(i, x);           // 0 "a"   then   1 "b"
}
// console.log(value1, …, valueN) → undefined; prints the values separated by spaces

[...a.entries()];              // [[0, "a"], [1, "b"]]
[...a.keys()];                 // [0, 1]      indexes only
[...a.values()];               // ["a", "b"]  values only
```

- `a.entries()` gives `[index, value]` pairs, one per item; the index is a **number** (unlike `for...in`).
- `const [i, x]` = destructuring: unpacks each pair into two variables.
- It is an *iterator*, not an array: `a.entries().length` → `undefined`. Use it in `for...of` or spread it `[...]`.
- Use it when you need index + value **and** `break` (which `forEach` can't do).
- Objects have a similar one: `Object.entries(obj)` → **array** `[[key, value], …]` with **string** keys (`Object.entries({x: 1})` → `[["x", 1]]`).

### Changing the array inside a loop callback

```javascript
const a = [1, 2, 3];
a.forEach((x, i) => { a[i] = x * 2; });        // a → [2, 4, 6]  ✅ works (write by index)
a.forEach((x, i, arr) => { arr[i] = x * 2; }); // same, using the 3rd argument
a.forEach(x => { x = x * 2; });                // a unchanged — x is only a copy

const people = [{ s: 1 }, { s: 2 }];
people.forEach(p => { p.s *= 10; });           // objects DO change: p points to the same object
```

- Numbers/strings in the array: only `a[i] = …` (or `arr[i] = …`) changes them; assigning to `x` doesn't.
- Objects in the array: `p.field = …` changes the object itself (reference), even without the index.
- Same trick **works** inside `map` / `filter` (they also get `index, array`), but **don't**: `map`/`filter` are meant to leave the original alone and return a new array. Mixing both = confusing code (`map` then returns one array **and** changes another).
- Want a changed copy → `const b = a.map(x => x * 2)` (`map(fn(value, index, array))` → new array of `fn`'s results — section 4). Want to change in place → classic `for` or `forEach` with `a[i] = …`.

Traps:
- `for...in` → `"0" + 1` = `"01"` (string joining). Also on a **number** it loops zero times (Armstrong bug). Digits of a number: `for (const d of String(n))` (`String(value)` → string).
- `forEach` returns `undefined`; it doesn't change the array **by itself** (`x * 2` or `x = x * 2` is thrown away — `x` is a copy of a number); `break` inside → SyntaxError; `return` only skips one item.
- Classic `for` with `i <= a.length` runs one time too many (off-by-one).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `for...of` | `for...in` | values vs indexes **as strings** (`for...in` is for objects) |
| `for...of` | `forEach` | same loop over values, but `for...of` allows `break` / `continue`; `forEach` gives the index for free |
| `forEach` | `map` | both call `fn` for every item; `forEach` → `undefined` (just "do something"), `map` → **new array** of results |
| `forEach` + `a[i] = …` | `a.map(…)` | changes `a` **in place** vs leaves `a` and returns a **new** array |
| `forEach` | classic `for` | `for` controls the index: step 2, backwards, stop early |
| `a.entries()` | `Object.entries(obj)` | iterator of `[index, value]` with **number** indexes vs **array** of `[key, value]` with **string** keys |
| `a.entries()` + `for...of` | `for...in` | both give indexes, but `entries` gives numbers **and** values |

---

## Step 3. Searching

| Question | Signature | Returns | Not found → |
|---|---|---|---|
| Is this value there? | `includes(value, fromIndex?)` | `true` / `false` | `false` |
| Where is this value? | `indexOf(value, fromIndex?)` | first index | `-1` |
| … searching from the end | `lastIndexOf(value, fromIndex?)` | last index | `-1` |
| First item where … | `find(fn(value, index, array))` | the item | `undefined` |
| … from the end | `findLast(fn(value, index, array))` | the item | `undefined` |
| Position of first item where … | `findIndex(fn(value, index, array))` | index | `-1` |
| … from the end | `findLastIndex(fn(value, index, array))` | index | `-1` |
| Does ANY item …? | `some(fn(value, index, array))` | `true` / `false` | `false` |
| Do ALL items …? | `every(fn(value, index, array))` | `true` / `false` | — |

- For `find` … `every`, `fn` must return `true` / `false` (truthy / falsy): "does this item match?".
- `fromIndex` = where to start looking: `[1, 2, 1].indexOf(1, 1)` → `2`.

- By value → compares with `===`, no conversion: `["5"].includes(5)` → `false`.
- `find` / `findIndex` stop at the first match.
- ⚠️ `if (a.indexOf(x))` is a bug: index `0` is falsy. Use `!== -1` or `includes`.
- `NaN`: `indexOf(NaN)` → `-1`, `includes(NaN)` → `true`.
- Objects: `indexOf({…})` → always `-1` (new object = new reference). Use `find(u => u.age < 18)`.
- Empty array: `[].every(...)` → `true`, `[].some(...)` → `false`. Why:

  | Method | What it really looks for | Stops at | `[]` result |
  |---|---|---|---|
  | `every(fn)` | an item that **fails** (a counter-example) | first fail → `false` | `true` — nothing fails ("all of nothing") |
  | `some(fn)` | an item that **passes** | first pass → `true` | `false` — nothing passes |

  ```javascript
  [].every(x => x > 0);      // true
  [].some(x => x > 0);       // false
  [5, -1].every(x => x > 0); // false — stops at -1
  [5, -1].some(x => x > 0);  // true  — stops at 5
  ```
- "Is there a student with grade < 5?" → `some`; "give me that student" → `find`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `includes(value)` | `indexOf(value)` | same search by value; `includes` → `true`/`false`, `indexOf` → **position** or `-1`. `NaN`: only `includes` finds it |
| `indexOf(value)` | `findIndex(fn)` | both give a position; `indexOf` only **by value** (`===`), `findIndex` by **any condition** (`x > 5`, `u.age < 18`, objects) |
| `includes(value)` | `some(fn)` | both answer yes/no; `includes` only by value, `some` by condition |
| `find(fn)` | `findIndex(fn)` | same search; `find` → the **item**, `findIndex` → its **position** |
| `find(fn)` | `filter(fn(value, index, array))` | `find` → **first** match only (`undefined` if none); `filter` → **all** matches in a new array (`[]` if none) — `filter` details in section 4 |
| `find(fn)` | `some(fn)` | `find` → the item itself; `some` → only `true`/`false` |
| `some(fn)` | `every(fn)` | at least **one** matches vs **all** match (empty array: `some` → `false`, `every` → `true`) |
| `indexOf` | `lastIndexOf` | from the start vs from the end (same for `find`/`findLast`, `findIndex`/`findLastIndex`) |

Rule of thumb: **know the value → `includes` / `indexOf`; need a condition → `find` / `findIndex` / `some` / `every`.**

---

## Step 4. map and filter (return a NEW array, original untouched)

```javascript
const a = [1, 2, 3, 4];
a.map(x => x * 10);          // [10, 20, 30, 40]  same length, items CHANGED
a.filter(x => x % 2 === 0);  // [2, 4]            same or fewer, items KEPT as is
```

| | `map` | `filter` |
|---|---|---|
| Signature | `map(fn(value, index, array))` | `filter(fn(value, index, array))` |
| `fn` returns | the new value | `true` keep / `false` drop |
| Method returns | **new array** of `fn`'s results | **new array** of the kept items |
| Result length | same | same or shorter |

- **map converts, filter keeps/drops.**
- Chain: `students.filter(s => s.g >= 5).map(s => s.n)`.
- `x => { x * 2 }` (braces, no `return`) → `[undefined, …]`.
- `a.map(x => x > 2)` → `[false, false, true, true]` (that's not filtering).
- `["1","2","3"].map(parseInt)` → `[1, NaN, NaN]` (index passed as radix); use `.map(Number)`.
- Index is the 2nd parameter: `(x, i) => …`.
- `filter(Boolean)` removes all falsy values.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `map(fn)` | `filter(fn)` | `map` changes every item (same length); `filter` keeps/drops items unchanged (same or shorter) |
| `filter(fn)` | `find(fn)` | all matches (array) vs first match (item) |
| `map(fn)` | `forEach(fn)` | `map` returns a new array; `forEach` returns `undefined` — use `forEach` only for side effects (print, push elsewhere) |
| `map(Number)` | `map(parseInt)` | `parseInt` gets the index as radix → `[1, NaN, NaN]`; `Number` takes one argument |
| `x => x * 2` | `x => { x * 2 }` | without braces the value is returned; with braces you need `return`, otherwise `undefined` |

---

## Step 5. reduce: fold the array into ONE value

```javascript
arr.reduce((acc, x) => newAcc, startValue)
```

- Signature: `reduce(fn(acc, value, index, array), initialValue?)` → the final `acc` (one value: number, string, array, object …).
- `fn` returns the **new** `acc` for the next item.

`[4, 7, 1].reduce((acc, x) => acc + x, 0)`:

| Step | acc | x | returns |
|---|---|---|---|
| 1 | 0 (start) | 4 | 4 |
| 2 | 4 | 7 | 11 |
| 3 | 11 | 1 | **12** |

- Same as `let sum = 0; for (const x of arr) sum += x;`
- Start value: `0` for sum, `1` for product.
- No start value on an empty array → **TypeError**.

**With / without a start value:**

| Array | Start value | Result | Why |
|---|---|---|---|
| `[2, 4, 6]` | none | `12` | the **first item** becomes `acc`, the loop starts from the 2nd item |
| `[2, 4, 6]` | `0` | `12` | `acc` starts at `0`, all 3 items are added |
| `[]` | none | **TypeError** | no first item to start from |
| `[]` | `0` | `0` | the callback **never runs**, `reduce` returns the start value |

→ Rule: **always give a start value** — it makes empty arrays safe.

- With `{ }` you must `return`, otherwise `acc` becomes `undefined`.
- Other uses: product, max (`x > acc ? x : acc`).

### Average

- average = sum ÷ `arr.length`.
- Empty array: `0 / 0` → `NaN`. Returning `NaN` keeps the return type a number (`typeof NaN` → `"number"`); check with `Number.isNaN(value)` → `true` / `false`. Returning `0` looks like a real score; `null` mixes types.
- Write `NaN` (same as `Number.NaN`); `Nan` → ReferenceError.
- Keep the function returning a raw number; round only for display. `n.toFixed(digits?)` → **string** (`(104.333).toFixed(1)` → `"104.3"`) — compare the unrounded numbers.
- Several arrays → one helper (`getAvg(arr)`) called several times.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `reduce(fn, 0)` | `for...of` + `sum +=` | same result; `reduce` returns the value, the loop needs an outside `let` variable |
| `reduce(fn, start)` | `reduce(fn)` | without a start value the first item is the start; on an empty array → TypeError |
| `n.toFixed(1)` | `Math.round(n)` | `toFixed` → **string** with fixed decimals (`"104.3"`), for display; `Math.round(value)` → **number**, nearest whole (`.5` rounds up: `Math.round(-2.5)` → `-2`) |
| `Number.isNaN(x)` | `isNaN(x)` | `Number.isNaN(value)` → boolean, doesn't convert (`"abc"` → `false`); global `isNaN(value)` → boolean, converts first (`"abc"` → `true`) |
| `return NaN` | `return 0` / `return null` | NaN is still a number and can't be mistaken for a real score; `0` can, `null` changes the type |

---

## Step 6. Cutting and joining: slice, splice, concat, join, split

**Parameter vs argument:** the *parameter* is the name in the signature (`slice(start, end)` — what the method expects); the *argument* is the value you pass when calling (`a.slice(1, 3)` → `start` = 1, `end` = 3).

```text
a = [10, 20, 30, 40, 50]
      0   1   2   3   4      ← index
     -5  -4  -3  -2  -1      ← negative index (from the end)
```

### `slice(start?, end?)` → NEW array (copy of a piece). Original untouched.

| Parameter | Meaning | If left out |
|---|---|---|
| `start` | index where the copy **starts** (included) | `0` |
| `end` | index where it **stops** (**NOT** included) | to the end |

```javascript
a.slice(1, 3);    // [20, 30]       from 1, stop BEFORE 3
a.slice(2);       // [30, 40, 50]   from 2 to the end
a.slice(-2);      // [40, 50]       last two
a.slice(1, -1);   // [20, 30, 40]   from 1, stop before the last
a.slice();        // copy (like [...a])
```

### `splice(start, deleteCount?, item1?, …)` → array of REMOVED items. CHANGES the array!

| Parameter | Meaning | If left out |
|---|---|---|
| `start` | index where to cut / insert | required |
| `deleteCount` | **how many** to remove (a count, not an index!) | removes everything to the end |
| `item1, …` | items to **insert** at `start` | nothing inserted |

Each row starts again from `b = [10, 20, 30, 40, 50]`:

| Call | What it does | **Returns** (removed) | **`b` after** |
|---|---|---|---|
| `b.splice(1, 2)` | at 1, remove 2 | `[20, 30]` | `[10, 40, 50]` |
| `b.splice(1, 0, 15)` | at 1, remove 0, insert 15 | `[]` | `[10, 15, 20, 30, 40, 50]` |
| `b.splice(1, 1, "x")` | at 1, remove 1, insert "x" (replace) | `[20]` | `[10, "x", 30, 40, 50]` |
| `b.splice(2)` | at 2, remove all to the end | `[30, 40, 50]` | `[10, 20]` |
| `b.splice(-1)` | last item, remove to the end | `[50]` | `[10, 20, 30, 40]` |
| `b.splice(1, 2, "x", "y", "z")` | at 1, remove 2, insert 3 | `[20, 30]` | `[10, "x", "y", "z", 40, 50]` |

- Return value = the **removed** items (or `[]`), **not** the new array. Look at `b` to see the result.
- Memory trick: s**P**lice = surgery on the array itself; slice = take a copy of a piece.

### `concat(value1, …)` → NEW array

```javascript
[1, 2].concat([3, 4], 5);   // [1, 2, 3, 4, 5]   arrays unpacked one level, values added
```

### `join(separator? = ",")` → STRING (array → string)

| Parameter | Meaning | If left out |
|---|---|---|
| `separator` | text put **between** the items | `","` |

```javascript
["a", "b", "c"].join();      // "a,b,c"
["a", "b", "c"].join("");    // "abc"
["a", "b"].join(" - ");      // "a - b"
```

### `split(separator)` → ARRAY of strings (string → array; it's a STRING method)

| Parameter | Meaning | If left out |
|---|---|---|
| `separator` | where to cut (the separator itself disappears) | whole string → one item |

```javascript
"a,b,c".split(",");                  // ["a", "b", "c"]
"Labas rytas".split(" ");            // ["Labas", "rytas"]
"abc".split("");                     // ["a", "b", "c"]  "" = cut between every character
"abc".split();                       // ["abc"]
"2026-10-03".split("-").map(Number); // [2026, 10, 3]    pieces are strings → convert
```

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `slice(1, 3)` | `splice(1, 2)` | copy of a piece, original untouched vs removes from the original; 2nd argument = **end index** (not included) vs **how many** |
| `slice` returns | `splice` returns | the piece (new array) vs the **removed** items |
| `concat(x)` | `push(x)` | new array vs changes the array (returns new length) |
| `[...a, ...b]` | `a.concat(b)` | same result, both new arrays |
| `join` | `split` | array → string vs string → array (opposites; `split` is a string method) |
| `split("")` | `split()` | every character vs the whole string as one item |
| `join()` | `join("")` | `"a,b,c"` (default comma) vs `"abc"` |

Traps:
- `slice` end index is **not** included → `slice(1, 3)` gives 2 items.
- `splice` returns the removed items, not the new array.
- `split` gives **strings**: `"1,2".split(",")` → `["1", "2"]` → `.map(Number)`.

Spread, rest and destructuring in depth: section 9.

---

## Step 7. Ordering: sort, reverse

### Built-in

| Way | Changes original? |
|---|---|
| `arr.sort((a, b) => a - b)` | **yes** (ascending; `b - a` descending) |
| `[...arr].sort((a, b) => a - b)` | no (copy first) |
| `arr.toSorted((a, b) => a - b)` | no (**ES2023**, not ES6 — in the course use `[...arr].sort(…)`) |

- `sort(compareFn?(a, b))` → **the same array**, now sorted (`a.sort() === a` → `true`).
- `toSorted(compareFn?(a, b))` → a **new** sorted array; original untouched (ES2023; ES6 way: `[...a].sort(compareFn)`).
- `compareFn(a, b)` returns a number (see below).

- Without a compare function numbers are sorted **as text**: `[10, 9, 1].sort()` → `[1, 10, 9]`.
- Compare function: negative → `a` first, positive → `b` first, `0` → keep.
- Objects by a field: `(a, b) => a.avg - b.avg`.
- `NaN` inside breaks the order → validate first.
- If a task says "naudojant if sąlygas", `sort` skips what's being tested.

### `reverse`: flip the order

- **Declaration:** `arr.reverse()` → **the same array**, reversed. Changes the original. No parameters.
- Why it returns itself: it works **in place** (no second array exists), and returning it allows chaining: `[5, 2, 8].sort((x, y) => x - y).reverse()` → `[8, 5, 2]`.
- Trap: `const r = a.reverse()` is **not** a copy — `r === a` → `true`, so `a` changed too.
- Non-changing version: ES6 `[...a].reverse()` / `a.slice().reverse()`; ES2023 `a.toReversed()`.

```javascript
const a = [3, 1, 2];
const r = a.reverse();         // r = [2, 1, 3], a = [2, 1, 3]  (r === a → true)

const b = [3, 1, 2];
const c = [...b].reverse();    // c = [2, 1, 3], b still [3, 1, 2]
```

- `reverse` only **flips** the current order, it does **not** sort: `[5, 1, 4].reverse()` → `[4, 1, 5]`.
- Text sort can look "right" by accident: `[3, 20, 100].sort()` → `[100, 20, 3]` (as text `"1" < "2" < "3"`), but `[3, 20, 5].sort()` → `[20, 3, 5]`.

| This | vs | Difference |
|---|---|---|
| `reverse()` | `[...a].reverse()` (ES6) / `toReversed()` (ES2023) | changes `a` vs new array |
| `reverse()` | `sort((a, b) => b - a)` | flips the current order vs real descending sort |
| `sort` / `reverse` return | copy-first versions return | the **same** array (`=== a`) vs a **different** array |

### Swapping two values

```javascript
const temp = a; a = b; b = temp;          // temp variable (works in every language, C# too)
[a, b] = [b, a];                          // destructuring (ES6)
[arr[0], arr[1]] = [arr[1], arr[0]];      // inside an array (works with const arr)
```

- Destructuring trap: previous line must end with `;`, otherwise `x = 1` + `[a, b] = …` is read as `1[a, b] = …`.
- Avoid `a = a + b; b = a - b; …` (float errors).
- Variables you swap need `let`.

### By hand (algorithms)

- **Compare-and-swap with if** for a fixed few values: 3 numbers → pairs (1,2), (2,3), (1,2) = bubble sort written out.
- **Bubble sort**: swap wrong-order neighbours, repeat passes. n numbers → n−1 passes, n·(n−1)/2 comparisons (3 → 3, 5 → 10, 10 → 45). 5 numbers: (1,2)(2,3)(3,4)(4,5) / (1,2)(2,3)(3,4) / (1,2)(2,3) / (1,2). In code: array + two nested loops.
- **Selection sort**: find the smallest of the rest, put it next.
- **Insertion sort**: take each item, slide it left into place.
- Test with every order of the inputs + ties (`2, 2, 1`).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `a.sort(fn)` | `a.toSorted(fn)` / `[...a].sort(fn)` | `sort` changes `a` and returns the same array; the others return a new array, `a` untouched |
| `sort()` | `sort((a, b) => a - b)` | no function → compares as **text** (`[1, 10, 9]`); with function → as numbers |
| `(a, b) => a - b` | `(a, b) => b - a` | ascending vs descending |
| `temp` swap | `[a, b] = [b, a]` | same result; temp works in every language, destructuring is shorter but needs `;` on the previous line |
| `[a, b] = [b, a]` | `a = a + b; b = a - b; …` | the arithmetic trick breaks with decimals (float errors) — don't use |
| bubble sort | `if`-swaps for 3 numbers | same idea; for a fixed few values write the `if`s out, for many use loops |

---

## Step 8. Summary: changes the array vs returns a new one

### Changes the original array ⚠️

| Declaration | Returns |
|---|---|
| `arr.push(item1, …)` | new length |
| `arr.pop()` | removed last item |
| `arr.unshift(item1, …)` | new length |
| `arr.shift()` | removed first item |
| `arr.splice(start, deleteCount?, item1?, …)` | array of **removed** items |
| `arr.sort(compareFn?)` | the **same** array |
| `arr.reverse()` | the **same** array |
| `arr[i] = value` (assignment) | the assigned value |

### Leaves the original alone ✅

| Declaration | Returns |
|---|---|
| `arr.slice(start?, end?)` | new array (piece) |
| `arr.concat(value1, …)` | new array |
| `arr.map(fn)` / `arr.filter(fn)` | new array |
| `[...arr]` (spread) | new array |
| `arr.join(separator?)` | string |
| `arr.reduce(fn, initialValue?)` | one value |
| `find` / `findIndex` / `indexOf` / `includes` / `some` / `every` | item / index / boolean |
| `arr.forEach(fn)` | `undefined` |

Memory trick: **adding, removing and ordering in place change the array; searching, transforming, copying and joining don't.** Need a non-changing sort/reverse → copy first: `[...a].sort()`, `[...a].reverse()`.

### Copy vs reference

```javascript
const a = [1, 2];
const b = a;        // same array, two names
const c = [...a];   // new array (copy)

b.push(3);          // a → [1, 2, 3] (changed through b!)   c → [1, 2]
```

- Copy is **shallow**: objects inside are still shared (`copy[0].n = 9` changes the original's object too).

| This | vs | Difference |
|---|---|---|
| `const r = a.sort()` / `a.reverse()` | `const r = a.splice(…)` | all three change `a`, but `sort`/`reverse` return the **same** array (`r === a`), `splice` returns a **new** array of the **removed** items (`r !== a`) |
| `a.push(x)` / `a.unshift(x)` | `a.pop()` / `a.shift()` | return the **new length** vs the **removed item** |
| `const b = a` | `const c = [...a]` / `a.slice()` | same array vs a new one |
| `[...a]` | deep copy | one level only; inner objects shared |
| `const arr` + `push` | `const arr` + `arr = …` | changing contents OK vs reassigning → TypeError |

---

## Step 9. Destructuring, spread and rest

All three are **syntax** (not functions), added in ES6 (2015). They only save typing: everything here can be written the "long way" too. They work on arrays **and** objects (and strings), so this section goes a bit beyond arrays.

### 9.1 The big picture

| Syntax | Idea | Direction |
|---|---|---|
| **Destructuring** `const [a, b] = arr` / `const { name } = obj` | take values **out** of an array/object into variables | box → variables |
| **Spread** `...arr` / `...obj` | **unpack** all items into a place that takes several values | box → loose items |
| **Rest** `...others` | **collect** the remaining items into a new array/object | loose items → box |

Spread and rest use the **same three dots**. How to tell them apart — look **where** the `...` stands:

| Where the `...` is | Name | What it does |
|---|---|---|
| function **parameters** `(...values) =>` | **rest** | collects the arguments into an array |
| **left** of `=` `const [x, ...r] = …` / `const { a, ...r } = …` | **rest** | collects the remaining items |
| function **call** `f(...arr)`, `console.log(...arr)` | **spread** | unpacks the array into separate arguments |
| inside a new `[ ]` / `{ }` on the **right** `[...arr, 4]`, `{ ...obj }` | **spread** | unpacks the items into the new array/object |

Short: **parameters / left side → rest (pack). Call / right side → spread (unpack).**

#### What is destructuring, in plain words?

A **shorter way to take values out of an array/object into variables** — the `[ ]` / `{ }` written on the **left** of `=`.

```javascript
const arr = [10, 20];
const user = { name: "Ona", age: 30 };

// without destructuring          // with destructuring
const x = arr[0];                 const [x, y] = arr;
const y = arr[1];

const name = user.name;           const { name, age } = user;
const age = user.age;
```

Read `const [x, y] = arr` as: "**take** the 1st item into `x`, the 2nd into `y`".

Same brackets, opposite meaning depending on the side of `=`:

| `[ ]` / `{ }` stands… | Meaning |
|---|---|
| on the **right** `const a = [10, 20]` | **build** a new array/object |
| on the **left** `const [x, y] = a` | **take apart** an existing one (destructuring) |

How the three fit together:

```javascript
const [first, ...others] = [1, 2, 3];
//    └─ destructuring ─┘
//            └ rest inside it
```

- **Destructuring** = the pattern on the left: `const [x, y] = …`.
- **Rest** = an optional extra **inside** the pattern ("and everything else here"): `const [x, ...others] = …`. Also used in function parameters.
- **Spread** = not part of destructuring; same `...` but it **unpacks into something new**: `[...arr, 30]`.
- Already used: swap `[a, b] = [b, a]`, loop `for (const [i, x] of arr.entries())`.


### 9.2 Array destructuring: by POSITION

```javascript
const point = [10, 20];

// long way
const x1 = point[0];
const y1 = point[1];

// destructuring — same result
const [x, y] = point;          // x = 10, y = 20
```

```javascript
const [, second] = [10, 20, 30];        // 20     skip with an empty slot
const [p, q, r] = [1, 2];               // r = undefined (nothing at that position)
const [d = 5] = [];                     // d = 5  default if the value is undefined
const [first, ...others] = [1, 2, 3];   // first = 1, others = [2, 3]  (rest)
const [c1, c2] = "hi";                  // "h", "i"  works on strings too
```

Where you already met it:

```javascript
[a, b] = [b, a];                          // swap (section 7)
for (const [i, x] of arr.entries()) { }   // each pair [index, value] unpacked (section 2)
```

- Names are **yours** — only the **order** matters.
- Missing position → `undefined` (no error). Destructuring `null` / `undefined` → **TypeError** ("null is not iterable").


### 9.3 Object destructuring: by NAME

```javascript
const user = { name: "Ona", age: 30 };

// long way
const name1 = user.name;
const age1 = user.age;

// destructuring — same result
const { name, age } = user;     // name = "Ona", age = 30
```

```javascript
const { name: n } = user;                 // rename: n = "Ona"  (read "name, store as n")
const { city = "Vilnius" } = user;        // default: "Vilnius" (user has no city)
const { zip } = user;                     // undefined (no such property, no error)
const { name: nm, ...rest } = user;       // rest = { age: 30 }  (rest)
```

In function parameters and loops (very common):

```javascript
const greet = ({ name, age }) => `${name} (${age})`;
greet(user);                              // "Ona (30)"

for (const { name, g } of students) { }   // each student object unpacked
```

- Names **must match** the property names (order doesn't matter). Want another name → `name: newName`.
- Nested: `const { address: { city } } = user;` → **TypeError** if `address` is missing (you read `city` of `undefined`).
- Destructuring `null` → **TypeError** ("Cannot destructure property … of null").
- Without `const`/`let` you need parentheses: `({ a, b } = obj);` (a line starting with `{` is read as a block).


### 9.4 Spread `...`: unpack

#### Arrays

```javascript
const a = [1, 2, 3];
const b = [4, 5];

[...a, 4];            // [1, 2, 3, 4]      add at the end — NEW array (push changes a)
[0, ...a];            // [0, 1, 2, 3]      add at the start — NEW array (unshift changes a)
[...a, ...b];         // [1, 2, 3, 4, 5]   join two arrays (like concat)
const copy = [...a];  // [1, 2, 3]         a COPY: copy.push(9) doesn't change a
Math.max(...a);       // 3                 array → separate arguments  (Math.max(value1, …) → largest number)
[..."abc"];           // ["a", "b", "c"]   string → array of characters
[...a.entries()];     // [[0, 1], [1, 2], [2, 3]]  iterator → array
```

#### Objects

```javascript
const user = { name: "Ona", age: 30 };

{ ...user };                     // copy
{ ...user, city: "Vilnius" };    // copy + new property
{ ...user, age: 31 };            // copy + overwrite: { name: "Ona", age: 31 }
{ age: 31, ...user };            // { age: 30, name: "Ona" } — LATER wins, so 31 is overwritten
```

- **Order matters** in objects: the property written **last** wins.
- ⚠️ **Shallow copy**: only the top level is copied. Objects inside are still **shared**:

```javascript
const list = [{ s: 1 }];
const cp = [...list];
cp[0].s = 99;          // list[0].s is 99 too — same inner object
```


### 9.5 Rest `...`: collect

#### In function parameters: any number of arguments

**The problem.** A normal function has a fixed number of parameters; extra arguments are simply ignored:

```javascript
const add = (a, b) => a + b;
add(1, 2);       // 3
add(1, 2, 3);    // 3  ← the 3 is ignored, there is no parameter for it
```

**Rest = "put all the arguments into ONE array"** (think: a basket).

```javascript
const show = (...values) => values;

show(1, 2, 3);   // values = [1, 2, 3]
show("a");       // values = ["a"]
show();          // values = []   ← empty array, never undefined
```

```text
show(1, 2, 3)
      ↓  ↓  ↓
(...values)   →   values = [1, 2, 3]
```

Inside the function `values` is an ordinary array: `.length`, `for...of`, `map`, `reduce` all work.

```javascript
const sum = (...nums) => nums.reduce((s, x) => s + x, 0);
sum(1, 2, 3);   // 6
sum();          // 0
```

**With normal parameters before it.** Normal parameters take their values **first**, rest collects **whatever is left**:

```javascript
const log = (label, ...items) => { /* ... */ };

log("Fruits", "apple", "pear");   // label = "Fruits", items = ["apple", "pear"]
log("Fruits");                    // label = "Fruits", items = []
```

→ That's why rest must be **last**: it takes "all the rest", nothing can come after it.

**Rest vs passing an array.**

```javascript
const count = (...v) => v.length;

count(1, 2, 3);       // 3   three arguments → v = [1, 2, 3]
count([1, 2, 3]);     // 1   ONE argument (an array) → v = [[1, 2, 3]]
count(...[1, 2, 3]);  // 3   spread unpacks when calling, rest packs again inside
```

**Watch what the function returns** (common mistake):

```javascript
const f = (first, ...others) => others;

f(5, 6, 7);     // [6, 7]   first = 5
f(5);           // []       first = 5, nothing left → empty array (never undefined)
f([5, 6, 7]);   // []       ONE argument: the whole array goes into first
f(...[5, 6, 7]);// [6, 7]   spread first → three arguments
```

- Rest counts **arguments**, not items inside an array.

- Real-life example of the same idea: `Math.max(1, 5, 3)` takes any number of arguments.
- Use it when the caller should pass loose values: `sum(1, 2, 3)`, `average(8, 9, 10)`.

#### In destructuring: "the rest of it"

```javascript
const [head, ...tail] = [1, 2, 3];          // head = 1, tail = [2, 3]
const { name, ...other } = { name: "Ona", age: 30, city: "Vilnius" };
                                            // other = { age: 30, city: "Vilnius" }
```

- Rest must be **last**: `const [...r, last] = arr` → **SyntaxError** ("Rest element must be last element").


### 9.6 Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| spread `f(...a)` / `[...a]` | rest `(...a) =>` / `const [x, ...a] = …` | same dots; spread **unpacks** (right side, calls), rest **collects** (left side, parameters) |
| `(a, b) =>` (fixed parameters) | `(...values) =>` (rest) | extra arguments ignored vs all arguments collected into one array |
| `f([1, 2, 3])` with rest | `f(1, 2, 3)` / `f(...[1, 2, 3])` | one argument → `[[1, 2, 3]]` vs three arguments → `[1, 2, 3]` |
| array destructuring `[a, b]` | object destructuring `{ a, b }` | by **position** (any names) vs by **name** (names must match properties) |
| `const [x, y] = arr` | `arr[0]`, `arr[1]` | same values; destructuring is shorter and names them in one line |
| `const copy = [...a]` | `const copy = a` | new array vs the **same** array (reference) |
| `[...a, x]` | `a.push(x)` | new array, `a` untouched vs `a` **changed** |
| `[...a, ...b]` | `a.concat(b)` | same result, both new arrays |
| `Math.max(...a)` | `Math.max(a)` | separate numbers vs one array argument → `NaN` |
| `{ ...user, age: 31 }` | `user.age = 31` | new object with the change vs the original **changed** |
| `{ ...user, age: 31 }` | `{ age: 31, ...user }` | later wins: 31 vs 30 |
| `[...a]` / `{ ...o }` copy | deep copy | spread copies one level only; inner objects stay shared |
| missing value in destructuring | destructuring `null` / `undefined` | `undefined` (no error) vs **TypeError** |


### 9.7 Traps (summary)

- `;` before a line starting with `[` (swap!) — otherwise it joins with the previous line.
- Object destructuring without `const` needs `( )`.
- Rest only at the end.
- Spread copy is shallow.
- `{ ...arr }` turns an array into an object with keys `"0"`, `"1"`… (rarely wanted).

---

## Extra A (from task questions, before the session). Largest / smallest: Math.max / Math.min

```javascript
Math.max(104, 111, 112);   // 112
Math.max(...avgs);         // spread the array into arguments
Math.max(avgs);            // NaN — the whole array is one argument
```

- Signature: `Math.max(value1, …, valueN)` → the largest number · `Math.min(value1, …, valueN)` → the smallest. Static (called on `Math`).
- Returns only the **value**, not which variable had it → compare `=== max` afterwards to find who.
- `Math.max()` → `-Infinity`; any `NaN` → `NaN`; `"5"` → converted to 5; `null` → 0. Pass validated numbers.
- Need only max/min? Don't sort.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `Math.max(...a)` | `Math.max(a)` | spread gives separate numbers; the array itself is one argument → `NaN` |
| `Math.max(...a)` | `sort` | max gives only the **value**, doesn't change the array; sort orders everything (and changes it) |
| `Math.max(...a)` | `reduce((m, x) => x > m ? x : m)` | same result; `Math.max` is shorter, `reduce` lets you compare by a field (`x.avg`) |

---

## Extra B (from task questions, before the session). Finding a winner among 3 values with if (pattern)

- Way 1: `A > B && A > C` → A wins (same for B, C); `else` = a tie at the top.
  - Inside the `else`: check **all equal first** (`a === b && b === c`), then the pairs with plain `===` (the pair must be the top two, otherwise the third would have won already).
- Way 2: `max` first, then which values `=== max`; collect names in an array, `length === 1` → winner, else tie (`names.join(" & ")`).
  - `join(separator?)` → **string** of all items with the separator between (default `","`): `["Ona", "Rasa"].join(" & ")` → `"Ona & Rasa"`.
- Two equal values **below** the third are not a tie.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `A > B && A > C` chain | `max` then `=== max` | chain is simpler; the max way also tells **who** tied |
| `names.join(" & ")` | `String(names)` | `join` lets you pick the separator; `String(arr)` always uses `","` |

---

## Step 10. Quiz — log of mistakes to remember

| Date | Question | My answer | Correct | Why |
|---|---|---|---|---|
| 2026-10-03 | `const r = [1,2,3,4,5].splice(1, 3)` | `r` same as `a`, `[1, 5]` | `r` = `[2, 3, 4]`, `a` = `[1, 5]` | `splice` returns the **removed** items, not the array (only `sort`/`reverse` return the same array) |
| 2026-10-03 | `[1, 2, 3].find(x => x > 5)` | `-1` | `undefined` | `find` returns the **item** → nothing found = `undefined`; `-1` is for **position** methods (`findIndex`, `indexOf`) |
| 2026-10-03 | `[1, 2, 3].indexOf("2")` | `1` | `-1` | `indexOf` compares with `===` (no conversion): the string `"2"` is not the number `2` |
| 2026-10-03 | `const { name: n, age = 18 } = { name: "Ona" }` | `name` = "Ona", `age` = 18 | `n` = "Ona", `age` = 18 | `name: n` = rename: property `name` → variable **`n`**; no variable `name` is created |
| 2026-10-03 | `const arr = []; arr[0].x` | `undefined` | **TypeError** | `arr[0]` → `undefined` (step 1, no error), then `.x` **of** `undefined` → TypeError (step 2). One level missing = `undefined`, two levels = crash. See [[types-learned]] |
| 2026-10-03 | `[].every(x => x > 0)` | `false` | `true` | `every` looks for a **counter-example**; an empty array has none → `true` ("all of nothing"). `[].some(…)` → `false` (no item matches) |
| 2026-10-03 (re-quiz) | `["a", "b"].find(x => x === "z")` | `false` | `undefined` | 3 kinds of question: **which item?** `find` → `undefined` · **where?** `findIndex`/`indexOf` → `-1` · **is there?** `some`/`includes` → `false` |
| 2026-10-03 (re-quiz) | `const a = [5,6,7,8]; const r = a.splice(0, 2)` | `r` = `[5, 6]`, `a` unchanged | `r` = `[5, 6]`, `a` = `[7, 8]` | `splice` **changes** the original: removed items go to `r`, `a` keeps the rest. Piece without changing → `slice` |
| 2026-10-04 (full arrays quiz) | `const r = [10,20,30,40].splice(1, 1, "x", "y")` | `r` = `[10, 20]`, `a` = `["x","y",30,40]` | `r` = `[20]`, `a` = `[10,"x","y",30,40]` | 1st arg = **start index**, 2nd = **how many** to remove, the rest = inserted at start |

