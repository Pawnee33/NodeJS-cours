# NodeJS-cours

# Application To-Do — périmètre v1

Projet personnel pour le portfolio. Défini le 13/10/2026.

## Ce que l'utilisateur veut faire

1. S'inscrire et se connecter à l'application.
2. Voir un calendrier mensuel ou hebdomadaire, avec une pastille par jour
   indiquant combien de tâches sont faites.
3. Cliquer sur un jour pour ouvrir la liste des tâches de ce jour.
4. Ajouter, modifier et supprimer une tâche.
5. Pour une tâche non faite dans la journée : la reporter à un autre jour,
   ou la supprimer. Également pouvoir reporter toutes les non-faites d'un
   coup.
6. Cocher une tâche quand elle est terminée.
7. L'application est utilisable par d'autres personnes que son auteur.

## Les routes de l'API

| Route | Rôle |
|---|---|
| `POST /inscription` | créer un compte |
| `POST /connexion` | se connecter (cookie httpOnly) |
| `POST /deconnexion` | se déconnecter |
| `GET /calendrier?debut=&fin=` | compteurs par jour, pour les pastilles |
| `GET /jours/:date` | les tâches d'un jour |
| `POST /taches` | créer une tâche |
| `PATCH /taches/:id` | modifier titre, date ou état |
| `DELETE /taches/:id` | supprimer une tâche |
| `POST /reporter` | reporter toutes les non-faites d'un jour vers un autre |

Note : le `PATCH` est **général**. Il ne se contente pas de passer `faite`
à `true` — il modifie ce que le client envoie (titre, `date_prevue`,
`faite`). C'est lui qui assure le report d'une tâche individuelle.

## Choix techniques

- **Base** : PostgreSQL. Données régulières, relations utilisateur/tâches,
  et beaucoup de filtres par date.
- **Dates** : colonne `DATE` (un jour, sans heure), et du texte
  `YYYY-MM-DD` de bout en bout entre la base, l'API et le front.
- **Authentification** : jeton dans un cookie `httpOnly`, pas dans
  `localStorage` — le JavaScript de la page ne doit pas pouvoir le lire.
  Implique un CORS avec origine nommée et `credentials: true`, et
  `sameSite: 'strict'` contre le CSRF.
- **Front** : React avec Vite.

## Schéma de la base

```sql
CREATE TABLE utilisateurs (
  id           SERIAL PRIMARY KEY,
  email        TEXT NOT NULL UNIQUE,
  mot_de_passe TEXT NOT NULL,
  cree_le      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE taches (
  id             SERIAL PRIMARY KEY,
  utilisateur_id INTEGER NOT NULL REFERENCES utilisateurs(id) ON DELETE CASCADE,
  titre          TEXT NOT NULL CHECK (length(trim(titre)) > 0),
  date_prevue    DATE NOT NULL,
  faite          BOOLEAN NOT NULL DEFAULT false,
  cree_le        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_taches_jour ON taches (utilisateur_id, date_prevue);
```

## Hors périmètre v1

À envisager plus tard, une fois la v1 en ligne : l'heure dans la journée
(colonne `heure TIME`), les priorités, les catégories, les tâches
récurrentes, les notifications, les statistiques, le partage de listes.
