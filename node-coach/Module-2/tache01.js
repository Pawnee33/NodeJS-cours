import { lireTaches, ecrireTaches } from "./stockage.js";
import crypto from 'node:crypto';

const ajouter = async (titre) => {
  const taches = await lireTaches();
  const nouvelleTache = {
    id: crypto.randomUUID(),
    titre: titre,
    faite: false
  };
  taches.push(nouvelleTache);
  await ecrireTaches(taches);
}

const terminer = async (id) => {
  const taches = await lireTaches();
  const miseAJourTaches = taches.map((tache) => 
    tache.id === id ? { ...tache, faite: true} : tache
  );
  await ecrireTaches(miseAJourTaches);
}

const supprimer = async (id) => {
  const taches = await lireTaches();
  const tachesRestantes = taches.filter((tache) => tache.id !== id);
  await ecrireTaches(tachesRestantes);
}

export { ajouter, terminer, supprimer };
