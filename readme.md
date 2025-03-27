# 🛍️ Avanti - E-Commerce

Bem-vindo ao repositório do **Avanti**, um projeto de e-commerce desenvolvido pela **Equipe 3 FSN5**. O Avanti é uma plataforma de vendas online onde clientes podem visualizar produtos, adicioná-los ao carrinho e finalizar suas compras, enquanto vendedores podem cadastrar e gerenciar seus produtos.

## 🚀 Sobre o Projeto

Este projeto foi desenvolvido como parte de uma atividade acadêmica, com o objetivo de criar um e-commerce funcional. O site permite o cadastro de clientes e vendedores, criação e gerenciamento de produtos e um sistema de carrinho de compras que finaliza e registra as vendas no banco de dados.

## 👥 Equipe de Desenvolvimento

- **Vinícius Vasconcelos**
- **Levir Melo**
- **Kauã Lima**
- **Nayra Moura**
- **Ruthielen Almeida**

## 🎨 Identidade Visual

A identidade visual do Avanti foi cuidadosamente criada para garantir uma experiência agradável e intuitiva para os usuários, com um design moderno e responsivo.

## 📌 Funcionalidades

✅ Cadastro e gerenciamento de **Clientes** 🧑‍💻\
✅ Cadastro e gerenciamento de **Vendedores** 🏪\
✅ Cadastro e gerenciamento de **Produtos** 📦\
✅ Sistema de **Carrinho de Compras** 🛒\
✅ Finalização de compras e registro no **Banco de Dados** 📜\
✅ Interface amigável e responsiva 📱💻

## 🛠️ Tecnologias Utilizadas

- **Front-end**: React.js, Vite, CSS
- **Back-end**: Node.js, Express
- **Banco de Dados**: PostgreSQL com Prisma ORM

## 📂 Estrutura do Projeto

```
leviruz-avanti/
├── client/
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── vite.config.js
│   ├── .gitignore
│   ├── public/
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       │   └── img/
│       ├── components/
│       │   ├── CardProduct.jsx
│       │   ├── Carrossel.jsx
│       │   ├── DetalhesProduto.jsx
│       │   ├── Footer.jsx
│       │   └── Header.jsx
│       ├── context/
│       │   └── CartContext.jsx
│       └── pages/
│           ├── Carrinho.jsx
│           ├── ErrorPage.jsx
│           ├── Gerenciamento.jsx
│           ├── Home.jsx
│           ├── HomeLayout.jsx
│           ├── Inicial.jsx
│           └── Vitrine.jsx
└── server/
    ├── index.js
    ├── package-lock.json
    ├── package.json
    ├── .gitignore
    ├── config/
    │   └── connectionDB.js
    ├── controllers/
    │   ├── customerController.js
    │   ├── orderController.js
    │   ├── productController.js
    │   └── sellerController.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    ├── repositories/
    │   ├── customerRepository.js
    │   ├── orderRepository.js
    │   ├── productRepository.js
    │   └── sellerRepository.js
    ├── routes/
    │   ├── customerRoutes.js
    │   ├── orderRoutes.js
    │   ├── productRoutes.js
    │   └── sellerRoutes.js
    ├── services/
    │   ├── customerService.js
    │   ├── orderService.js
    │   ├── productService.js
    │   └── sellerService.js
    └── uploads/
```

## 🔧 Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e configurado

### Passos

1. Clone este repositório:
   ```sh
   git clone https://github.com/Leviruz/avanti.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd leviruz-avanti
   ```
3. Instale as dependências do cliente e do servidor:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
4. Configure o banco de dados no arquivo `.env`
5. Execute as migrações do Prisma:
   ```sh
   npx prisma migrate dev
   ```
6. Inicie o servidor:
   ```sh
   npm start
   ```
7. Em outra aba do terminal, inicie o cliente:
   ```sh
   cd ../client
   npm run dev
   ```
8. Acesse o site no navegador em `http://localhost:5173`

---

🔗 **Equipe 3 FSN5 🚀** 

