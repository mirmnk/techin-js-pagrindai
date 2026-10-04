/*
 1. Complex transformation with conditions
Given:

const temperatures = [18, 25, 30, 10, 28];

Use map to return an array of objects:

[
  { temp: 18, status: "warm" },
  { temp: 25, status: "hot" },
  { temp: 30, status: "hot" },
  { temp: 10, status: "cold" },
  { temp: 28, status: "hot" }
]

Rules:

temp < 15 → "cold"
temp >= 15 && temp < 25 → "warm"
temp >= 25 → "hot"
 */

"use strict";

const temperatures = [18, 25, 30, 10, 28];

const getTemperatureObj = (temp) => {
  let status = "";
  switch (true) {
    case temp < 15:
      status = "cold";
      break;
    case temp >= 15 && temp < 25:
      status = "warm";
      break;
    case temp >= 25:
      status = "hot";
      break;
  }
  return { temp: temp, status: status };
};

const t = temperatures.map((x) => getTemperatureObj(x));
for (const i of t) {
  console.log(i);
}
