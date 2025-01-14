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
  try {
    const { nome, descricao, capacidade } = req.body;

    if (!nome || !descricao || !capacidade) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'É necessário enviar uma foto.' });
    }

    const foto = req.file.path;

    const novoLaboratorio = new Laboratorio({ nome, descricao, capacidade, foto });
    await novoLaboratorio.save();

    res.status(201).json({ message: 'Laboratório cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar laboratório.' });
  }
});


router.get('/relatorio', async (req, res) => {
  const laboratorios = await Laboratorio.find();

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'pdf');
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
