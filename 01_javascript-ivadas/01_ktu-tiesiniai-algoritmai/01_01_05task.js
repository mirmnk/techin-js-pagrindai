/*
 5. Statybininkas. Statybininkui reikia pastatyti sieną, kurios ilgis yra a metrų, o aukštis h metrų (a ir h – sveikieji skaičiai). Kiek reikės plytų, kurių ilgis 20 cm, o aukštis 10 cm ir kiek kainuos plytos, jeigu vienos plytos kaina k Lt. Pinigų sumą pateikti šimtųjų tikslumu. 
 */

"use strict";

const inBROWSER = typeof window !== "undefined";

const printOutput = (strText) => (inBROWSER ? alert : console.log)(strText);

const getPlotas = (ilgis, aukstis) => ilgis * aukstis;

// Random int 5 to 100
const getRandomInt = () => Math.floor(Math.random() * 96) + 5;

// brick dimensions in cm
const objPLYTA = { ilgis: 20, aukstis: 10 };

// All calculation in cents and centimeters in order to not deal with floating point stuff
const plytosKainaLt = inBROWSER
  ? +prompt("Įveskite plytos kainą litais: ")
  : +Math.random().toFixed(2);

// converting to cents
const plytosKainaCt = Math.round(plytosKainaLt * 100);

const intSienosIlgisM = inBROWSER
  ? +prompt("Įveskite sienos ilgį metrais: ")
  : getRandomInt();
const intSienosAukstisM = inBROWSER
  ? +prompt("Įveskite sienos aukštį metrais: ")
  : getRandomInt();

const intSienosIlgisCm = intSienosIlgisM * 100;
const intSienosAukstisCm = intSienosAukstisM * 100;

const plytosPlotas = getPlotas(objPLYTA.ilgis, objPLYTA.aukstis);
const sienosPlotas = getPlotas(intSienosIlgisCm, intSienosAukstisCm);
const intPlytu = Math.ceil(sienosPlotas / plytosPlotas);

printOutput(`
      Sienos ilgis: ${intSienosIlgisM} m.
    Sienos aukštis: ${intSienosAukstisM} m.
      Plytos kaina: ${plytosKainaLt} Lt.
    __________________________________________
      Plytų kiekis: ${intPlytu} vnt.
    Plytos kainuos: ${((intPlytu * plytosKainaCt) / 100).toFixed(2)} Lt.
    `);
