// Exercice : cours 0.3
console.log("Exercice : cours 0.3");
// Niveau 1 : Les bases de JavaScript asynchrone (Comprendre l'ordre d'exécution)
console.log("Niveau 1 : Les bases de JavaScript asynchrone (Comprendre l'ordre d'exécution)");
// Pour chaque extrait, écris ta prédiction en commentaire avant de lancer le code, puis vérifie.
// Si ta prédiction est fausse, explique pourquoi en t'aidant du cours.


// ===== Tableau de données de produits =====
console.log("===== tableau de données de produits =====");

const produits = [
  { id: 1, nom: "Clavier", prix: 49, categorie: "informatique", stock: 12 },
  { id: 2, nom: "Souris", prix: 25, categorie: "informatique", stock: 0 },
  { id: 3, nom: "Chaise", prix: 120, categorie: "mobilier", stock: 5 },
  { id: 4, nom: "Lampe", prix: 35, categorie: "mobilier", stock: 8 },
  { id: 5, nom: "Écran", prix: 180, categorie: "informatique", stock: 3 }
];
console.log(produits);

// ===== Fonction Attendre =====
console.log("===== Fonction attendre =====");
// Cette petite fonction, très courante, crée une promesse qui se tient au bout d'un certain temps. 

const attendre = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// ===== Exercice 1 =====
console.log("===== Exercice 1 =====");
// Dans quel ordre s'affichent les lettres ?
console.log("A");
setTimeout(() => console.log("B"), 1000);
setTimeout(() => console.log("C"), 0);
console.log("D");
// A, D, C, B, ça affiche d'abord A puis il y a un setTime de 1s puis une autre de 0 donc D s'affiche puis C et B.

// ===== Exercice 2 =====
console.log("===== Exercice 2 =====");
// Dans quel ordre s'affichent les chiffres ? (Colle d'abord la fonction attendre du cours en haut de ton fichier.)
async function test() {
  console.log("2");
  await attendre(500);
  console.log("4");
}
 
console.log("1");
test();
console.log("3");
// 1, 2, 3, 4, Le console.log 1 s'affiche 
// puis lance la fonction async test elle affiche 2 
// puis tombe sur await se met en pause pendant 5 sec du coup 3 s'affiche 
// puis quand les 5 sec passé 4 s'affiche.

// ===== Exercice 3 =====
console.log("===== Exercice 3 =====");
// Qu'affiche ce code, et pourquoi ?
async function getPrix() {
  return 49;
}
 
const prix = getPrix();
console.log(prix);
// Retourne le résultat envloppé dans une promesse (Promis { 49 })
const prix1 = await getPrix();
getPrix().then((prix1) => console.log(prix1));
// Pour afficher le résultat il faut l'ouvrir dans une fonction async,
// si on oubli le "await" et "then" ça s'affichera avec enveloppé dans "Promise".

// Niveau 2 : Les bases de JavaScript asynchrone (Les callbacks)
console.log("Niveau 2 : Les bases de JavaScript asynchrone (Les callbacks)");

// ===== Exercice 4 =====
console.log("===== Exercice 4 =====");
// Écris une fonction getProduit(id, callback) qui,
// au bout d'une seconde, cherche le produit dans le tableau produits et
// appelle le callback selon la convention « erreur d'abord » :
// une erreur "Produit introuvable" s'il n'existe pas, sinon null et le produit.
// Teste-la avec l'id 3, puis avec l'id 99.
function getProduit(id, callback) {
  setTimeout(() => {
    const produitTrouve = produits.find((produit) => produit.id === id);
    if (!produitTrouve) {
      callback(new Error("Produit introuvable"), null);
      return;
    }
    callback(null, produitTrouve);
  }, 1000);
}

getProduit(3, (erreur, produit) => {
  if (erreur) {
    console.log("Problème :", erreur.message);
    return;
  }
  console.log(produit.nom);
});
//Chaise

getProduit(99, (erreur, produit) => {
  if (erreur) {
    console.log("Problème :", erreur.message);
    return;
  }
  console.log(produit.nom);
});
//Problème : Produit introuvable

// ===== Exercice 5 =====
console.log("===== Exercice 5 =====");
// Avec getProduit, récupère le produit 1, puis (à l'intérieur du premier callback) le produit 5, et
// affiche la somme de leurs prix. Observe la forme de ton code.
getProduit(1, (erreur1, produit1) => {
  if (erreur1) {
    console.log("Problème :", erreur1.message);
    return;
  }
  console.log(produit1);
  // { id: 1, nom: 'clavier', prix: 49, categorie: 'informatique', stock: 12 }
  getProduit(5, (erreur5, produit5) => {
    if (erreur5) {
      console.log("Problème :", erreur5.message);
      return;
    }
    console.log(produit5);
    // { id: 5, nom: 'Écran', prix: 180, categorie: 'informatique', stock: 3 }
    console.log(produit1.prix + produit5.prix);
    //229
  })
})

// Niveau 3 : Les bases de JavaScript asynchrone (Les promesses)
console.log("Niveau 3 : Les bases de JavaScript asynchrone (Les promesses)");

// ===== Exercice 6 =====
console.log("===== Exercice 6 =====");
// Écris une fonction getProduitPromesse(id) qui fait la même chose que getProduit,
// mais renvoie une promesse : resolve avec le produit, ou reject avec l'erreur "Produit introuvable".
function getProduitPromesse(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produitRecherche = produits.find((produit) => produit.id === id);
      if (!produitRecherche) {
        reject(new Error("Produit introuvable"));
        return;
      }
      resolve(produitRecherche);
    }, 1000);
  });
}


// ===== Exercice 7 =====
console.log("===== Exercice 7 =====");
// Utilise-la avec .then, .catch et .finally :
// affiche le nom du produit 3, puis teste avec l'id 99.
// Le .finally doit afficher « Recherche terminée » dans les deux cas.
getProduitPromesse(3)
  .then((produit) => {
    console.log(produit.nom);
  })
  .catch((erreur) => {
    console.log("Problème :", erreur.message);
  })
  .finally(() => {
    console.log("Recherche terminé");
  });
  //Chaise
  //Recherche terminé

  getProduitPromesse(99)
  .then((produit) => {
    console.log(produit.nom);
  })
  .catch((erreur) => {
    console.log("Problème :", erreur.message);
  })
  .finally(() => {
    console.log("Recherche terminé");
  });
  //Problème : Produit introuvable
  //Recherche terminé

  // ===== Exercice 8 =====
console.log("===== Exercice 8 =====");
// Avec une chaîne de .then, récupère le produit 2,
// extrais son prix dans un premier .then,
// puis affiche ce prix multiplié par 2 dans un second .then.
getProduitPromesse(2)
  .then((produit) => produit.prix)
  .then((prix) => {
    console.log(prix * 2);
  })
  .catch((erreur) => {
    console.log("Problème :", erreur.message);
  })
  .finally(() => {
    console.log("Changement de prix terminé");
  });

// Niveau 4 : Les bases de JavaScript asynchrone (async / await)
console.log("Niveau 4 : Les bases de JavaScript asynchrone (async / await)");

// ===== Exercice 9 =====
console.log("===== Exercice 9 =====");
// Réécris l'exercice 7 (produit 3 puis produit 99) avec une fonction async, await et try / catch.
async function produitCherche(id) {
  try {
    const produit = await getProduitPromesse(id);
    console.log(produit.nom);
  } catch (erreur) {
    console.log("Problème :", erreur.message);
  } finally {
    console.log("Recherche terminé");
  }
}

produitCherche(3);
produitCherche(99);

// ===== Exercice 10 =====
console.log("===== Exercice 10 =====");
// Écris une fonction async qui récupère le produit 1 puis le produit 5 avec deux await, et affiche la somme de leurs prix.
// Compare avec ton code de l'exercice 5 : lequel est le plus lisible ?
async function recupereProduits() {
  try {
    const produit1 = await getProduitPromesse(1);
    const produit5 = await getProduitPromesse(5);
    console.log(produit1.prix + produit5.prix);
  } catch (erreur) {
    console.log("Problème :", erreur.message);
  } finally {
    console.log("Recherche terminé");
  }
}

recupereProduits();