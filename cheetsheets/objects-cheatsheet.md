# Objects: cheat sheet (must remember)

Full version: [[objects-learned]] — same section numbers. ❗ = my quiz mistake · ⚠ = lesson mistake · 🔒 = strict mode.

**Versions:** course = ES6. `Object.values` = ES2017 (ES6: `Object.keys(o).map(k => o[k])`) · object spread / rest `{ ...o }` = ES2018 (ES6: `Object.assign({}, o)`) · `?.` = ES2020.

## 1. What an object is
- Array = **list** of many · object = **description of one** thing: **properties** (has) + **methods** (does = functions).
- `typeof {}` / `typeof []` → `"object"` → `Array.isArray(x)`. Symbol = unique key (mention only).

## 2. Literal, methods, `this`
- `{ key: value, key2: value2 }` · shorthand `{ name, age }` from variables · method `fullName() { … }` → call with `()`.
- `this` in a method = this object. **Arrow** has no own `this` → `fullName: () => this.x` ❌.

## 3. Four ways to create
- Literal `{ }` (most used) · `new Object()` · constructor `function Person(n) { this.name = n; }` + **`new`** · `class` + **`new`**. Capital names.
- 🔒 `Person("Ona")` without `new` → TypeError. ⚠ lesson forgot `new`.
- `Object.create(proto)` → **empty** object that **inherits** from `proto` (⚠ lesson: "copies" — it doesn't).

## 4. Classes
- `class User { constructor(name) { this.name = name; } sayHi() { … } }` → `new User("Jo")`. No commas, no `function`.
- Class = template for many objects. ES6. Comes back in C#.

## 5. Prototype ⭐ exam
- Objects **inherit** from their prototype (`toString()` works). Missing property → looked up in the prototype chain.
- `Person.prototype.x = …` → all objects get it · `Person.x = …` → objects don't.
- DevTools → Console → expand `[[Prototype]]` (slides: `__proto__`).

## 6. Reading and changing
- `u[key]` = value of variable ❗ Q59 · `u.key` = property named `"key"` · `u["age"]` text · `u[age]` no variable → ReferenceError.
- Missing → `undefined` · `u.city.name` → TypeError ❗ ("undefined OF what?") · `u.city?.name` → `undefined`.
- Add/change `u.x = 1` · remove `delete u.x`. `const` object: contents change ✅, `u = {}` → TypeError.

## 7. Helper methods
- `Object.keys(o)` → names · `.length` = count · `Object.values(o)` → values (ES2017).
- `Object.assign(target, …src)` → **target, changed!** ⚠ (lesson: "new object") → new: `Object.assign({}, a, b)`.

## 8. Reference, spread, shallow copy
- `b = a` → same object · `{ n: 1 } === { n: 1 }` → `false` · a function can change the object you pass.
- `{ ...a, x: 1 }` copy + add/override · `{ ...a, ...b }` merge · **later key wins**. `[...{ a: 1 }]` → TypeError.
- ❗ quiz 10-05 Q3 **Shallow**: nested objects shared. `copy.address.city = …` → **orig too** · `copy.address = {…}` → **only copy**.
- `[...users]` → objects inside shared. Fix: `{ ...o, address: { ...o.address } }` · deep: `structuredClone(o)`.

## 9. Destructuring
- `const { name, age } = user` — names **must match**, order free, skip any. Missing → `undefined`.
- Rename `{ name: n }` (left = property) ❗ · default `{ city = "Vilnius" }` · rest `{ a, ...other }` (ES2018). More: [[arrays-learned]] step 9.

## 10. Arrays of objects
- `cars[1].brand` · `cars[9].brand` → TypeError · `find` → **item** / `undefined` ❗ · `filter` → array · `map(c => c.brand)`.
- Numbers: `[...cars].sort((a, b) => a.price - b.price)` (`b - a` = descending). `sort` **changes** the array.
- Text (teacher): `fa = a.name.toLowerCase()`, `fb = …`; `fa < fb` → `-1`, `fa > fb` → `1`, else `0` (capitals sort before small letters).
- Date: `new Date(a.d) - new Date(b.d)`. ⚠ any negative/positive/0 works, not only -1/1.

## 11. Returning an object
- Several results at once → return an object. Arrow: `() => ({ a: 1 })` · `() => { a: 1 }` → `undefined`.

## 12. Going through properties
- `for (const key in obj)` → keys → value `obj[key]` (not `obj.key`). Or `Object.keys(obj).forEach(key => …)`.
- `for...of` = arrays (on an object → TypeError). Array of objects: `for...of` outside, `for...in` inside.

## 13. `"[object Object]"`
- `"x " + obj` → `"[object Object]"` → print a property `${obj.name}` or `console.log("x", obj)`.

## Look-alikes
- `u.key` (property "key") · `u[key]` (variable's value).
- missing property → `undefined` · property OF `undefined` → TypeError.
- `Object.create(o)` (empty, inherits) · `{ ...o }` (copy) · `Object.assign(o, x)` (changes `o`).
- `b = a` (same) · `{ ...a }` (shallow copy) · `structuredClone(a)` (deep).
- change inside nested → both · replace whole property → only copy.
- `{ name: n }` left of `=` (rename) · right of `=` (build object).
- `for...in` (keys, objects) · `for...of` (values, arrays).
- `() => ({ })` (object) · `() => { }` (body → `undefined`).
- `fullName() {}` (`this` = object) · `fullName: () => {}` (no own `this`).
