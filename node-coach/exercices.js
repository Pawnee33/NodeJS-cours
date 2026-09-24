// Exercice : cours 0.1
console.log("Exercice : cours 0.1");
// Niveau 1 : Les bases de JavaScript (Objets)
console.log("Niveau 1 : Les bases de JavaScript (Objets)");

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

const categories = ["informatique", "mobilier", "jardin", "cuisine"];

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
console.log("Niveau 2 : Les bases de JavaScript (Une méthode à la fois)");

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
console.log("Niveau 3 : Les bases de JavaScript (Raisonner et combiner)");

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
console.log(produitsPublics, "\n");

// Exercice : cours 0.2
console.log("Exercice : cours 0.2");
// Niveau 1 : Les bases de JavaScript (Chercher)
console.log("Niveau 1 : Les bases de JavaScript (Chercher)");

// ===== Exercice 1 =====
console.log("===== Exercice 1 =====");
// Trouve la position de "jardin" dans categories. Puis vérifie si "bureau" est présent.
const positionJardin = categories.indexOf("jardin");
console.log(positionJardin);
const bureauPresent = categories.includes("bureau");
console.log(bureauPresent);

// ===== Exercice 2 =====
console.log("===== Exercice 2 =====");
// Trouve la position du produit dont l'id est 4 dans produits.
// Que renvoie la même recherche avec l'id 99 ?
// Pourquoi indexOf ne pourrait-il pas faire ce travail ?
const positionProduitQuatre = produits.findIndex((produit) => produit.id === 4);
console.log(positionProduitQuatre);
const positionNeufNeuf = produits.findIndex((produit) => produit.id === 99);
console.log(positionNeufNeuf);
// IndexOf ne prend pas de condition il ne prend que des valeurs. On cherche une valeur exacte.

// ===== Exercice 3 =====
console.log("===== Exercice 3 =====");
// Affiche le dernier produit du tableau avec at, puis le dernier produit informatique avec findLast.
const dernierProduit = produits.at(-1);
console.log(dernierProduit);
const dernierProduitInformatique = produits.findLast((produit) => produit.categorie === "informatique");
console.log(dernierProduitInformatique);

// Niveau 2 : Les bases de JavaScript (Trier)
console.log("Niveau 2 : Les bases de JavaScript (Trier)");

// ===== Exercice 4 =====
console.log("===== Exercice 4 =====");
// Crée parPrixCroissant : les produits du moins cher au plus cher, sans modifier produits, en utilisant sort et une copie.
// Affiche ensuite produits pour vérifier qu'il n'a pas bougé.
const parPrixCroissant = [...produits].sort((a, b) => a.prix - b.prix);
console.log(parPrixCroissant);
console.log(produits);

// ===== Exercice 5 =====
console.log("===== Exercice 5 =====");
// Crée parPrixDecroissant avec toSorted.
const parPrixDecroissant = produits.toSorted((a, b) => b.prix - a.prix);
console.log(parPrixDecroissant);

// ===== Exercice 6 =====
console.log("===== Exercice 6 =====");
// Crée parStock : les produits triés du plus gros stock au plus petit.
const parStock = produits.toSorted((a, b) => b.stock - a.stock);
console.log(parStock);

// ===== Exercice 7 =====
console.log("===== Exercice 7 =====");
// Crée parNom : les produits triés par ordre alphabétique de leur nom.
const parNom = [...produits].sort((a, b) => a.nom.localeCompare(b.nom));
console.log(parNom);

// Niveau 3 : Les bases de JavaScript (Découper et assembler)
console.log("Niveau 3 : Les bases de JavaScript (Découper et assembler)");

// ===== Exercice 8 =====
console.log("===== Exercice 8 =====");
// Avec slice, obtiens les 3 premiers produits, puis uniquement la Chaise et la Lampe, puis les 2 derniers.
const troisPremier = produits.slice(0, 3);
console.log(troisPremier);
const chaiseLampe = produits.slice(2, 4);
console.log(chaiseLampe);
const lesDeuxDerniers = produits.slice(3);
console.log(lesDeuxDerniers);

// ===== Exercice 9 =====
console.log("===== Exercice 9 =====");
// Affiche le texte Clavier, Souris, Chaise, Lampe, Écran à partir de produits. Indice : il faut deux méthodes.
const listeNoms = produits
  .map((produit) => produit.nom)
  .join(", ");
console.log(listeNoms);

// ===== Exercice 10 =====
console.log("===== Exercice 10 =====");
// Écris une fonction getPage(numeroPage, parPage) qui renvoie les produits d'une page.
// Avec 2 produits par page : la page 1 donne Clavier et Souris,
// la page 2 donne Chaise et Lampe, la page 3 donne Écran seul.

function getPage(numeroPage, parPage) {
  const debut = (numeroPage - 1) * parPage;
  const fin = debut + parPage;
  return produits.slice(debut, fin);
}
console.log(getPage(1, 3)); // on dit à cette page je veux tant de produits
console.log(getPage(2, 3));
console.log(getPage(1, 2));

// ===== Exercice 11 =====
console.log("===== Exercice 11 =====");
// Voici les ventes de trois jours :
// const ventes = [[49, 25], [120], [35, 180, 49]];.
// Obtiens un seul tableau avec toutes les ventes, puis calcule le total avec une méthode du cours 0.2.
const ventes = [[49, 25], [120], [35, 180, 49]];
const totalVentes = ventes
  .flat()
  .reduce((total, vente) => {
    return total + vente;
  }, 0);
console.log(totalVentes);

// Niveau 4 : Les bases de JavaScript (Ajouter et retirer)
console.log("Niveau 4 : Les bases de JavaScript (Ajouter et retirer)");

// ===== Exercice 12 =====
console.log("===== Exercice 12 =====");
// Crée const panier = [];. Effectue ces opérations dans l'ordre, en écrivant pour chacune ta prédiction en commentaire,
// puis en affichant panier pour vérifier :
// * ajoute "Clavier", puis "Souris", puis "Lampe" à la fin ;
// * retire le dernier élément et affiche aussi l'élément retiré ;
// * ajoute "Écran" au début ;
// * retire le premier élément ;
// * ajoute "Chaise" et "Tapis" à la fin, puis, avec splice, retire "Souris" et "Chaise" (vérifie d'abord leurs positions).
// Contenu final attendu : [ 'Clavier', 'Tapis' ].
const panier = [];
panier.push("Clavier", "Souris", "Lampe");
console.log(panier);
const retire = panier.pop();
console.log(retire);
panier.unshift("Écran");
console.log(panier);
const retirePremierElement = panier.shift();
console.log(retirePremierElement);
console.log(panier);
panier.push("Chaise", "Tapis");
console.log(panier);
panier.splice(1, 2);
console.log(panier);

// Niveau 5 : Les bases de JavaScript (Combiner)
console.log("Niveau 5 : Les bases de JavaScript (Combiner)");

// ===== Exercice 13 =====
console.log("===== Exercice 13 =====");
// Obtiens le texte des noms des 3 produits les plus chers parmi ceux en stock,
// du plus cher au moins cher, séparés par des virgules.
// Écris d'abord les étapes en commentaire.
// Résultat attendu : Écran, Chaise, Clavier.
console.log(produits);
const produitsChers = produits
  .filter((produit) => produit.stock > 0)
  .sort((a, b) => b.prix - a.prix)
  .slice(0, 3)
  .map((produit) => produit.nom)
  .join(", ");
  console.log(produitsChers);