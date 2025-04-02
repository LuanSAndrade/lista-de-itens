const express = require('express');
const router = express.Router();

// Array para armazenar os itens
let items = ['Item 1', 'Item 2', 'Item 3'];

// Endpoint GET para listar os itens
router.get('/items', (req, res) => {
    res.json(items);
});

// Endpoint POST para adicionar um novo item
router.post('/items', (req, res) => {
    const newItem = req.body.item; // Extrai o item enviado no corpo da requisição
    if (newItem) {
        items.push(newItem); // Adiciona o novo item ao array
        res.status(201).json({ message: 'Item adicionado!', items }); // Responde com sucesso
    } else {
        res.status(400).json({ message: 'Item não fornecido!' }); // Responde com erro
    }
});

router.delete('/items/:index', (req, res) => {
    const index = parseInt(req.params.index); // Extrai o índice da URL
    if (!isNaN(index) && index >= 0 && index < items.length) {
        items.splice(index, 1); // Remove o item pelo índice
        res.status(200).json({ message: 'Item removido!', items }); // Sucesso
    } else {
        res.status(404).json({ message: 'Índice inválido ou item não encontrado!' }); // Erro 404
    }
});

module.exports = router; // Exporta as rotas
