const express = require('express');
const cors = require('cors'); // Importar o pacote cors
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // Carregar variáveis de ambiente

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(bodyParser.json()); // Para lidar com JSON no corpo das requisições

// Rota de teste - Listar todos os produtos
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar produtos.');
    }
});

// Rota de pesquisa - Buscar produtos pelo nome
app.get('/search', async (req, res) => {
    const { query } = req.query; // Termo de pesquisa enviado pelo frontend
    try {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: query, // Realiza busca parcial
                    mode: 'insensitive', // Ignora maiúsculas e minúsculas
                },
            },
        });
        res.json(products); // Retorna os resultados em formato JSON
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao realizar pesquisa.');
    }
});

// Configuração do servidor
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});