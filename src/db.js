const mysql = require('mysql2');
require('dotenv').config();

const connectWithRetry = () => {
  const connection = mysql.createConnection({
    host: process.env.AUTH_DB_HOST || 'mariadb-auth',  // Usa el nombre del servicio en Docker
    user: process.env.AUTH_DB_USER,
    password: process.env.AUTH_DB_PASSWORD,
    database: process.env.AUTH_DB_NAME || 'authdb',
    port: 3306
  });

  connection.connect(err => {
    if (err) {
      console.error('Error de conexión a DB. Reintentando en 5 segundos...', err.message);
      setTimeout(connectWithRetry, 5000);  // Reintenta cada 5 segundos
    } else {
      console.log('Conectado a MariaDB - Base de datos auth_db ✅');
    }
  });

  return connection;
};

const connection = connectWithRetry();
module.exports = connection;