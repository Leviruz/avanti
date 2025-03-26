const path = require('path');
const express = require('express');
const cors = require('cors'); // Permite requisições de outras origens (CORS)
const productRoutes = require('./routes/productRoutes');
const customerRoutes = require('./routes/customerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { PrismaClient } = require('@prisma/client');

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();
const app = express();

app.use(cors()); // Habilita CORS para testes no Insomnia e frontends
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Definir todas as rotas da API
app.use('/api', productRoutes);
app.use('/api', customerRoutes);
app.use('/api', sellerRoutes);
app.use('/api', orderRoutes);

// Middleware para capturar erros globais
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

// Fecha a conexão do Prisma corretamente ao encerrar o servidor
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});