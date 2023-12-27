
# Gestão de Finanças Pessoais

## Descrição

Bem-vindo à documentação da API desenvolvida para simplificar a gestão de finanças pessoais. Esta API oferece uma variedade de funcionalidades para ajudar os usuários a acompanhar suas transações financeiras e manter o controle sobre suas finanças de maneira eficiente.

Trabalho para conclusão de módulo no Curso de Back-end na Cubos Academy.

## Autores

Mario Silva e Mario Castilho

## Versão

1.0.1

## Tecnologias Utilizadas

<div style="display: flex;">
  <img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" height="50" alt="Node.js" style="margin-right: 20px;">
  <img src="https://static-00.iconduck.com/assets.00/js-icon-2048x2048-kbwt89q3.png" height="50" alt="JavaScript" style="margin-right: 20px;">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPWXoi7cy3HEsFJ8kqj7FQisLz0IBP9r7hW-4RysSgRZKI0BLQm46I0nn-PwKi2112FaU&usqp=CAU" height="50" alt="Express" style="margin-right: 20px;">
  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968342.png" height="50" alt="Postgres" style="margin-right: 20px;">
</div>

## Instalação

1. Clone o repositório: 

```bash
git clone git@github.com:mariosilva81/personal-finance.git
```

2. Instale as dependências: 

```bash
npm install 

ou 

yarn install
```

## Configuração do Ambiente

Certifique-se de configurar as variáveis de ambiente necessárias no arquivo `.env`, usando com base o `.env.example`, localizado na raiz do projeto.

## Configuração do Banco de Dados

1. Instalação do PostgreSQL

Certifique-se de ter o PostgreSQL instalado em seu sistema. Você pode baixá-lo em [https://www.postgresql.org/download/](https://www.postgresql.org/download/).

2. Inicialização do Serviço

Após a instalação, inicie o serviço do PostgreSQL. Os comandos podem variar de acordo com o sistema operacional, mas geralmente incluem:

- **Linux:**

```bash
sudo service postgresql start
```

- **Windows:**

Vá para o "Painel de Controle" > "Ferramentas Administrativas" > "Serviços".
Localize o serviço PostgreSQL e inicie-o.

- **MacOS:**

```bash
pg_ctl -D /usr/local/var/postgres start
```

3. Acesso ao Banco de Dados

Por padrão, o PostgreSQL cria um banco de dados chamado postgres. Você pode acessá-lo usando o utilitário psql no terminal:

```bash
psql -U postgres
```

Isso abrirá uma sessão interativa com o banco de dados postgres usando o usuário postgres. Você pode ser solicitado a fornecer a senha.

4. Criar um Novo Banco de Dados

Dentro do shell psql, execute o seguinte comando para criar um novo banco de dados:

```bash
CREATE DATABASE nome_do_banco_de_dados;
```

Substitua `nome_do_banco_de_dados` pelo nome desejado para o seu banco de dados.

5. Criação de tabelas

Utilize as queries localizadas na pasta `src/database/dump` para criar as tabelas e popular a tabela `categories`.

## Executando o Projeto

Execute o seguinte comando para iniciar o servidor:

```bash
$ npm run dev
```

O servidor local estará acessível em [http://localhost:3000](http://localhost:3000). 
Observação: A porta poderá ser diferente caso tenha configurado de outra forma no `.env`.

## Endpoints

A API oferece os seguintes endpoints:

- `/categories`: Gerenciamento de categorias.
- `/login`: Autenticação de usuários.
- `/users`: Gerenciamento de usuários.
- `/transactions`: Gerenciamento de transações.

## Destaques dos Endpoints

### Categorias

- **Listar Categorias**
  - Método: `GET`
  - Endpoint: `/categories`
  - Requisitos: Autenticação do Token (`verifyToken`)

### Login

- **Fazer Login**
  - Método: `POST`
  - Endpoint: `/login`
  - Requisitos: Campos válidos (`verifyFields`), formato de e-mail válido (`verifyEmailFormat`), e-mail único (`verifyIfEmailNotExists`), senha correta (`verifyLoginPassword`)

### Usuários

- **Cadastrar Usuário**
  - Método: `POST`
  - Endpoint: `/users`
  - Requisitos: Campos válidos (`verifyFields`), formato de e-mail válido (`verifyEmailFormat`), e-mail único (`verifyEmail`)

- **Detalhar Perfil do Usuário Logado**
  - Método: `GET`
  - Endpoint: `/users`
  - Requisitos: Autenticação do Token (`verifyToken`)

- **Editar Perfil do Usuário Logado**
  - Método: `PUT`
  - Endpoint: `/users`
  - Requisitos: Autenticação do Token (`verifyToken`), Campos válidos (`verifyFields`), formato de e-mail válido (`verifyEmailFormat`), e-mail único (`verifyEmail`)

### Transações

- **Cadastrar Transação**
  - Método: `POST`
  - Endpoint: `/transactions`
  - Requisitos: Autenticação do Token (`verifyToken`), Campos válidos (`verifyFields`), Categoria válida (`verifyCategory`)

- **Listar Transações**
  - Método: `GET`
  - Endpoint: `/transactions`
  - Requisitos: Autenticação do Token (`verifyToken`)

- **Detalhar Transação**
  - Método: `GET`
  - Endpoint: `/transactions/:id`
  - Requisitos: Autenticação do Token (`verifyToken`), Transação válida (`verifyTransaction`)

- **Atualizar Transação**
  - Método: `PUT`
  - Endpoint: `/transactions/:id`
  - Requisitos: Autenticação do Token (`verifyToken`), Campos válidos (`verifyFields`), Transação válida (`verifyTransaction`), Categoria válida (`verifyCategory`)

- **Remover Transação**
  - Método: `DELETE`
  - Endpoint: `/transactions/:id`
  - Requisitos: Autenticação do Token (`verifyToken`), Transação válida (`verifyTransaction`)

- **Obter Extrato de Transações**
  - Método: `GET`
  - Endpoint: `/transactions/statement`
  - Requisitos: Autenticação do Token (`verifyToken`)

- **Filtrar Transações por Categoria**
  - Método: `GET`
  - Endpoint: `/transactions`
  - Requisitos: Autenticação do Token (`verifyToken`)

  Este endpoint permite filtrar transações com base em categorias específicas.

  **Parâmetros de Consulta (Query Params):**
  
  - `category`: Lista de categorias. Exemplo: `/transactions?category=Food`

## Contato

Para questões ou sugestões, entre em contato através do email: mariosilva.81@icloud.com.
