import fs from 'node:fs/promises';

async function lireTaches() {
  try {
    const taches = await fs.readFile("taches.json", "utf8");
    return JSON.parse(taches);
  } catch (erreur) {
    if (erreur.code === "ENOENT") return [];
    throw erreur;
    }
  }

async function ecrireTaches(taches) {
  const texteTaches = JSON.stringify(taches, null, 2);
  await fs.writeFile("taches.json", texteTaches);
}

export { lireTaches, ecrireTaches };
