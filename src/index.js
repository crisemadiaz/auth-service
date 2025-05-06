const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
require('./db'); // para inicializar conexión

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', authRoutes);

const PORT = process.env.AUTH_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth Service escuchando en el puerto ${PORT} ✅`);
});
