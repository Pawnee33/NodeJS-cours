const enMajuscules = (texte) => texte.toUpperCase();

const compterMots = (texte) => texte
  .split(" ")
  .length;

const inverser = (texte) => texte
  .split("")
  .toReversed()
  .join("");

export { enMajuscules, compterMots, inverser };
