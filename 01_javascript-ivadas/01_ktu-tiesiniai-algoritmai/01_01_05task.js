/*
 5. Statybininkas. Statybininkui reikia pastatyti sieną, kurios ilgis yra a metrų, o aukštis h metrų (a ir h – sveikieji skaičiai). Kiek reikės plytų, kurių ilgis 20 cm, o aukštis 10 cm ir kiek kainuos plytos, jeigu vienos plytos kaina k Lt. Pinigų sumą pateikti šimtųjų tikslumu. 
 */

"use strict";

const inBROWSER = typeof window !== "undefined";

const printOutput = (strText) => (inBROWSER ? alert : console.log)(strText);

const getPlotis = (ilgis, aukstis) => ilgis * aukstis;

// Random int 5 to 100
const getRandomInt = () => Math.floor(Math.random() * 96) + 5;

const objPLYTA = { ilgis: 0.2, aukstis: 0.1 };
const plytosKaina = 0.2;

const intSienosIlgis = inBROWSER
  ? +prompt("Įveskite sienos ilgį metrais: ")
  : getRandomInt();
const intSienosAukstis = inBROWSER
  ? +prompt("Įveskite sienos aukštį metrais: ")
  : getRandomInt();

const plytosPlotis = getPlotis(objPLYTA.ilgis, objPLYTA.aukstis);
const sienosPlotis = getPlotis(intSienosIlgis, intSienosAukstis);
const intPlytu = Number(sienosPlotis / plytosPlotis);

printOutput(`
      Sienos ilgis: ${intSienosIlgis} m.
    Sienos aukštis: ${intSienosAukstis} m.
      Plytos kaina: ${plytosKaina} Lt.
    __________________________________________
      Plytų kiekis: ${Math.ceil(intPlytu)} vnt.
    Plytos kainuos: ${Number(intPlytu * plytosKaina).toFixed(2)} Lt.
    `);
