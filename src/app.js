const express = require('express');
const app = express();

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Importa as rotas de itens
 const itemsRoutes = require('./routes/items');
app.use('/api', itemsRoutes); // Prefixo para as rotas

app.use(express.static('public'));

// Configura o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
