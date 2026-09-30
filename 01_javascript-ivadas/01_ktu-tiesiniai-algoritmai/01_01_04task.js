/*
 4. Automobilis. Automobilių tunelio po Nepriklausomybės aikšte Vilniuje ilgis lygus 264 m. Parašykite programą, kuri apskaičiuotų, kelias sekundes s automobilis važiuoja šiuo tuneliu, jei jo greitis yra v km/h? Rezultatus pateikite šimtųjų tikslumu. 
*/

"use strict";
const inBROWSER = typeof window !== "undefined";

// Random int 5 to 240
const getRandomInt = () => Math.floor(Math.random() * 236) + 5;

const intTUNNELlengthM = 264;

const intCARspeed = inBROWSER
  ? +prompt("Kokiu greičiu važiuoja mašina (Km/h)?")
  : getRandomInt();

// time = distance/speed. To convert kmh to msec  kmh*1000/3600.
const fltSPEEDmsec = (intSpeed) => (intSpeed * 1000) / 3600;
const strRESULT = `Automobilis tunelį pravažiuos per ${(intTUNNELlengthM / fltSPEEDmsec(intCARspeed)).toFixed(2)} s.`;

if (inBROWSER) {
  alert(strRESULT);
} else {
  console.log(
    strRESULT +
      ` (Greitis ${intCARspeed}  Km/h, ${fltSPEEDmsec(intCARspeed)} M/Sec)`,
  );
}
