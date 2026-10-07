import express from 'express';
import dayjs from 'dayjs';

 
const app = express();
const PORT = 3001;

app.use(express.json());

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
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
