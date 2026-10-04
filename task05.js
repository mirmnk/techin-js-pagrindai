/*
 5. Find the most frequent character in a string
Write a function mostFrequentChar(str) that returns the character that appears most often in the string (ignore spaces, case-insensitive).

Example: "Hello world" → "l"

If there’s a tie, you can return any one of the most frequent characters.
 */

// Plan: create array of counters objects {char, count}, then find max by counter with reduce
const mostFrequentChar = (str) => {
  const counters = {};

  for (const char of [...str.toLowerCase()]) {
    if (char === " ") continue;
    counters[char] = (counters[char] || 0) + 1;
  }

  return Object.keys(counters).reduce((max, curKey) =>
    counters[curKey] > counters[max] ? curKey : max,
  );
};

console.log(mostFrequentChar("Hello world"));
console.log(
  mostFrequentChar(
    "Write a function mostFrequentChar(str) that returns the character that appears most often in the string (ignore spaces, case-insensitive).",
  ),
);
