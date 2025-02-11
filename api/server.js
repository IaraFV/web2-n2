const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar:", err));

const { checkWeekday } = require("../middlewares/checkWeekday");
const authenticateToken = require("../middlewares/authenticateToken");

app.use("/logar", require("../routes/auth"));
app.use("/create", require("../routes/user"));
app.use(
  "/laboratorio",
  checkWeekday,
  authenticateToken,
  require("../routes/laboratorio")
);

io.on("connection", (socket) => {
  console.log("Usuário conectado");

  socket.on("novaTemperatura", (temp) => {
    console.log(`Nova temperatura recebida: ${temp}`);
    temperaturaAtual = temp; 
    io.emit("atualizarTemperatura", temp); 
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
});

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
