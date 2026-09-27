/* 
8. Keltas. Parašykite programą, kuri suskaičiuotų, kelis kartus keltui teks kelti per upę k automobilių, jeigu vienu metu jis gali perkelti m automobilių. Keltas kelia tik tada, kai yra pilnas (susidaro m automobilių.) Taip pat išveskite automobilių skaičių, kuriems persikelti per upę nepavyks (jei buvo 11 automobilių, o į keltą telpa 10, tai 10 perkels, o vienas liks neperkeltas). 
*/

"use strict";

const inBROWSER = typeof window !== "undefined";

const printResult = (strText) => (inBROWSER ? alert : console.log)(strText);

// Random int 8 to 40
const getRandomInt = () => Math.floor(Math.random() * 33) + 8;

const getFromPromptOrRandom = () =>
  inBROWSER ? +prompt('Koks yra automobiliu skaičius?"') : getRandomInt();

const intKeltoTalpa = 12; // automobiliu
const intAutomobiliu = getFromPromptOrRandom();
const intPerkelimu = Math.floor(intAutomobiliu / intKeltoTalpa);
const intAutoLiks =
  intAutomobiliu > intKeltoTalpa ? intAutomobiliu % intKeltoTalpa : 0;

const strResultMsg = `
     Automobilių skaičius: ${intAutomobiliu}
Į keltą telpa automobilių: ${intKeltoTalpa}	
        Perkels per kartų: ${intPerkelimu}
          Liks neperkelta: ${intAutoLiks}
`;

printResult(strResultMsg);
