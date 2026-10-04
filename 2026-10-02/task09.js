/*
9. Create a “short description” for products
Given:

const items = [
  { name: "Phone", description: "A very nice smartphone with good camera", price: 500 },
  { name: "Laptop", description: "Powerful laptop for work and games", price: 1200 }
];

Write a function that returns an array of strings in format:

"Phone (500€): A very nice smartphone..."
"Laptop (1200€): Powerful laptop for work..."

Rules:

If description.length > 25, cut it and add "...".
Use template literals, conditions, and string methods.
*/

const items = [
  {
    name: "Phone",
    description: "A very nice smartphone with good camera",
    price: 500,
  },
  {
    name: "Laptop",
    description: "Powerful laptop for work and games",
    price: 1200,
  },
];

const trimString = (strText, intMax) => {
  if (strText.length <= intMax) return strText;
  const lastSpaceIndex = strText.slice(0, intMax).lastIndexOf(" ");
  return strText.slice(0, lastSpaceIndex);
};

const getStrings = (arrItems) => {
  const arrOutput = [];
  arrItems.reduce(
    (output, objItem) =>
      arrOutput.push(
        `${objItem.name} (${objItem.price}€): ${trimString(objItem.description, 25)}...`,
      ),
    "",
  );
  return arrOutput;
};

console.log(getStrings(items));
