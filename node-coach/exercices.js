// Niveau 1 : Les bases de JavaScript (Objets)

// ===== Exercice 0 =====
console.log("===== Exercice 0 =====");
// Crée un tableau de produits avec les propriétés suivantes : id, nom, prix, catégorie, stock
// puis affiche le tableau avec console.log
const produits = [
  { id: 1, nom: "Clavier", prix: 49, categorie: "informatique", stock: 12 },
  { id: 2, nom: "Souris", prix: 25, categorie: "informatique", stock: 0 },
  { id: 3, nom: "Chaise", prix: 120, categorie: "mobilier", stock: 5 },
  { id: 4, nom: "Lampe", prix: 35, categorie: "mobilier", stock: 8 },
  { id: 5, nom: "Écran", prix: 180, categorie: "informatique", stock: 3 }
];

console.log(produits);

// ===== Exercice 1 =====
console.log("===== Exercice 1 =====");
// crée un objet vendeur
// puis affiche sa ville avec console.log
const vendeur = {
    nom: "Pawnee",
    email: "pawnee@example.com",
    adresse: {
        rue: "68 rue pomme d'or",
        ville: "Bordeaux",
        codePostal: "33300"
    }
};

console.log(vendeur.adresse.ville);


// ===== Exercice 2 =====
console.log("===== Exercice 2 =====");
// Récupérer le nom et l'email du vendeur dans deux variables
// puis l'affiche
const { nom, email } = vendeur;
console.log(nom);
console.log(email);

const { ville, codePostal } = vendeur.adresse;
console.log(ville);
console.log(`Code Postal: ${codePostal}, ville: ${ville}`);

// ===== Exercice 3 =====
console.log("===== Exercice 3 =====");
// Crée vendeurMofifie avec une nouvelle ville, sans modifier l'objet vendeur
// puis l'affiche
const vendeurModifie = {
    ...vendeur,
    adresse: {
        ...vendeur.adresse,
        ville: "Marseillan",
    }
};
console.log(vendeurModifie);
console.log(vendeur);

// ===== Exercice 4 =====
console.log("===== Exercice 4 =====");
// Afficher vendeur.telephone?.fixe, puis vendeur.telephone.fixe.
// Expliquer pourquoi l'un fonctionne et l'autre pas.
// Première ligne ne plante pas car avec le "?" JavaScript lis d'abord ce qui est à gauche existe, si il n'existe pas alors il s'arrête et renvoie undefined 
// console.log(vendeur.telephone?.fixe)
// Deuxième ligne plante car Javascript ne connait pas telephone donc renvoir undefined puis il essaie de lire fixe dans undefined et plante.
//  console.log(vendeur.telephone.fixe)

// ===== Exercice 5 =====
console.log("===== Exercice 5 =====");
// Transformer vendeur en texte JSON.
// L'afficher puis le convertir en objet.
const texte = JSON.stringify(vendeur);
console.log(texte);
const objet = JSON.parse(texte);
console.log(objet);
console.log(texte.nom); // un texte n'a pas de propriété nom
console.log(objet.nom);
