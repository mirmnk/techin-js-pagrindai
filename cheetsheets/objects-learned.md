# Objects: everything from the course

Sources: lesson 9 "Objektai" (2026-09-28, slides `9_objektai` + recording), lesson 6 "Masyvai" (2026-09-17, notes + slides on sorting objects), lesson 12 Kahoot review (10-01), lesson 13 exam prep (10-02); wiki pages `objects-basics`, `spread-and-rest`, `reference-vs-value`, `loops`, `browser-input-output`; **my quiz mistakes** ([[quiz-log]]). Short version: [[objects-cheatsheet]].

**Legend:** `name(arg?)` → return value (`?` = optional) · ❗ = I got this wrong in a quiz (quiz + question) · ⚠ = mistake in a lesson/slide · 📘 = not taught, added only because it explains course material · 🔒 = differs in strict mode · ES2016+ features are tagged (course = ES6) with the ES6 alternative.

**Every value is checked in Node with `"use strict"`** (2026-10-05) — my course always uses it.

**Contents:** 1 What an object is · 2 Literal, methods, `this` · 3 Four ways to create · 4 Classes · 5 Prototype · 6 Reading and changing properties · 7 Helper methods · 8 Reference, spread, shallow copy · 9 Destructuring · 10 Arrays of objects · 11 Returning an object · 12 Going through properties · 13 `"[object Object]"` · 14 My mistakes · 15 Recall

## Declarations used in this file

| Declaration | Returns | Changes something? | Version |
|---|---|---|---|
| `Object.keys(obj)` | array of property **names** (strings) | no | ES5 |
| `Object.values(obj)` | array of **values** | no | ES2017 → ES6: `Object.keys(obj).map(k => obj[k])` |
| `Object.assign(target, source1, …)` | **`target` itself** | **yes — changes `target`** | ES6 |
| `Object.create(proto)` | new **empty** object; its prototype = `proto` | no | ES5 |
| `delete obj.key` | `true` | **yes** — removes the property | ES1 |
| `{ ...obj }` (spread) | new object (shallow copy) | no | ES2018 → ES6: `Object.assign({}, obj)` |
| `arr.sort(compareFn(a, b))` | the **same** array, sorted | **yes** (the array) | ES1 |
| `str.toLowerCase()` | new string | no | ES1 |

## 1. What an object is

- **Array** = a **list** of many similar things (cars, fruits, a shopping cart).
- **Object** = a **description of one** real thing (one person, one car, one product).
- An object has **properties** (what it is / has: `name`, `color`) and **methods** (what it can do: `drive()`). A method is a **function** stored in the object.
- `typeof {}` and `typeof []` → `"object"` → check an array with `Array.isArray(x)` ([[types-learned]] section 1).
- **Symbol** (mentioned only): a primitive type; `Symbol("id")` is a unique value that can be a property key. Rarely used.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| array `[ ]` | object `{ }` | list, items by **index** vs one thing, values by **name** (key) |
| property | method | a value (`car.color`) vs a function (`car.drive()`) — call it with `()` |

## 2. Object literal, methods and `this`

Object literal = **curly braces** with **`key: value`** pairs, separated by **commas**.

```javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  fullName() {                    // short form; slides: fullName: function () { … }
    return this.firstName + " " + this.lastName;
  },
};
person.firstName;   // "John"      object . key
person.fullName();  // "John Doe"  a method needs ()
```

- **Shorthand from variables:** `const userName = "John", age = 42;` → `{ userName, age }` = `{ userName: "John", age: 42 }`.
- **`this`** inside a method = **this object** (`this.firstName` = this object's `firstName`).
- An **arrow function has no own `this`** → as a method it does **not** point to the object:

```javascript
const p2 = { firstName: "John", lastName: "Doe", fullName: () => this.firstName + " " + this.lastName };
p2.fullName();      // "undefined undefined"
```

- → For methods that use `this`, write `fullName() { … }`, not `fullName: () => …`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `fullName() { … }` | `fullName: () => …` | `this` = the object vs no own `this` (wrong for methods) |
| `{ age }` | `{ age: age }` | shorthand, same result |

## 3. Four ways to create an object

| Way | Example | Notes |
|---|---|---|
| **Object literal** | `const a = { name: "Ona" };` | simplest, used most |
| **`new Object()`** | `const b = new Object(); b.name = "Ona";` | empty object, then add; rarely used |
| **Constructor function** | `function Person(name) { this.name = name; }` → `new Person("Ona")` | older; **capital** name; needs **`new`** |
| **Class** (ES6) | `class User { constructor(name) { this.name = name; } }` → `new User("Ona")` | modern; section 4 |

```javascript
const c = new Person("Ona");   // Person { name: "Ona" }
Person("Ona");                 // TypeError (undefined has no properties) — forgot new
```

- ⚠ The lesson showed the constructor function **without `new`** — it doesn't work. 🔒 Strict mode: `this` = `undefined` → TypeError (normal mode: no error, but no object either).
- **`Object.create(proto)`** (ES5) → new **empty** object whose **prototype** is `proto`; it **inherits** from it (slide: `job` → `barista`):

```javascript
const job = { position: "cashier", type: "hourly" };
const barista = Object.create(job);
barista;                       // {} — empty!
barista.type;                  // "hourly" — found in the prototype (job)
barista.position = "barista";  // own property; job.position stays "cashier"
```

- ⚠ The lesson said `Object.create` "copies all properties". It **doesn't copy** — the object is empty and only inherits.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `new Person("Ona")` | `Person("Ona")` | new object vs 🔒 TypeError |
| `Object.create(job)` | `{ ...job }` | empty, **inherits** vs **copy** |

## 4. Classes

A **class** = a **template** (šablonas) for many similar objects. Values come when you create each object with **`new`**.

```javascript
class User {
  constructor(name) {      // runs on "new"; this = the new object
    this.name = name;
  }
  sayHi() {                // no "function" keyword, no commas between methods
    return `Hi, ${this.name}`;
  }
}
const u2 = new User("John");   // new User("Sophia")… — as many as you need
u2.sayHi();                // "Hi, John"
```

- Class name with a **capital** letter. ES6.
- `console.log(u2)` → `User { name: "John" }`; expand the prototype → `constructor: class User` and the methods.
- Classes come back in C#.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| class | object | template vs one thing made from it |
| `class User` | `function Person` | modern (ES6) vs older way; both need `new` |

## 5. Prototype

- Every object **inherits** properties and methods from its **prototype** ("ancestor"). Teacher: **exam question**.
- That's why `{ name: "Ona" }.toString()` works → `"[object Object]"` — you never wrote `toString`.
- Missing property → JS looks in the **prototype chain** (Kahoot).
- See it: DevTools (F12) → Console → `console.log(obj)` → expand **`[[Prototype]]`** (slides: `__proto__`).

With a **constructor function**, add shared properties/methods through its **prototype** (slides):

```javascript
function Person(name) { this.name = name; }
const c = new Person("Ona");
Person.nationality = "English";             // added to the FUNCTION
c.nationality;                              // undefined
Person.prototype.nationality = "English";   // added to the prototype
c.nationality;                              // "English" — inherited
Object.keys(c);                             // ["name"] — only its own properties
```

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `Person.prototype.x = …` | `Person.x = …` | all objects get `x` vs objects don't get it |
| own property | inherited property | listed by `Object.keys` vs not listed (but readable) |

## 6. Reading and changing properties

### Dot vs brackets ❗ big test Q59

```javascript
const u = { name: "Ona", age: 30 };
u.city = "Vilnius";  // add (or change, if it exists)
delete u.city;       // remove → true
const key = "age";
u[key];          // 30         the VALUE of the variable → u["age"]
u.key;           // undefined  a property literally named "key"
u[age];          // ReferenceError (name doesn't exist) — no quotes = a variable
u.city;          // undefined  missing property — no error
u.city.name;     // TypeError (undefined has no properties)
u.city?.name;    // undefined  (?. ES2020, taught in lesson 3)
```

- Slide example: `let propertyName = "make"; myCar[propertyName] = "Ford";` — brackets let a variable choose the property.
- ❗ arrays quiz Q13, error quiz Q10: ask **"undefined OF what?"** — if the thing before the dot is `undefined`/`null` → TypeError ([[types-learned]] section 12a).
- **`const` object**: contents **can** change (`u.age = 31`, `delete`). Only `u = { … }` → TypeError (const can't be changed).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `u.key` | `u[key]` | property named `"key"` vs property named by the variable's value ❗ |
| `u.city` | `u.city.name` | `undefined` vs TypeError |
| `u.age = 31` (const `u`) | `u = {}` | ✅ vs TypeError |

## 7. Object helper methods

```javascript
const car = { brand: "Volvo", year: 2015, color: "red" };
Object.keys(car);                       // ["brand", "year", "color"]
Object.keys(car).length;                // 3 — how many properties (slide)
Object.values(car);                     // ["Volvo", 2015, "red"]   ES2017
Object.keys(car).map((k) => car[k]);    // same, ES6 way
```

- **`Object.assign(target, …sources)`** (ES6) copies **into the first argument** and returns **it**:

```javascript
const name = { firstName: "Philip", lastName: "Fry" };
const details = { job: "Delivery Boy" };
const character = Object.assign(name, details);   // slide example
character === name;               // true — name itself was changed!
const copy = Object.assign({}, name);             // new object: {} first (slide)
```

- ⚠ The lesson said `Object.assign` "creates a new object". It **changes `target`**.
- `Object.assign`, `Object.create` = older ways; today use **spread** (section 8).

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `Object.keys(o)` | `Object.values(o)` | names vs values |
| `Object.assign(a, b)` | `Object.assign({}, a, b)` | changes `a` vs new object |

## 8. Reference, spread and shallow copy

The variable stores an **address**, not the object (same as arrays: [[types-learned]] section 6).

```javascript
const a = { n: 1 };
const b = a;                 // same object, NOT a copy → b.n = 99 changes a.n too
a === b;                     // true — same address
({ n: 1 }) === ({ n: 1 });   // false — two objects, same contents
```

- `===` compares **addresses**, never contents. An object passed to a function → the function **can change** the original.

### Spread `{ ...obj }`

Object spread is **ES2018** (array spread is ES6) → ES6: `Object.assign({}, obj, { … })`.

```javascript
const circle = { radius: 10 };
const style = { backgroundColor: "red" };
const user = { name: "Ona", ip: "1.1.1.1" };
({ ...circle, color: "black" });   // { radius: 10, color: "black" }  copy + add
({ ...circle, ...style });         // { radius: 10, backgroundColor: "red" }  merge
({ ...user, ip: "2.5.5.5" });      // { name: "Ona", ip: "2.5.5.5" }  override
```

- **Later key wins** — order matters. Good when 49 of 50 properties stay the same.
- `[...{ a: 1 }]` → TypeError (object is not iterable) — an object can't be spread into an array.

### Shallow copy ❗ quiz 2026-10-05 Q3 (open weak spot)

Spread copies only the **top level**. A nested object/array keeps the **same address** in both.

```javascript
const orig = { name: "Ona", address: { city: "Vilnius" } };
const copy = { ...orig };
copy.name = "Jonas";                   // top level → only copy
copy.address.city = "Kaunas";          // INSIDE the shared object → orig too!
orig.name;                             // "Ona"
orig.address.city;                     // "Kaunas"
copy.address = { city: "Klaipėda" };   // REPLACE the whole property → only copy
orig.address.city;                     // still "Kaunas"
```

- Rule: **change inside** a nested item → both see it. **Replace the whole** property → only the copy.
- Arrays of objects: `[...users]` copies only the array; `copy[0].name = …` changes `users[0]` too.
- Fix: `{ ...orig, address: { ...orig.address } }`. Deep copy (lesson 6 notes): `structuredClone(obj)`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `b = a` | `b = { ...a }` | same object vs (shallow) copy |
| `copy.address.city = …` | `copy.address = {…}` | orig changes too vs only copy |
| `{ ...o }` | `structuredClone(o)` | shallow vs deep copy |

## 9. Destructuring objects

Take properties out into variables in one line. Teacher: used very often — use it in tasks and at the exam. More: [[arrays-learned]] step 9.3.

```javascript
const user = { vardas: "Jonas", amzius: 25, miestas: "Vilnius" };
const { miestas, vardas } = user;    // "Vilnius", "Jonas" — order free, amzius skipped
const { vardas: n } = user;          // rename: n = "Jonas" ❗ arrays quiz Q9
const { salis = "Lietuva" } = user;  // default (no salis in user)
const { zip } = user;                // undefined — no such property
```

- Names **must match** the properties (case too); order free; take only what you need.
- Rename = `{ property: newVariable }` — the **left** name is the property.
- Rest (**ES2018**, lesson 6 notes): `const { vardas, ...other } = user;` → `other = { amzius: 25, miestas: "Vilnius" }`.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `const { a, b } = obj` | `const [a, b] = arr` | by **name** vs by **position** |
| `{ name: n }` left of `=` | `{ name: n }` right of `=` | rename (take out) vs build an object |

## 10. Arrays of objects

The most common data shape in tasks: a **list** of things, each an **object**.

```javascript
const cars = [
  { brand: "Volvo", year: 2015, price: 9000 },
  { brand: "bmw", year: 2020, price: 25000 },
  { brand: "Audi", year: 2018, price: 15000 },
];
cars[1].brand;                              // "bmw"
cars[5].brand;                              // TypeError (undefined has no properties)
cars.find((c) => c.year === 2018);          // { brand: "Audi", … } — the ITEM ❗ big test Q46
cars.find((c) => c.year === 1999);          // undefined ❗ arrays quiz Q6
cars.map((c) => c.brand);                   // ["Volvo", "bmw", "Audi"]
```

`find(fn)` → item / `undefined` · `filter(fn)` → new array · `map(fn)` → new array · `reduce(fn, start)` → one value. Details: [[arrays-learned]] steps 3–5.

### Sorting by a property

`sort(compareFn(a, b))` → the **same** array, sorted (**changes** it; keep the original: `[...cars].sort(…)`). Compare result: negative → `a` first, positive → `b` first, `0` → keep.

```javascript
[...cars].sort((a, b) => a.price - b.price);   // numbers ascending: 9000, 15000, 25000
[...cars].sort((a, b) => b.price - a.price);   // descending

[...cars].sort((a, b) => {                     // text — teacher's method (lesson 6 slides)
  const fa = a.brand.toLowerCase();
  const fb = b.brand.toLowerCase();
  if (fa < fb) return -1;
  if (fa > fb) return 1;
  return 0;
});                                            // Audi, bmw, Volvo
```

- 📘 Why lowercase: `<` puts **all capitals before small letters** (`"Zoo" < "apple"` → `true`). Without it: Audi, Volvo, bmw.
- By date (slide): `(a, b) => new Date(a.joinedDate) - new Date(b.joinedDate)`.
- ⚠ Lesson 12: "compare returns -1, 0 or 1" — any **negative / positive / 0** number works.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `find(fn)` | `filter(fn)` | first item / `undefined` vs array of all / `[]` |
| `cars.sort(fn)` | `[...cars].sort(fn)` | changes `cars` vs `cars` untouched |
| numbers `a.price - b.price` | text `fa < fb` | subtract vs compare lowercase with `<` / `>` |

## 11. Returning an object from a function

A function returns **one** value → to give back several results, return an **object**:

```javascript
const describeTemp = (celsius) => ({ celsius, fahrenheit: celsius * 1.8 + 32 });
describeTemp(20);           // { celsius: 20, fahrenheit: 68 }
const makeOna = () => { name: "Ona" };
makeOna();                  // undefined — { } read as the function BODY
```

- 📘 Why the round brackets `({ … })`: without them `{ }` is the function body, not an object.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `() => ({ a: 1 })` | `() => { a: 1 }` | the object vs `undefined` |

## 12. Going through properties

```javascript
const auto = { brand: "BMW", year: 2020 };
for (const key in auto) {                 // for...in → each KEY
  console.log(`${key}: ${auto[key]}`);    // brand: BMW, year: 2020
}
Object.keys(auto).forEach((key) => console.log(`${key}: ${auto[key]}`));   // slide way
```

- In the loop use **`auto[key]`**, not `auto.key` (→ `undefined` every time). `for...in` → objects (keys) · `for...of` → arrays (values). `for...of` on a plain object → TypeError (object is not iterable).
- **Array of objects:** `for...of` over the array, `for...in` (or `Object.keys`) inside for each object.
- ⚠ The lesson said both came in 2015 — only `for...of` is ES6; `for...in` is older.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `for...in` (object) | `for...of` (array) | keys vs values |
| `auto[key]` in the loop | `auto.key` | the value vs `undefined` |

## 13. Printing an object: `"[object Object]"`

An object turned into **text** → `"[object Object]"`.

```javascript
const user = { name: "Ona", age: 30 };
"User: " + user;          // "User: [object Object]"
`User: ${user.name}`;     // "User: Ona" — print a PROPERTY
console.log("User", user);   // comma → the real object, can be expanded
```

- On the page: `[object Object]` = you put the **whole object** instead of one property.

### Compared with look-alikes

| This | vs | Difference |
|---|---|---|
| `"x " + user` | `console.log("x", user)` | text `[object Object]` vs the real object |

## 14. My mistakes → where they are explained

| Quiz | Mistake | Section |
|---|---|---|
| Big test Q59 | `u.key` when `const key = "age"` → `undefined`, not `30` | 6 |
| Quiz 10-05 Q3 | shallow copy: change inside a shared object vs replace a whole slot | 8 |
| Error quiz Q10, arrays quiz Q13 | property of `undefined` → TypeError, not `undefined` | 6 |
| Big test Q46, arrays quiz Q6 | `find` → the item; not found → `undefined` | 10 |
| Arrays quiz Q9 | destructuring rename `{ property: newName }` | 9 |

## 15. Recall from memory

1. Array vs object — what does each describe?
2. `const k = "age"; const u = { age: 30 };` — what are `u.k` and `u[k]`?
3. `const o = {}; o.a;` and `o.a.b;` — value or error?
4. Why is `fullName: () => this.firstName` wrong as a method?
5. Name the four ways to create an object. What is wrong with `Person("Ona")`?
6. Does `Object.create(job)` copy `job`'s properties?
7. `const c = { ...o }; c.inner.x = 5; c.top = 1;` — which change is seen in `o`?
8. `const { name: n } = { name: "Ona" };` — what is `n`? Is a variable `name` created?
9. Sort an array of objects by `title` (text) the teacher's way — the steps?
10. `"User: " + user` prints `User: [object Object]` — why, and how to fix?

<details><summary>Answers</summary>

1. Array = a list of many similar things; object = a description of one thing (properties + methods).
2. `undefined` (property literally named `"k"`) and `30`.
3. `undefined` (missing, no error); TypeError (undefined has no properties).
4. Arrow functions have no own `this` → `this` is not the object. Use `fullName() { … }`.
5. Literal, `new Object()`, constructor function + `new`, class + `new`. Missing `new` → 🔒 TypeError.
6. No — an empty object that inherits from `job` (prototype).
7. `c.inner.x = 5` (shared nested object); `c.top = 1` is not.
8. `"Ona"`; no — it was renamed to `n`.
9. `[...arr].sort((a, b) => …)`: lowercase both titles; `fa < fb` → `-1`; `fa > fb` → `1`; else `0`.
10. The whole object is turned into text. Print a property: `${user.name}` (or `console.log("User", user)`).

</details>
