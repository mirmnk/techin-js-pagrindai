/*
1. Change Heading Text
HTML:

<h1 id="main-title">Old title</h1>
<button id="change-title-btn">Change title</button>

Task:

Select the <h1> element by its id.
When the button is clicked, change the heading text to: New amazing title.
*/

"use strict";

const elH1 = document.getElementById("main-title");
const elButton1 = document.getElementById("change-title-btn");

elButton1.addEventListener("click", () => {
  elH1.textContent = "New amazing title.";
});
