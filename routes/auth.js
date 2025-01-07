const express = require('express');
const jwt = require('jwt-simple');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.senha !== senha) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const payload = { email };
  const token = jwt.encode(payload, process.env.JWT_SECRET);

  res.json({ token });
});

module.exports = router;
