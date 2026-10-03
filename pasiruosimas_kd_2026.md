## 1. Complex transformation with conditions

Given:

```js
const temperatures = [18, 25, 30, 10, 28];
```

Use **map** to return an array of objects:

```js
[
  { temp: 18, status: "warm" },
  { temp: 25, status: "hot" },
  { temp: 30, status: "hot" },
  { temp: 10, status: "cold" },
  { temp: 28, status: "hot" }
]
```

Rules:

* temp < 15 → `"cold"`
* temp >= 15 && temp < 25 → `"warm"`
* temp >= 25 → `"hot"`

---

## 2. Filter and sort products with multiple conditions

Given:

```js
const products = [
  { title: "Keyboard", price: 40, inStock: true },
  { title: "Mouse", price: 15, inStock: false },
  { title: "Monitor", price: 120, inStock: true },
  { title: "USB Cable", price: 5, inStock: true }
];
```

Write a function that:

1. **Filters** only products that are `inStock`.
2. **Filters** only products with `price >= 10`.
3. **Sorts** the result by price from **cheapest to most expensive**.
4. Returns an array of **titles only**.

---

## 3. Parse CSV string into array of objects

Given a CSV string:

```js
const input = "name,age,city\nJonas,25,Vilnius\nOna,30,Kaunas\nPetras,22,Klaipeda";
```

Write a function that returns:

```js
[
  { name: "Jonas", age: 25, city: "Vilnius" },
  { name: "Ona", age: 30, city: "Kaunas" },
  { name: "Petras", age: 22, city: "Klaipeda" }
]
```

Use **string methods**, **arrays**, and **objects** (no libraries).

---

## 4. Unique values from array of objects

Given:

```js
const posts = [
  { id: 1, tags: ["js", "web", "frontend"] },
  { id: 2, tags: ["js", "node", "backend"] },
  { id: 3, tags: ["css", "design", "frontend"] }
];
```

Create a function that returns an array of **unique tags**, sorted alphabetically:

```js
["backend", "css", "design", "frontend", "js", "node"]
```

---

## 5. Find the most frequent character in a string

Write a function `mostFrequentChar(str)` that returns the **character** that appears **most often** in the string (ignore spaces, case-insensitive).

Example:
`"Hello world"` → `"l"`

If there’s a tie, you can return **any one** of the most frequent characters.

---

## 6. Deep destructuring of nested objects

Given:

```js
const data = {
  status: "ok",
  user: {
    id: 15,
    profile: {
      name: "Laura",
      email: "laura@example.com"
    },
    roles: ["user", "editor"]
  }
};
```

Using **destructuring**, extract:

* `status`
* `userId` (from `id`)
* `name`
* `primaryRole` (first element in `roles`)

All as separate variables (no `data.` accesses allowed in your final code).

---

## 7. Add new property during mapping

Given:

```js
const products = [
  { title: "Phone", price: 500 },
  { title: "Laptop", price: 1200 },
  { title: "Tablet", price: 800 }
];
```

Use **map** to return:

```js
[
  { title: "Phone", price: 500, priceWithVAT: 605 },
  { title: "Laptop", price: 1200, priceWithVAT: 1452 },
  { title: "Tablet", price: 800, priceWithVAT: 968 }
]
```

Assume VAT = 21%.

---

## 8. Merge arrays of objects by id

Given:

```js
const people = [
  { id: 1, name: "Jonas" },
  { id: 2, name: "Ona" },
  { id: 3, name: "Petras" }
];

const scores = [
  { id: 1, score: 10 },
  { id: 3, score: 7 },
  { id: 2, score: 9 }
];
```

Write a function that returns:

```js
[
  { id: 1, name: "Jonas", score: 10 },
  { id: 2, name: "Ona", score: 9 },
  { id: 3, name: "Petras", score: 7 }
]
```

(Assume each `id` exists in both arrays.)

---

## 9. Create a “short description” for products

Given:

```js
const items = [
  { name: "Phone", description: "A very nice smartphone with good camera", price: 500 },
  { name: "Laptop", description: "Powerful laptop for work and games", price: 1200 }
];
```

Write a function that returns an array of **strings** in format:

```txt
"Phone (500€): A very nice smartphone..."
"Laptop (1200€): Powerful laptop for work..."
```

Rules:

* If `description.length > 25`, cut it and add `"..."`.
* Use **template literals**, **conditions**, and **string methods**.

---

## 10. Sort by criteria

Given:

```js
const employees = [
  { name: "Jonas", department: "IT", salary: 2000 },
  { name: "Ona", department: "HR", salary: 1800 },
  { name: "Petras", department: "IT", salary: 2200 },
  { name: "Greta", department: "HR", salary: 2100 }
];
```

Write functions to Sort:

1. Employees by `department` **alphabetically**.
2. Employees by `salary` **descending**.

Return the sorted arrays.

---

## 11. Search with multiple filters

Given:

```js
const books = [
  { title: "JS Basics", pages: 120, tags: ["js", "beginner"] },
  { title: "Advanced JS", pages: 350, tags: ["js", "advanced"] },
  { title: "CSS Mastery", pages: 200, tags: ["css"] },
  { title: "HTML & CSS", pages: 150, tags: ["html", "css", "beginner"] }
];
```

Write a function:

```js
searchBooks(books, { minPages, hasTag })
```

which returns books that:

* have at least `minPages` pages
* **and** contain the tag `hasTag` in their `tags` array

Example:

```js
searchBooks(books, { minPages: 150, hasTag: "css" });
```

Should return books matching both conditions.

---
