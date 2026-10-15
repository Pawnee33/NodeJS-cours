import pool from './db.js';

const lister = async (datePrevue) => {
  const tachesJour = await pool.query(
    `SELECT id, titre,
            to_char(date_prevue, 'YYYY-MM-DD') AS date_prevue,
            faite, cree_le
    FROM taches
    Where date_prevue = $1
    ORDER BY id`,
    [datePrevue]
  );
  return tachesJour.rows;
};

const listerID = async (id) => {
  const tacheID = await pool.query(
    `SELECT id, titre,
            to_char(date_prevue, 'YYYY-MM-DD') AS date_prevue,
            faite, cree_le
    FROM taches
    Where id = $1
    `,
    [id]
  );
  return tacheID.rows[0] ?? null;
};

const ajouter = async (utilisateurId, titre, datePrevue) => {
  const ajouterTache = await pool.query(
    `INSERT INTO taches (utilisateur_id, titre, date_prevue)
    VALUES ($1, $2, $3) RETURNING id, utilisateur_id, titre, faite,
    to_char(date_prevue, 'YYYY-MM-DD') AS date_prevue`,
    [utilisateurId, titre, datePrevue]
  );
  return ajouterTache.rows[0];
};

const terminer = async (id) => {
  const tacheTerminer = await pool.query(
    `UPDATE taches
    SET faite = true
    WHERE id = $1
    RETURNING id, utilisateur_id, titre, faite,
    to_char(date_prevue, 'YYYY-MM-DD') AS date_prevue`,
    [id]
  );
  return tacheTerminer.rows[0] ?? null;
};

const supprimer = async (id) => {
  const tacheSupprime = await pool.query(
    `DELETE FROM taches WHERE id = $1 RETURNING *`,
    [id]
  );
  return tacheSupprime.rowCount > 0;
};

const supprimerPlusieurs = async (ids) => {
  const resultat = await pool.query(
    'DELETE FROM taches WHERE id = ANY($1)',
    [ids]
  );
  return resultat.rowCount;
};

const listerALL = async () => {
  const taches = await pool.query(
    `SELECT id, titre,
            to_char(date_prevue, 'YYYY-MM-DD') AS date_prevue,
            faite, cree_le
    FROM taches
    ORDER BY id DESC`,
    []
  );
  return taches.rows;
};

const reporterTache = async (utilisateurId, de, vers) => {
  const taches = await pool.query(
    `UPDATE taches
    SET date_prevue = $3
    WHERE utilisateur_id = $1
    AND date_prevue = $2
    AND faite = false
    RETURNING id, utilisateur_id, titre, faite,
    to_char(date_prevue, 'YYYY-MM-DD') AS date_prevue`,
    [utilisateurId, de, vers]
  );
  return taches.rows;
};

const compteurTaches = async (utilisateurId, debutDate, finDate) => {
  const tachesFaites = await pool.query(
    `SELECT to_char(date_prevue, 'YYYY-MM-DD') AS jour,
    COUNT(*)::int AS total,
    COUNT(*) FILTER (WHERE faite)::int AS faites
    FROM taches
    WHERE utilisateur_id = $1
    AND date_prevue BETWEEN $2 AND $3
    GROUP BY date_prevue
    ORDER BY date_prevue;`,
    [utilisateurId, debutDate, finDate]
  );
  return tachesFaites.rows;
};

export { lister, ajouter, terminer, supprimer, supprimerPlusieurs, listerALL, listerID, reporterTache, compteurTaches };
