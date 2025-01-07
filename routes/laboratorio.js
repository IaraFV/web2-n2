const express = require('express');
const multer = require('multer');
const Laboratorio = require('../models/Laboratorio');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/novo', upload.single('foto'), async (req, res) => {
  const { nome, descricao, capacidade } = req.body;
  const foto = req.file.path;

  const novoLaboratorio = new Laboratorio({ nome, descricao, capacidade, foto });
  await novoLaboratorio.save();

  res.status(201).json({ message: 'Laboratório cadastrado com sucesso!' });
});

router.get('/relatorio', async (req, res) => {
  const laboratorios = await Laboratorio.find();

  const doc = new PDFDocument();
  doc.pipe(res);

  doc.fontSize(20).text('Relatório de Laboratórios', { align: 'center' });
  doc.moveDown();

  laboratorios.forEach(lab => {
    doc.fontSize(14).text(`Nome: ${lab.nome}`);
    doc.text(`Descrição: ${lab.descricao}`);
    doc.text(`Capacidade: ${lab.capacidade}`);
    doc.image(lab.foto, { fit: [100, 100], align: 'center' });
    doc.moveDown();
  });

  doc.end();
});

module.exports = router;
