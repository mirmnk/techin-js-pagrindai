/*
9. Gimtadienis. Tautvydas rengia gimtadienio šventę. Norėdamas pavaišinti svečius, jis iškepė a sausainių. Prasidėjus šventei, jis pastebėjo, kad dar b draugų iškepė lygiai tiek pat sausainių kaip ir jis, ir atsinešė į gimtadienį. Šventėje iš viso dalyvavo c žmonių (įskaitant ir patį jubiliatą). Norėdamas, kad nei vienas neliktų nuskriaustas, Tautvydas sausainius visiems svečiams padalijo po lygiai ir, kadangi šiandien jo gimtadienis, likusius po dalybų nusprendė pasilikti sau. Parašykite programą, kuri apskaičiuotų, po kiek sausainių gavo kiekvienas gimtadienio dalyvis ir kiek papildomai sausainių atiteko Tautvydui.
 */

"use strict";

const inBROWSER = typeof window !== "undefined";

const printResult = (strText) => (inBROWSER ? alert : console.log)(strText);

const getRandomInt = (from = 1, to = 100) =>
  Math.floor(Math.random() * (to - from + 1)) + from;

const getFromPromptOrRandom = (strPromptMsg, rndFrom, rndTo) =>
  inBROWSER ? +prompt(strPromptMsg) : getRandomInt(rndFrom, rndTo);

const intSausainiuTautvydo = getFromPromptOrRandom(
  "Kiek sausainių iškepė Tautvydas?",
  15,
  60,
);
const intDrauguIskepeTiekpat = getFromPromptOrRandom(
  "Kiek draugų iškepe tiek pat sausainių, kaip Tautvydas?",
  2,
  5,
);
let intZmoniuSventeje = 0;
do {
  intZmoniuSventeje = getFromPromptOrRandom(
    "Kiek žmonių dalyvavo šventeje? (Turi būti nemažiau " +
      (intDrauguIskepeTiekpat + 1) +
      ")",
    5,
    12,
  );
} while (intZmoniuSventeje < intDrauguIskepeTiekpat + 1);

const intVisoSausainiu =
  intSausainiuTautvydo + intDrauguIskepeTiekpat * intSausainiuTautvydo;
const intSausainiuZmogui = Math.floor(intVisoSausainiu / intZmoniuSventeje);
const intPapildomuSausainiu = intVisoSausainiu % intZmoniuSventeje;

const strResult = `
                Kiek sausainių iškepė Tautvydas? ${intSausainiuTautvydo}
Keli draugai dar atsinešė po tiek pat sausainių? ${intDrauguIskepeTiekpat}
          Kiek žmonių iš viso dalyvavo šventėje? ${intZmoniuSventeje}
              Kiekvienas šventės dalyvis gavo po ${intSausainiuZmogui} sausainius.
                    Tautvydui papildomai atiteko ${intPapildomuSausainiu} sausainiai.
`;

printResult(strResult);
