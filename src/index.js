/*Se reemplaza código. //Importa Express, CORS y DotEnv
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//Crea la app Express.
const app = express();
//Habilita CORS y JSON parsing.
app.use(cors());
app.use(express.json());//Convertir datos JSON (texto) ⇄ Objeto JS para usarlo en el código. ej Front envía {"name":"Juan"} (texto) → Back lo convierte a {name:"Juan"} (objeto).

// Ruta básica
app.get('/', (req, res) => {
  res.send('Auth Service funcionando 🚀');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth Service escuchando en el puerto ${PORT}`);
}); */

//Código nuevo
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
require('./db'); // para inicializar conexión

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Auth Service escuchando en el puerto ${PORT} ✅`);
});
