# 🏫 Sistema de Gerenciamento de Salas

Este repositório contém uma API desenvolvida como projeto acadêmico para gerenciamento de salas, utilizando Node.js, Express e MongoDB. A aplicação inclui funcionalidades de autenticação, cadastro de laboratórios, geração de relatórios em PDF e restrição de acesso em determinados dias da semana. A API também possui testes automatizados e está hospedada na nuvem.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Instalação e Uso](#-instalação-e-uso)
- [Rotas da API](#-rotas-da-api)
- [Testes](#-testes)
- [Contribuição](#-contribuição)
- [Licença](#-licença)
- [Link da API (Vercel)](#-link-da-api-vercel)

---

## 📖 Sobre o Projeto

O projeto consiste em uma API RESTful para o gerenciamento de laboratórios. A aplicação permite que usuários realizem login e cadastrem laboratórios com informações como nome, descrição, capacidade e foto. Também é possível gerar um relatório em PDF contendo a lista de laboratórios cadastrados. A API está protegida por um middleware que restringe o acesso apenas em dias úteis.

---

## 🛠 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (Json Web Token)
- bcrypt
- multer
- PDFKit
- cors
- supertest (para testes automatizados)

---

## 🚀 Funcionalidades

- Autenticação de usuários com JWT.
- Cadastro de laboratórios com foto.
- Geração de relatório em PDF com lista de laboratórios.
- Middleware que restringe acesso nos finais de semana.
- Testes automatizados para garantir o correto funcionamento das rotas.
- Armazenamento de dados no MongoDB.

---

## 📦 Instalação e Uso

### Requisitos

- Node.js
- MongoDB

### Passos para rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/sistema-gerenciamento-salas.git
   cd sistema-gerenciamento-salas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   PORT=5000
   MONGODB_URI=sua_url_mongodb
   JWT_SECRET=sua_chave_secreta_jwt
   ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

---

## 🔗 Rotas da API

### **Autenticação**

**POST** `/logar`  
- **Descrição:** Rota para autenticação de usuário.
- **Body:**  
  ```json
  {
    "email": "usuario@example.com",
    "senha": "suaSenha"
  }
  ```

---

### **Usuários**

**POST** `/create/user`  
- **Descrição:** Rota para criar um novo usuário.
- **Body:**  
  ```json
  {
    "nome": "Nome do Usuário",
    "email": "usuario@example.com",
    "senha": "suaSenha"
  }
  ```

---

### **Laboratórios**

**POST** `/laboratorio/novo`  
- **Descrição:** Rota para cadastrar um novo laboratório.  
- **Body (form-data):**  
  - `nome` (string)
  - `descricao` (string)
  - `capacidade` (number)
  - `foto` (file)

---

**GET** `/laboratorio/relatorio`  
- **Descrição:** Gera um arquivo PDF contendo a lista de laboratórios cadastrados, incluindo as fotos.

---

## 🧪 Testes

Em andamento...


---

## 🌐 Link da API (Vercel)

**Em breve...**
