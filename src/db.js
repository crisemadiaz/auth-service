const mysql = require('mysql2');
require('dotenv').config();

const connectWithRetry = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'mariadb',  // Usa el nombre del servicio en Docker
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
  });

  connection.connect(err => {
    if (err) {
      console.error('Error de conexión a DB. Reintentando en 5 segundos...', err.message);
      setTimeout(connectWithRetry, 5000);  // Reintenta cada 5 segundos
    } else {
      console.log('Conectado a MariaDB ✅');
    }
  });

  return connection;
};

const connection = connectWithRetry();
module.exports = connection;