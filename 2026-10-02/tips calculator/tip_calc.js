"use strict";

const rangeEl = document.getElementById("ctrlRange");
const procCell = document.getElementById("tipProc");
const sum = document.getElementById("sum");
procCell.innerHTML = rangeEl.value + "%";

const update = () => {
  document.getElementById("tip").nextElementSibling.textContent = (
    (sum.value * rangeEl.value) /
    100
  ).toFixed(2);
  document.getElementById("total").nextElementSibling.textContent = (
    sum.value *
    (1 + rangeEl.value / 100)
  ).toFixed(2);
};

rangeEl.addEventListener("input", () => {
  procCell.innerHTML = rangeEl.value + "%";
  update();
});

sum.addEventListener("change", update);
