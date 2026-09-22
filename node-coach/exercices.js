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

console.log(produits, "\n");

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

console.log(vendeur.adresse.ville, "\n");


// ===== Exercice 2 =====
console.log("===== Exercice 2 =====");
// Récupérer le nom et l'email du vendeur dans deux variables
// puis l'affiche
const { nom, email } = vendeur;
console.log(nom);
console.log(email);

const { ville, codePostal } = vendeur.adresse;
console.log(ville);
console.log(`Code Postal: ${codePostal}, ville: ${ville}`, "\n");

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
console.log(vendeur, "\n");

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
console.log(objet.nom, "\n");


// Niveau 2 : Les bases de JavaScript (Une méthode à la fois)

// ===== Exercice 1 =====
console.log("===== Exercice 1 =====");
// Afficher le nom de chaque produit avec forEach.
produits.forEach((produit) => {
    console.log(produit.nom, "\n");
});

// ===== Exercice 2 =====
console.log("===== Exercice 2 =====");
// Crée un tableau contenant uniquement les noms des produits.
const noms = produits.map((produit) => produit.nom);
console.log(noms, "\n");

// ===== Exercice 3 =====
console.log("===== Exercice 3 =====");
// Crée un tableau des produits de la catégorie "mobilier".
const mobiliers = produits.filter((produit) => produit.categorie === "mobilier");
console.log(mobiliers, "\n");

// ===== Exercice 4 =====
console.log("===== Exercice 4 =====");
// Trouve le produit dont l'id est 3.
const produitTrouve = produits.find((produit) => produit.id === 3);
console.log(produitTrouve, "\n");

// ===== Exercice 5 =====
console.log("===== Exercice 5 =====");
// Vérifie s'il existe au moins un produit en rupture de stock (stock à 0).
const ruptureDeStock = produits.some((produit) => produit.stock === 0);
console.log(ruptureDeStock, "\n");

// ===== Exercice 6 =====
console.log("===== Exercice 6 =====");
// Calcule la valeur totale du stock (prix × stock de chaque produit, additionné).
const totalStock = produits.reduce((somme, produit) => {
    return somme + (produit.prix * produit.stock);
}, 0);
console.log(totalStock, "\n");

// Niveau 3 : Les bases de JavaScript (Raisonner et combiner)

// ===== Exercice 1 =====
console.log("===== Exercice 1 =====");
// Obtiens les noms des produits informatiques qui sont en stock.
const informatiqueStock = produits
  .filter((produit) => produit.categorie === "informatique" && produit.stock > 0)
  .map((produit) => produit.nom);
console.log(informatiqueStock, "\n");

// ===== Exercice 2 =====
console.log("===== Exercice 2 =====");
// Crée un nouveau tableau où le prix de la Souris passe à 22, sans modifier produits.
const nouvelleListeProduits = produits.map((produit) =>
  produit.id === 2 ? { ...produit, prix: 22 } : produit
);
console.log(nouvelleListeProduits, "\n");

// ===== Exercice 3 =====
console.log("===== Exercice 3 =====");
// Crée un nouveau tableau sans la Chaise.
const sansChaise = produits.filter((produit) => produit.id !== 3);
console.log(sansChaise, "\n");

// ===== Exercice 4 =====
console.log("===== Exercice 4 =====");
// Crée une version « publique » des produits contenant uniquement nom et prix, et seulement pour les produits en stock.
const produitsPublics = produits
  .filter((produit) => produit.stock > 0)
  .map((produit) => ({ nom: produit.nom, prix: produit.prix })
);
console.log(produitsPublique, "\n");

