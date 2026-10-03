/*
4. Unique values from array of objects
Given:

const posts = [
  { id: 1, tags: ["js", "web", "frontend"] },
  { id: 2, tags: ["js", "node", "backend"] },
  { id: 3, tags: ["css", "design", "frontend"] }
];

Create a function that returns an array of unique tags, sorted alphabetically:

["backend", "css", "design", "frontend", "js", "node"]
*/

const posts = [
  { id: 1, tags: ["js", "web", "frontend"] },
  { id: 2, tags: ["js", "node", "backend"] },
  { id: 3, tags: ["css", "design", "frontend"] },
];

const getUniqueSorted = (arrPosts) => {
  const arrTags = [];
  arrPosts.forEach((element) => {
    arrTags.push(...element.tags);
  });
  return arrTags;
};

console.log([...new Set(getUniqueSorted(posts))]);
