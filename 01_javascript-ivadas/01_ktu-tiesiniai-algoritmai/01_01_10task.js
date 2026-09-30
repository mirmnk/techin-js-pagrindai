/*
10. Mariaus saldainiai. Marius kiekvieną dieną gauna po n saldainių. Jis suvalgo po a saldainių, o likusius kaupia Kalėdų dovanoms. Kai Marius pradėjo kaupti saldainius, iki Kalėdų buvo likę k dienų. Parašykite programą, kuri suskaičiuotų keliems draugams d Marius galės paruošti kalėdinius saldainių rinkinius, jei kiekviename rinkinyje bus po a saldainių ir kiek saldainių s liks supakavus dovanas.
*/

"use strict";

const inBROWSER = typeof window !== "undefined";

const printResult = (strText) => (inBROWSER ? alert : console.log)(strText);

const getRandomInt = (from = 1, to = 100) =>
  Math.floor(Math.random() * (to - from + 1)) + from;

const getFromPromptOrRandom = (strPromptMsg, rndFrom, rndTo) =>
  inBROWSER ? +prompt(strPromptMsg) : getRandomInt(rndFrom, rndTo);

const intSaldainiuGaunaMarius = getFromPromptOrRandom(
  "Kiek saldainių gauna Marius kiekvieną dieną?",
);
const intSaldainiuSuvalgoMarius = getFromPromptOrRandom(
  "Po kiek saldainių Marius suvalgo kiekvieną dieną?",
  1,
  intSaldainiuGaunaMarius,
);
const intDienuIkiKaledu = getFromPromptOrRandom(
  "Kiek dienų liko iki Kalėdų?",
  1,
  364,
);
const intSaldainiuSukapta =
  intDienuIkiKaledu * (intSaldainiuGaunaMarius - intSaldainiuSuvalgoMarius);
const intDraugu = Math.floor(intSaldainiuSukapta / intSaldainiuSuvalgoMarius);
const intSaldainiuLiks = intSaldainiuSukapta % intSaldainiuSuvalgoMarius;

const strResult = `
Kiek saldainių gauna Marius? ${intSaldainiuGaunaMarius}
Po kiek saldainių suvalgo? ${intSaldainiuSuvalgoMarius}
Kelios dienos liko iki Kalėdų? ${intDienuIkiKaledu}	
Marius dovanas paruoš ${intDraugu} draugų.
Supakavus dovanas liks ${intSaldainiuLiks} saldainiai.
`;

printResult(strResult);
