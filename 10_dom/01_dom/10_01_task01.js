/*
Task:

Add a click listener to all .color-btn buttons (or use delegation on the parent).

Read the data-color attribute using element.dataset.color.

Set the backgroundColor of #color-box to that value.

Bonus: 
Add a "selected" class to the active button and remove it from the others.
*/
"use strict";

const divButtons = document.querySelector("#button-container");

addEventListener("click", (e) => {
  document.getElementById("color-box").style.backgroundColor =
    e.target.dataset.color;
  divButtons
    .querySelectorAll("button")
    .forEach((button) => button.classList.remove("selected"));
  e.target.classList.add("selected");
});
