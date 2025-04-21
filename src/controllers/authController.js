const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validaciones básicas
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Campos requeridos' });
  }

  // Verificar si el usuario ya existe
  userModel.findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al verificar usuario' });
    if (results.length > 0) return res.status(400).json({ error: 'El usuario ya existe' });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    userModel.createUser(name, email, hashedPassword, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al crear usuario' });
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en login' });
    if (results.length === 0) return res.status(400).json({ error: 'Email no registrado' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({ message: 'Login exitoso', userId: user.id, email: user.email });
  });
};

module.exports = {
  register,
  login,
};
