import express from 'express';
import dayjs from 'dayjs';
import cors from 'cors';
import { ajouter, terminer, supprimer } from "./tache01.js";
import { ecrireTaches, lireTaches } from './stockage.js';


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

app.get('/ping', (requete, reponse) => {
  reponse.send('pong');
});

app.get('/data', (requete, response) => {
  response.json({ message: dayjs().format('DD/MM/YYYY')})
});

app.get('/bonjour/:prenom', (requete, response) => {
  response.json({message: `Bonjour ${requete.params.prenom}`})
});
 
app.get('/calcul', (requete, response) => {
  const a = Number(requete.query.a);
  const b = Number(requete.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return response.status(400).json({message: "Veuillez fournir des nombres valides pour 'a' et 'b'."});
  }

  const resultat = a + b;

  response.json({
    operation: `${a} + ${b}`,
    resultat: resultat
  });
});

app.post('/echo', (requete, response) => {
  response.json(requete.body);
});

//Exercice 7 :
//"1. Je renvoie 404 car la tâche n°999 n'existe pas."
//"2. Je renvoie 201 car la tâche est réaliser avec succès."
//"3. Je renvoie 400 car le client renvoie un titre vide, incomplet alors que c'est obligatoire."
//"4. Je renvoie 500 car le code a planté."
//"5. Je renvoie 204 car la tâche est réaliser avec succès."

app.get('/age/:valeur', (requete, response) => {
  const age = Number(requete.params.valeur);
  const majeur = age >= 18;
  if (Number.isNaN(age) || age < 0) {
    return response.status(400).send("Age doit être un nombre positif et un nombre.");
  }

  response.status(200).json({age: age, majeur: majeur});
}); // curl -i -w "\n" http://localhost:3001/age/30     # 200, majeur true
//curl -i -w "\n" http://localhost:3001/age/15     # 200, majeur false
//curl -i -w "\n" http://localhost:3001/age/abc    # 400
//curl -i -w "\n" http://localhost:3001/age/-5     # 400

app.get('/taches', async (requete, response) => {
  try {
    const taches = await lireTaches();
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
    if (!titre) {
      return response.status(400).json({ error: "Le titre est absent ou vide."});
    } else {
      const nouvelleTache = await ajouter(titre);
      return response.status(201).json(nouvelleTache);
    }
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" -X POST http://localhost:3001/taches \
                    //-H "Content-Type: application/json" \
                    //-d '{"titre":"Mettre l'intituler de la tâche"}'

app.get('/taches/:id', async (requete, response) => {
  try {
    const id = requete.params.id;
    const taches = await lireTaches();
    const tacheTrouve = taches.find((tache) => tache.id === id);
    if (!tacheTrouve) {
      return response.status(404).json({ error: "Tâche introuvable."});
    }
    return response.status(200).json(tacheTrouve);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" http://localhost:3001/taches/mettre id à voir

app.patch('/taches/:id', async (requete, response) => {
  try {
    const id = requete.params.id;
    const taches = await lireTaches();
    const tacheTrouve = taches.find((tache) => tache.id === id);
    if (!tacheTrouve) {
      return response.status(404).json({ error: "Tâche introuvable."});
    }
    const tacheModifie = await terminer(id);
    return response.status(200).json(tacheModifie);
  } catch (erreur) {
    response.status(500).json({ error: "Erreur serveur"});
  }
}); // Pour tester curl -i -w "\n" -X PATCH http://localhost:3001/taches/mettre id à modifier

app.delete('/taches/:id', async (requete, response) => {
  try {
    const id = requete.params.id;
    const taches = await lireTaches();
    const tacheTrouve = taches.find((tache) => tache.id === id);
    if (!tacheTrouve) {
      return response.status(404).json({ error: "Tâche introuvable"});
    }
    const tacheSupprimer = await supprimer(id);
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
