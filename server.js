const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { checkWeekday } = require('./middlewares/checkWeekday');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log(err));

  app.use('/logar', require('./routes/auth'));
  app.use('/usuario', require('./routes/user'));
  app.use('/laboratorio', checkWeekday, require('./routes/laboratorio'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
