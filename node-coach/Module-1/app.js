import dayjs from 'dayjs';
import { ajouterTache, supprimerTache, listerTaches } from "./taches.js";
//import { taches } from "./taches.js"; 
import { enMajuscules, compterMots, inverser } from "./texte.js";
import formaterProduit from "./formater.js";
import crypto from 'node:crypto';
import fs from 'node:fs/promises';

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
