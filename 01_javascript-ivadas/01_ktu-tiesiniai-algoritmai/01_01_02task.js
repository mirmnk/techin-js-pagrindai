"use strict";

/* 2	Akvariumas	Akvariume gyvena a žuvų, kasdien įdedama b. Kiek bus po n dienų (su paaiškinamaisiais žodžiais)	5, 3, 3 → Po 3 dienų akvariume gyvens 14 žuvų.
 */
let intZuvuAkvariume = +prompt("Kiek žuvų gyvena akvariume?");
let intZuvuIdedama = +prompt("Kiek žuvų į akvariumą įdedama kiekvieną dieną?");
let intDienuPraejo = +prompt("Kiek dienų praėjo?");

const getRezultatas = (intZuvuGyvens) =>
  `Po ${intDienuPraejo} dienų akvariume gyvens ${intZuvuGyvens} žuvų.`;

alert(getRezultatas(intZuvuAkvariume + intZuvuIdedama * intDienuPraejo));
