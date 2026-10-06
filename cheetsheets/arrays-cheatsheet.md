# Arrays: cheat sheet (must remember)

Full version: [[arrays-learned]] — same step numbers as the guided session.
Signatures: `name(arg?)` → return · `?` optional · `fn(value, index, array)` = callback.

**ES version note:** course = **ES6**. Newer: `includes` (2016), `Object.entries` (2017), object spread (2018), `?.` `??` (2020), `at` (2022), `findLast`, `toSorted`, `toReversed` (2023). ES6 forms: `indexOf(x) !== -1`, `a[a.length - 1]`, `[...a].sort()`, `[...a].reverse()`.

---

## Step 1. Basics
| Signature | Returns |
|---|---|
| `at(index)` | item / `undefined` |
| `push(item1, …)` / `unshift(item1, …)` | new length |
| `pop()` / `shift()` | removed item / `undefined` |
| `Array.isArray(value)` | boolean |
- Index from **0**; last = `a[a.length - 1]` (ES6) or `a.at(-1)`; `a[a.length]` → `undefined`; `a[-1]` → `undefined`.
- `push`/`pop` = end · `unshift`/`shift` = start — all four **change** the array.
- `const` array **can** be changed (push, `a[0] = …`); only `a = […]` fails (TypeError).
- `b = a` → same array, **not** a copy. Copy: `[...a]`. Adding without changing: `[...a, x]` / `concat`.
- `[1,2] === [1,2]` → `false`. Check type: `Array.isArray(x)` (`typeof` → `"object"`).
- Write past the end: `a = []; a[5] = "x"` → `length` 6, 5 **holes** (`forEach`/`map` skip them, `for...of` gives `undefined`).
- Only whole-number keys are items: `a[-1] = …`, `a[1.5] = …`, `a.foo = …` = **ordinary properties** → no `length` change, ignored by loops/methods (except `for...in`). `a[-1]` reads property `"-1"`, not the last item.

## Step 2. Looping
| Signature | Returns |
|---|---|
| `forEach(fn)` | `undefined` |
| `entries()` / `keys()` / `values()` | iterator |
- `for...of` → values · classic `for` → index / step / backwards / `break` · `forEach((x, i) => …)` → no `break`, returns `undefined`.
- `for (const [i, x] of a.entries())` → index (number) + value **with** `break`; iterator has no `.length` → `[...a.entries()]` to see pairs.
- ❌ `for...in` on arrays → indexes as **strings** (`"0" + 1` = `"01"`).
- `i < a.length`, never `<=`.
- Change in place: `forEach((x, i) => { a[i] = … })` ✅ · `x = …` ❌ (copy). Objects: `p.field = …` changes them. Don't mutate inside `map`/`filter`.

## Step 3. Searching
| Signature | Returns | Not found |
|---|---|---|
| `includes(value, fromIndex?)` — is it there? | boolean | `false` |
| `indexOf(value, fromIndex?)` / `lastIndexOf(…)` — where? | index | `-1` |
| `find(fn)` / `findLast(fn)` — first item where… | item | `undefined` |
| `findIndex(fn)` / `findLastIndex(fn)` — its position | index | `-1` |
| `some(fn)` / `every(fn)` — any? / all? | boolean | `false` / — |
- `every` looks for a **fail** (none → `true`), `some` looks for a **pass** (none → `false`). Empty array: `every` → `true`, `some` → `false`.
- `includes` / `indexOf` = **by value only** (`===`, no conversion: `["5"].includes(5)` → `false`). Need a condition → `find` / `findIndex` / `some`.
- `find` → first item · `findIndex` → its position · `filter` → all matches (array) · `some` → yes/no.
- ❌ `if (a.indexOf(x))` — index 0 is falsy → use `!== -1` / `includes`.
- Objects → `find(u => …)`, not `indexOf({…})`.

## Step 4. map / filter
| Signature | Returns |
|---|---|
| `map(fn)` | new array, same length |
| `filter(fn)` | new array, kept items |
- **map converts** (same length) · **filter keeps/drops** (fn returns true/false).
- `forEach` → `undefined` · `map` → new array.
- Braces `{ }` → must `return`, or you get `undefined` (`map` then gives `[undefined, …]`, same length).
- `.map(Number)`, not `.map(parseInt)`.

## Step 5. reduce
| Signature | Returns |
|---|---|
| `reduce(fn(acc, value, index, array), initialValue?)` | final `acc` (one value) |
- `reduce((acc, x) => acc + x, 0)` — always give the start value (`0` sum, `1` product, `""` string).
- No start → first item is `acc` (`[2,4,6]` → 12) · no start + empty array → TypeError · start `0` + empty array → `0` (callback never runs). No `return` in `{ }` → `undefined`.
- `map` → array · `reduce` → **one** value.
- Average = sum / length; empty → `NaN` (`Number.isNaN`). `toFixed` → **string** (display) · `Math.round` → number.

## Step 6. Cutting and joining
| Signature | Returns |
|---|---|
| `slice(start?, end?)` (end **not** included) | new array (piece) |
| `splice(start, deleteCount?, item1?, …)` | **removed** items; changes array |
| `concat(value1, …)` | new array |
| `join(separator? = ",")` | string |
| `str.split(separator)` | array of strings |
- `slice(1, 3)` copy, end not included · `splice(1, 2)` cuts the array, 2nd = **how many**.
- `join` array → string (default `","`) · `split` string → array of **strings** (`.map(Number)`); `split("")` chars, `split()` one item.

## Step 7. Ordering
| Signature | Returns |
|---|---|
| `sort(compareFn?(a, b))` | **same** array, sorted |
| `reverse()` | **same** array, flipped |
| `toSorted(fn)` / `toReversed()` (ES2023) | new array — ES6: `[...a].sort(fn)` / `[...a].reverse()` |
- `sort()` without function = **text** order (`[10,9,1]` → `[1,10,9]`) → `sort((a, b) => a - b)`; `b - a` = descending.
- `reverse` flips (doesn't sort!).
- Swap: `[a, b] = [b, a];` (end the previous line with `;`) or a `temp` variable.
- 3 numbers with if: compare-and-swap (1,2), (2,3), (1,2) = bubble sort. n items → n·(n−1)/2 comparisons.

## Step 8. Summary: changes vs returns new
- ⚠️ Changes: `push` `pop` `shift` `unshift` `splice` `sort` `reverse`, `a[i] = …`
- ✅ New / doesn't change: `slice` `concat` `map` `filter` `[...a]` `join` `reduce` `find…` `includes` `some` `every` (`toSorted`, `toReversed`)
- Return values of changing methods: `sort`/`reverse` → **same** array · `splice` → **removed** items · `push`/`unshift` → new length · `pop`/`shift` → removed item.
- `b = a` = same array · `[...a]` = copy (shallow: inner objects shared).

## Step 9. Destructuring, spread, rest
- **Destructuring**: `[ ]` / `{ }` on the **left** of `=` = take apart into variables. `const [a, b] = arr` (by **position**) · `const { name, age } = obj` (by **name**). On the **right** = build new.
- **Spread** `...x` (call / right side): unpack. `[...a, 4]`, `{ ...o, age: 31 }`, `Math.max(...a)`.
- **Rest** `...x` (parameters / left side): collect leftovers into a **new array**. `(...nums) =>`, `const [first, ...others] = a`.
- Rest params: `f(1, 2, 3)` → `v = [1, 2, 3]` · `f()` → `[]` · `(label, ...items)`: normal params fill first; rest must be last.
- Rest counts **arguments**: `f([1, 2, 3])` → `v = [[1, 2, 3]]` · `f(...[1, 2, 3])` → `v = [1, 2, 3]`.
- Array destructuring: `const [, second] = a` skip · `const [x = 0] = a` default · missing → `undefined` · swap `[a, b] = [b, a];`.
- Object destructuring: `const { name: n } = user` rename · `const { city = "Vilnius" } = user` default · `({ name, age }) => …` · without `const`: `({ a } = obj);`
- Spread: `[...a]` copy · `[...a, ...b]` join · `[..."abc"]` chars · `{ ...o, key: v }` **later wins** · shallow copy.
- Traps: destructuring `null`/`undefined` → TypeError · rest not last → SyntaxError · `;` before a line starting with `[`.

## Extras (from task questions, before the guided session)

### Extra A. Max / min
- `Math.max(v1, …)` / `Math.min(v1, …)` → number. `Math.max(...a)` ✅ · `Math.max(a)` → `NaN`. Value only, no sorting.
- `Number.isNaN(value)` → boolean, no conversion · global `isNaN` converts.

### Extra B. Tie / winner pattern (3 values)
- `A > B && A > C` → A wins … `else` → tie.
- In the tie branch: **all equal first**, then pairs.

## Step 10. Quiz — see the Quiz log in [[arrays-learned]]
