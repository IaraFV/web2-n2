const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt'); // Importa o bcrypt
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });

    
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const payload = { email };
    const token = jwt.encode(payload, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;
