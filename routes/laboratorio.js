const express = require("express");
const multer = require("multer");
const Laboratorio = require("../models/Laboratorio");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/novo", upload.single("foto"), async (req, res) => {
  try {
    const { nome, descricao, capacidade } = req.body;

    if (!nome || !descricao || !capacidade) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "É necessário enviar uma foto." });
    }

    const foto = req.file.path;

    const novoLaboratorio = new Laboratorio({
      nome,
      descricao,
      capacidade,
      foto,
    });
    await novoLaboratorio.save();

    res.status(201).json({ message: "Laboratório cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar laboratório." });
  }
});

router.get("/relatorio", async (req, res) => {
  const laboratorios = await Laboratorio.find();
  
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=relatorio.pdf");
  doc.pipe(res);

  doc.fontSize(20).text("Relatório de Laboratórios", { align: "center" });
  doc.moveDown(2);

  let xPosition = 50;
  let yPosition = 100;
  const horizontalSpacing = 150;

  laboratorios.forEach((lab, index) => {
    if (index % 2 === 0 && index > 0) {
      yPosition += 200;
      xPosition = 50;
    }

    doc.fontSize(14).text(`Nome: ${lab.nome}`, xPosition, yPosition);
    xPosition += horizontalSpacing;

    doc.text(`Descrição: ${lab.descricao}`, xPosition, yPosition);
    xPosition += horizontalSpacing;
    doc.text(`Capacidade: ${lab.capacidade}`, xPosition, yPosition);
    xPosition += horizontalSpacing;

    if (lab.foto) {
      try {
        doc.image(lab.foto, xPosition, yPosition, { fit: [100, 100] });
        xPosition += horizontalSpacing;
      } catch (error) {
        console.error("Erro ao carregar imagem:", error);
      }
    }

    if (index % 2 === 1) {
      xPosition = 50;
      yPosition += 150;
    }
  });

  doc.end();
});

module.exports = router;
