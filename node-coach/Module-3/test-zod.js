import { schemaNouvelleTache } from './schemas.js';

const essais = [
  { utilisateurId: 3, titre: "Acheter du pain", datePrevue: "2026-10-16"},
  { utilisateurId: 3, titre: 42, datePrevue: "2026-10-16"},
  { utilisateurId: 3, titre: "", datePrevue: "2026-10-16"},
  { utilisateurId: 3, titre: "Test", datePrevue: "hier"},
  {}
];

for (const essai of essais) {
  const resultat = schemaNouvelleTache.safeParse(essai);
  console.log(resultat.success ? "OK" : resultat.error.issues);
}
