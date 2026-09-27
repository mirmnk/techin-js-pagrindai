/*
 3. Taupyklė. Jonas turi kiaulę taupyklę, kurioje yra a monetų po 5 ct, b monetų po 20 ct ir c monetų po 2 Lt. Kitokios vertės monetų taupyklėje nėra. Parašykite programą, kuri suskaičiuotų, kiek pinigų kiaulėje taupyklėje iš viso turi Jonas. Atsakymą pateikite litais, pvz.: kai taupyklėje yra 12 monetų po 5 ct, 5 monetos po 20 ct ir 6 monetos po 2 Lt, tuomet ekrane turi būti rodoma: Taupyklėje yra 13.60 Lt.
 */

"use strict";
// run in browser or on server
const inBrowser = typeof window !== "undefined";

// All operations will be in cents

const getResultStr = (intCents) =>
  `Taupyklėje yra ${Number(intCents / 100).toFixed(2)} Lt.`;

// Random int 1 to 10
const getRandomInt = () => Math.floor(Math.random() * 10) + 1;

const int5CentCOINS = inBrowser
  ? +prompt("Kiek yra monetų po 5 ct?")
  : getRandomInt();
const int20CentCOINS = inBrowser
  ? +prompt("Kiek yra monetų po 20 ct?")
  : getRandomInt();
const int200CentCOINS = inBrowser
  ? +prompt("Kiek yra monetų po 2 Lt?")
  : getRandomInt();

const strResult = getResultStr(
  int5CentCOINS * 5 + int20CentCOINS * 20 + int200CentCOINS * 200,
);

if (inBrowser) {
  alert(strResult);
} else {
  const strCOINSinfo = `
-----------------------------------------
         5 ct monetu: ${int5CentCOINS} vnt.
        20 ct monetu: ${int20CentCOINS} vnt.
         2 Lt monetu: ${int200CentCOINS} vnt.
    `;
  console.log(strResult + strCOINSinfo);
}
