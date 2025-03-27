# 🛍️ Orionbyte - E-Commerce Gamer & TI

Bem-vindo ao repositório da **Orionbyte**, um e-commerce focado em produtos gamer e de tecnologia, desenvolvido pela **Equipe 3 FSN5** como parte do desafio de criar uma plataforma completa para vendas online.

## 🚀 Sobre o Projeto

A Orionbyte é uma plataforma de e-commerce que permite a criação, gerenciamento e venda de produtos. O sistema conta com um frontend dinâmico e um backend robusto, garantindo uma experiência de compra fluida e eficiente.

### 📌 Funcionalidades Principais
- 📦 **Gerenciamento de Produtos** - Criar, listar, editar e deletar produtos.
- 👤 **Cadastro de Clientes e Vendedores** - Permite o gerenciamento dos usuários da plataforma.
- 🛍️ **Carrinho de Compras** - Adicionar e remover produtos do carrinho e finalizar compras.
- 📊 **Registro de Pedidos** - As vendas são armazenadas e gerenciadas no banco de dados.

## 🧑‍💻 Equipe Desenvolvedora
- **Vinícius Vasconcelos**
- **Levir Melo**
- **Kauã Lima**
- **Nayra Moura**
- **Ruthielen Almeida**

## 📂 Estrutura do Projeto

```
leviruz-avanti/
├── client/          # Frontend do projeto
│   ├── src/        # Código-fonte
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── context/           # Context API para gerenciamento de estado
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── assets/            # Imagens e recursos visuais
│   ├── public/                # Arquivos estáticos
│   ├── index.html             # Página principal
│   ├── vite.config.js         # Configuração do Vite
│   ├── package.json           # Dependências do frontend
└── server/          # Backend do projeto
    ├── controllers/           # Lógica de controle das rotas
    ├── middleware/            # Middlewares para autenticação e segurança
    ├── prisma/                # Configuração do banco de dados Prisma
    ├── repositories/          # Repositórios para interação com o banco
    ├── routes/                # Definição das rotas da API
    ├── services/              # Regras de negócio da aplicação
    ├── uploads/               # Diretório para armazenamento de arquivos
    ├── index.js               # Ponto de entrada do backend
    ├── package.json           # Dependências do backend
```

## 🏗️ Tecnologias Utilizadas

### 🌐 Frontend:
- React.js ⚛️
- Vite 🚀
- Context API 📌
- CSS Modules 🎨

### 🖥️ Backend:
- Node.js 🟢
- Express.js 🚀
- Prisma ORM 🛢️
- PostgreSQL 🗄️
- JWT (JSON Web Token) 🔑

## 🔧 Como Executar o Projeto

### ⚡ Pré-requisitos
Antes de começar, você precisará ter instalado em sua máquina:
- **Node.js** (versão mais recente recomendada)
- **PostgreSQL** (para o banco de dados)
- **Git**

### 🛠️ Passo a Passo

1. **Clone este repositório**
   ```bash
   git clone https://github.com/Leviruz/avanti.git
   cd avanti
   ```

2. **Configurar o Backend**
   ```bash
   cd server
   npm install
   ```
   - Configure o banco de dados no arquivo `.env`.
   - Execute as migrações do Prisma:
     ```bash
     npx prisma migrate dev
     ```
   - Inicie o servidor:
     ```bash
     npm run dev
     ```

3. **Configurar o Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:3000`.

---

🔗 **Equipe 3 FSN5** - Desenvolvendo tecnologia para o futuro! 🚀

