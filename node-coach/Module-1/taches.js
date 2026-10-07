let taches = [];

const ajouterTache = (titre) => taches.push(titre);
const supprimerTache = (titre) => {
  taches = taches.filter((tache) => tache !== titre);
};
const listerTaches = () => {
  return [...taches];
};

export { ajouterTache, supprimerTache, listerTaches };