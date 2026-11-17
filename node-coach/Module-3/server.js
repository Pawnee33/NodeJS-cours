import express from 'express';
import cors from 'cors';
import { ajouter, terminer, supprimer, lister, listerALL, listerID, reporterTache, compteurTaches } from "./taches.js";
import pool from './db.js';
import { schemaNouvelleTache, schemaParamId, schemaParamDate, schemaQueryCalendrier, schemaReporterTache, schemaQueryTaches } from './schemas.js';
import valider from './valider.js';


const app = express();
const PORT = 3001;

app.use((requete, response, next) => {
  console.log(`${requete.method} ${requete.url}`);
  next();
});
app.use(express.json());
app.use(cors());

app.get('/', (requete, reponse) => {
  reponse.send('Bonjour !');
});

app.get('/taches',
  valider(schemaQueryTaches, 'query'),
  async (requete, response) => {
  try {
    const taches = await listerALL();
    const { faite } = requete.query;
    if (faite !== undefined) {
      const vrai = faite === "true";
      const tachesFiltrees = taches.filter((tache) => tache.faite === vrai);
      return response.status(200).json(tachesFiltrees)
    }
    response.status(200).json(taches);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" http://localhost:3001/taches

app.post('/taches', 
  valider(schemaNouvelleTache),
  async (requete, response) => {
  try {    
    const { utilisateurId, titre, datePrevue } = requete.body;
    const nouvelleTache = await ajouter(utilisateurId, titre, datePrevue);
    return response.status(201).json(nouvelleTache);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" -X POST http://localhost:3001/taches \
                    //-H "Content-Type: application/json" \
                    //-d '{"titre":"Mettre l'intituler de la tâche"}'


app.post('/reporter',
  valider(schemaReporterTache),
  async (requete, response) => {
  try {
    const { utilisateurId, de, vers } = requete.body;

    const tachesReporter = await reporterTache(utilisateurId, de, vers);
    return response.status(200).json({
      reportees: tachesReporter.length,
      taches: tachesReporter
    });
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
});


app.get('/taches/:id',
  valider(schemaParamId, 'params'),
  async (requete, response) => {
  try {
    const { id } = requete.params;
    const tache = await listerID(id);
    if (!tache) {
      return response.status(404).json({ error: "Tâche introuvable."});
    }
    return response.status(200).json(tache);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" http://localhost:3001/taches/mettre id à voir

app.get('/jours/:date',
  valider(schemaParamDate, 'params'),
  async (requete, response) => {
  try {
    const { date } = requete.params;

    const taches = await lister(date);
    return response.status(200).json(taches);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" http://localhost:3001/jours/mettre date à voir

app.get('/calendrier',
  valider(schemaQueryCalendrier, 'query'),
  async (requete, response) => {
  try {
    const { utilisateurId, debutDate, finDate } = requete.query;

    const compteurTachesFaites = await compteurTaches(utilisateurId, debutDate, finDate);
    return response.status(200).json(compteurTachesFaites);
  } catch (erreur) {
    console.error(erreur);
    response.status(500).json({ error: "Erreur serveur"});
  }
});

app.patch('/taches/:id',
  valider(schemaParamId, 'params'),
  async (requete, response) => {
  try {
    const { id } = requete.params;

    const tacheModifie = await terminer(id);
    if (!tacheModifie) {
      return response.status(404).json({ error: "Tâche introuvable."});
    }
    return response.status(200).json(tacheModifie);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" -X PATCH http://localhost:3001/taches/mettre id à modifier

app.delete('/taches/:id',
  valider(schemaParamId, 'params'),
  async (requete, response) => {
  try {
    const { id } = requete.params;
    
    const tacheSupprimer = await supprimer(id);
    if (!tacheSupprimer) {
      return response.status(404).json({ error: "Tâche introuvable"});
    }
    return response.status(204).end();
  } catch {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" -X DELETE http://localhost:3001/taches/mettre id à supprimer

app.use((requete, response) => {
  response.status(404).json({ error: "Route inconnue"});
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

