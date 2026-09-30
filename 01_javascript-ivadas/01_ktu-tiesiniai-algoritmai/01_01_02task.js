"use strict";

/* 
2. Akvariumas. Akvariume gyvena a žuvų. Kiekvieną dieną Petriukas į akvariumą įdeda b žuvų. Parašykite programą, kuri suskaičiuotų kiek iš viso bus žuvų po n dienų. Rezultatą reikia išvesti su paaiškinamaisiais žodžiais.
 */
const intZuvuAkvariume = +prompt("Kiek žuvų gyvena akvariume?");
const intZuvuIdedama = +prompt(
  "Kiek žuvų į akvariumą įdedama kiekvieną dieną?",
);
const intDienuPraejo = +prompt("Kiek dienų praėjo?");

const getRezultatas = (intZuvuGyvens) =>
  `Po ${intDienuPraejo} dienų akvariume gyvens ${intZuvuGyvens} žuvų.`;

alert(getRezultatas(intZuvuAkvariume + intZuvuIdedama * intDienuPraejo));
