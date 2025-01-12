const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { checkWeekday } = require('./middlewares/checkWeekday');
const authenticateToken  = require('./middlewares/authenticateToken');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log(err));

  app.use('/logar', require('./routes/auth'));
  app.use('/create', require('./routes/user'));
  app.use('/laboratorio', checkWeekday, authenticateToken, require('./routes/laboratorio'));


  if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }
  
  module.exports = app; 
  