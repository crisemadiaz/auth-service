const db = require('../db');

const createUser = (name, email, password, callback) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], callback);
};

//busca usuarios por email usando el índice UNIQUE. callback: Maneja la respuesta de forma asíncrona.
const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail,
};
