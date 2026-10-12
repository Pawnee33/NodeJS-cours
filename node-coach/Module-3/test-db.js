import pool from './db.js';

const resultat = await pool.query('SELECT now()');
console.log(resultat.rows);
await pool.end();
