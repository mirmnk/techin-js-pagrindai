HTML:

<div>
  <button class="color-btn" data-color="lightblue">Blue</button>
  <button class="color-btn" data-color="lightgreen">Green</button>
  <button class="color-btn" data-color="lightpink">Pink</button>
</div>

<div id="color-box" style="width:200px; height:200px; border:1px solid black;">
  Color box
</div>


Task:

Add a click listener to all .color-btn buttons (or use delegation on the parent).

Read the data-color attribute using element.dataset.color.

Set the backgroundColor of #color-box to that value.

Bonus: 
Add a "selected" class to the active button and remove it from the others.