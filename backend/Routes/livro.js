const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');

// Criar um novo livro
router.post('/', async (req, res) => {
    const { titulo, autor, anoLancamento, genero, imagem } = req.body;
    const newLivro = new Livro({ titulo, autor, anoLancamento, genero, imagem  });
    await newLivro.save();
    res.json(newLivro);
});

// Listar todas os livros
router.get('/', async (req, res) => {
    const livros = await Livro.find();
    res.json(livros);
});

// Atualizar um livro
router.put('/:id', async (req, res) => {
    const { titulo, autor, anoLancamento, genero, imagem  } = req.body;
    const updatedLivro = await Livro.findByIdAndUpdate(req.params.id, { titulo, autor, anoLancamento, genero, imagem }, { new: true });
    res.json(updatedLivro);
});

// Deletar um livro
router.delete('/:id', async (req, res) => {
    await Livro.findByIdAndDelete(req.params.id);
    res.json({ message: 'Livro deletado com sucesso!' });
});

module.exports = router;