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

const ajouter = async (utilisateurId, titre, datePrevue) => {
  const ajouterTache = await pool.query(
    `INSERT INTO taches (utilisateur_id, titre, date_prevue)
    VALUES ($1, $2, $3) RETURNING *`,
    [utilisateurId, titre, datePrevue]
  );
  return ajouterTache.rows[0];
};

const terminer = async (id) => {
  const tacheTerminer = await pool.query(
    `UPDATE taches
    SET faite = true
    WHERE id = $1
    RETURNING *`,
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

export { lister, ajouter, terminer, supprimer, supprimerPlusieurs, listerALL };
