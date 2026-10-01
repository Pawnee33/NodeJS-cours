const enMajuscules = (texte) => texte.toUpperCase();
console.log(enMajuscules("pawnee defize"));
const compterMots = (texte) => texte
  .split(" ")
  .length;
console.log(compterMots("pawnee defize"));

const inverser = (texte) => texte
  .split("")
  .toReversed()
  .join("");
console.log(inverser("pawnee defize"));

export { enMajuscules, compterMots, inverser };
