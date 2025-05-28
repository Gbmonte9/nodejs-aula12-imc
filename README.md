# NodeJS - Aula 12 - Homework

Este projeto foi desenvolvido como parte do exercício da Aula 12 do curso de Node.js. Ele simula o cadastro e gerenciamento de usuários, utilizando o framework Express com integração a banco de dados PostgreSQL.

## ✍️ Funcionalidades

- Página de cadastro de usuários via formulário (`/cadastro`)
- Armazenamento de dados em uma tabela chamada `usuario_imc`
- Consulta de usuário individual pela rota `/user/:id`
- Cálculo e exibição do IMC (Índice de Massa Corporal)
- Listagem de todos os usuários cadastrados na página inicial (`/`)
- Funcionalidade de exclusão de usuário com confirmação

## 📋 Campos do Formulário

O formulário de cadastro possui os seguintes campos obrigatórios:

- **Nome**
- **E-mail**
- **Peso** (em kg)
- **Altura** (em metros)

## 🗃️ Estrutura da Tabela `usuario_imc`

| Campo   | Tipo         | Descrição                  |
|---------|--------------|----------------------------|
| id      | SERIAL       | Identificador único (PK)   |
| nome    | VARCHAR(50)  | Nome do usuário            |
| email   | VARCHAR(50)  | E-mail do usuário          |
| peso    | INTEGER      | Peso do usuário (kg)       |
| altura  | INTEGER      | Altura do usuário (metros) |

> ⚠️ O IMC é calculado diretamente no sistema, a partir do peso e altura informados.

## 🧮 Cálculo do IMC

A fórmula utilizada para calcular o IMC é:

### IMC = peso / (altura * altura)

O resultado é exibido na rota `/user/:id`.

## 🗑️ Exclusão de Usuário

Cada usuário listado na página inicial pode ser excluído através do botão de lixeira. Ao clicar, uma confirmação é solicitada antes de deletar o registro do banco de dados.

## 🚀 Como executar

1. Clone este repositório
2. Instale as dependências:
    ```bash
   npm instal
3. Configure o acesso ao banco de dados no arquivo db.js
4. Inicie o servidor:
    ```bash
        npm start
5. Acesse no navegador::
    http://localhost:3000

## 🛠️ Tecnologias utilizadas

1. Node.js
2. Express
3. Pug (template engine)
4. PostgreSQL
5. Bootstrap (via CDN)

## Desenvolvido por Gabriel Monte




