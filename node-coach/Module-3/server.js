import express from 'express';
import cors from 'cors';
import { ajouter, terminer, supprimer, lister, listerALL, listerID, reporterTache, compteurTaches } from "./taches.js";
import pool from './db.js';


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

app.get('/taches', async (requete, response) => {
  try {
    const taches = await listerALL();
    const faite = requete.query.faite;
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

app.post('/taches', async (requete, response) => {
  try {
    const titre = requete.body.titre;
    const utilisateurID = requete.body.utilisateurId;
    const datePrevue = requete.body.datePrevue;
    if (!utilisateurID) {
      return response.status(400).json({ error: "L'ID de l'utilisateur est absent ou vide."});
    }
    if (!titre) {
      return response.status(400).json({ error: "Le titre est absent ou vide."});
    }
    if (!datePrevue) {
      return response.status(400).json({ error: "La date est absente."});
    }
    const nouvelleTache = await ajouter(utilisateurID, titre, datePrevue);
    return response.status(201).json(nouvelleTache);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" -X POST http://localhost:3001/taches \
                    //-H "Content-Type: application/json" \
                    //-d '{"titre":"Mettre l'intituler de la tâche"}'


app.post('/reporter', async (requete, response) => {
  try {
    const utilisateurID = requete.body.utilisateurId;
    const de = requete.body.de;
    const vers = requete.body.vers;
    if (!utilisateurID) {
      return response.status(400).json({ error: "L'ID de l'utilisateur est absent ou vide."});
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(de)) {
      return response.status(400).json({ error: "La date de doit être au format AAAA-MM-JJ, par exemple 2026-10-13." });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(vers)) {
      return response.status(400).json({ error: "La date vers doit être au format AAAA-MM-JJ, par exemple 2026-10-13."});
    }
    const tachesReporter = await reporterTache(utilisateurID, de, vers);
    return response.status(200).json({
      reportees: tachesReporter.length,
      taches: tachesReporter
    });
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
});


app.get('/taches/:id', async (requete, response) => {
  try {
    const id = Number(requete.params.id);
    if (Number.isNaN(id) || id < 0) {
      return response.status(400).json({ error: "ID doit être un nombre positif et un nombre." });
    }
    const tache = await listerID(id);
    if (!tache) {
      return response.status(404).json({ error: "Tâche introuvable."});
    }
    return response.status(200).json(tache);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" http://localhost:3001/taches/mettre id à voir

app.get('/jours/:date', async (requete, response) => {
  try {
    const date = requete.params.date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return response.status(400).json({ error: "La date doit être au format AAAA-MM-JJ, par exemple 2026-10-13." });
    }
    const taches = await lister(date);
    return response.status(200).json(taches);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" http://localhost:3001/jours/mettre date à voir

app.get('/calendrier', async (requete, response) => {
  try {
    const utilisateurId = Number(requete.query.utilisateurId);
    if (Number.isNaN(utilisateurId) || utilisateurId < 0) {
      return response.status(400).json({ error: "L'utilisateur ID doit être un nombre positif et un nombre." });
    }
    const debutDate = requete.query.debutDate;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(debutDate)) {
      return response.status(400).json({ error: "La date doit être au format AAAA-MM-JJ, par exemple 2026-10-13." });
    }
    const finDate = requete.query.finDate;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(finDate)) {
      return response.status(400).json({ error: "La date doit être au format AAAA-MM-JJ, par exemple 2026-10-13." });
    }
    const compteurTachesFaites = await compteurTaches(utilisateurId, debutDate, finDate);
    return response.status(200).json(compteurTachesFaites);
  } catch (erreur) {
    console.error(erreur);
    response.status(500).json({ error: "Erreur serveur"});
  }
});

app.patch('/taches/:id', async (requete, response) => {
  try {
    const id = Number(requete.params.id);
    if (Number.isNaN(id) || id < 0) {
      return response.status(400).json({ error: "ID doit être un nombre positif et un nombre." });
    }
    const tacheModifie = await terminer(id);
    if (!tacheModifie) {
      return response.status(404).json({ error: "Tâche introuvable."});
    }
    return response.status(200).json(tacheModifie);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" -X PATCH http://localhost:3001/taches/mettre id à modifier

app.delete('/taches/:id', async (requete, response) => {
  try {
    const id = Number(requete.params.id);
    if (Number.isNaN(id) || id < 0) {
      return response.status(400).json({ error: "ID doit être un nombre positif et un nombre." });
    }
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

