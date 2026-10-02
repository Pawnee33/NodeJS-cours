import dayjs from 'dayjs';
import { ajouterTache, supprimerTache, listerTaches } from "./taches.js";
//import { taches } from "./taches.js"; 
import { enMajuscules, compterMots, inverser } from "./texte.js";
import formaterProduit from "./formater.js";
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { ajouter, terminer, supprimer } from "./tache01.js";

console.log("Début du Module 1 avec l'exercice 2");
console.log("On n'envoie pas node_modules sur GitHub car npm install les réinstalle à partir du package.json.")
console.log(inverser("pawnee defize"));
console.log(compterMots("pawnee defize"));
console.log(enMajuscules("pawnee defize"));

const clavier = { id: 1, nom: "Clavier", prix: 49, categorie: "informatique", stock: 12 };
console.log(formaterProduit(clavier));

ajouterTache("Baiochi");
console.log(listerTaches())
ajouterTache("Madelaine");
console.log(listerTaches())
ajouterTache("Cookie");
console.log(listerTaches())
supprimerTache("Madelaine");
console.log(listerTaches());

console.log(dayjs().format('DD/MM/YYYY'));
console.log(dayjs().add(30, 'day').format('DD/MM/YYYY'));

console.log(crypto.randomUUID());
console.log(crypto.randomUUID());
console.log(crypto.randomUUID());

const notes = await fs.readFile("notes.txt", "utf8");
console.log(notes);

await fs.writeFile("journal.txt", "Il était une fois à Bordeaux\n");// écrit et écrase le contenu
//await fs.appendFile("journal.txt", "Il était une fois à Holberton\n"); ajoute sans écrasé

try {
    const contenu = await fs.readFile("config.json", "utf8");
    const config = JSON.parse(contenu);
    console.log(config);
} catch (erreur) {
    if (erreur.code === "ENOENT") {
        console.log("Le fichier n'existe pas");
    
    } else {
        console.log("Autre problème :", erreur.message);
    }
}

//await ajouter("Acheter un nouveau four pour le nouvel appartement");
//await ajouter("Faire du sport");
//await ajouter("Faire le ménage");
//await terminer("64b4f3e9-2fa8-434b-bdbe-c90b340e6100");
//await supprimer("mettre l'id de la tache qui se trouve dans le fichier taches.json");
try {
    const listeTaches = await fs.readFile("taches.json","utf8");
    const taches = JSON.parse(listeTaches);
    console.log(taches);
} catch (erreur) {
    if (erreur.code === "ENOENT") {
        console.log("Le fichier n'existe pas");
    
    } else {
        console.log("Autre problème :", erreur.message);
    }
}
