/*
03-10. Krepšinio komandų vidurkiai
Jonas ir Mikas žaidžia krepšinį skirtingose komandose. Per paskutinius tris žaidimus Jono komanda
surinko 89, 120 ir 103 taškus. Tuo tarpu Miko 116, 94 ir 123 taškus.
  - Apskaičiuokite kiekvienos komandos vidutinį taškų skaičių
  - Nustatykite, kuri komanda laimi pagal vidurkį
  - Išveskite laimėtoją ir jo vidurkį
  - Atsižvelkite į galimą lygiąsias
  - Pridėk Mary iš dar kitos komandos: 97, 134, 105
  - Palygink visas tris komandas ir irgi išveskite laimėtoją ir jo vidurkį į konsolę.
*/

"use strict";

const arrJonasTeam = [89, 120, 103];
const arrMikasTeam = [116, 94, 123];
const arrMaryTeam = [97, 134, 105];

const getAvg = (arrValues) => {
  if (!arrValues.length) return NaN;
  const intSum = arrValues.reduce((sum, x) => sum + x, 0);
  return intSum / arrValues.length;
};

const avgJonas = getAvg(arrJonasTeam);
const avgMikas = getAvg(arrMikasTeam);

let strResult;

if (avgJonas > avgMikas) {
  strResult = `Jono komanda laimi! (vidurkis: ${avgJonas})`;
} else if (avgJonas === avgMikas) {
  strResult = `Lygiosios! (vidurkiai: ${avgJonas})`;
} else {
  strResult = `Miko komanda laimi! (vidurkis: ${avgMikas})`;
}

console.log(strResult);

const avgMary = getAvg(arrMaryTeam);

if (avgJonas > avgMikas && avgJonas > avgMary) {
  strResult = `Jono komanda laimi iš trijų komandų! (vidurkis: ${avgJonas})`;
} else if (avgMikas > avgJonas && avgMikas > avgMary) {
  strResult = `Miko komanda laimi iš trijų komandų! (vidurkis: ${avgMikas})`;
} else if (avgMary > avgJonas && avgMary > avgMikas) {
  strResult = `Mary komanda laimi iš trijų komandų! (vidurkis: ${avgMary})`;
} else {
  // lygiosios
  if (avgMary === avgJonas && avgMary === avgMikas) {
    strResult = `Lygiosios! Visų komandų vidurkiai yra vienodi (${avgMary})`;
  } else if (avgMary === avgJonas) {
    strResult = `Mary ir Jono komandos laimėjo su vienodais rezultatais! (${avgMary})`;
  } else if (avgJonas === avgMikas) {
    strResult = `Jono ir Miko komandos laimėjo su vienodais rezultatais! (${avgJonas})`;
  } else {
    strResult = `Mary ir Miko komandos laimėjo su vienodais rezultatais! (${avgMikas})`;
  }
}

console.log(strResult);
