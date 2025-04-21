const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/ping', (req, res) => {
    res.json({ message: 'pong desde Auth Service' });
  });

module.exports = router;
