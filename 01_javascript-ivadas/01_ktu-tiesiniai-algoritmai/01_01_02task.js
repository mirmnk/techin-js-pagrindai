"use strict";

/* 2. Akvariumas. Akvariume gyvena a žuvų. Kiekvieną dieną Petriukas į akvariumą įdeda b žuvų. Parašykite programą, kuri suskaičiuotų kiek iš viso bus žuvų po n dienų. Rezultatą reikia išvesti su paaiškinamaisiais žodžiais.
 */
let intZuvuAkvariume = +prompt("Kiek žuvų gyvena akvariume?");
let intZuvuIdedama = +prompt("Kiek žuvų į akvariumą įdedama kiekvieną dieną?");
let intDienuPraejo = +prompt("Kiek dienų praėjo?");

const getRezultatas = (intZuvuGyvens) =>
  `Po ${intDienuPraejo} dienų akvariume gyvens ${intZuvuGyvens} žuvų.`;

alert(getRezultatas(intZuvuAkvariume + intZuvuIdedama * intDienuPraejo));
