# **Aplicação de Gerenciamento com React.js**

## **Descrição do Projeto**

Este é um projeto de aplicação web SPA (Single Page Application) construído com **React.js**. A aplicação simula um sistema de gerenciamento onde é possível controlar usuários e serviços. O objetivo principal foi criar uma interface de usuário funcional e agradável, com operações de CRUD (Criar, Ler, Atualizar e Excluir) completas, sistema de login e uma estrutura de código organizada.

Para a persistência de dados, o projeto utiliza o **JSON Server**, que simula uma API RESTful completa, permitindo que o front-end realize requisições HTTP como se estivesse se comunicando com um backend real.

## **✨ Funcionalidades**

  - **Autenticação de Usuário:** Tela de login que valida as credenciais contra a API simulada.
  - **Tratamento de Erros:** Exibição de mensagens de erro claras em caso de falha no login ou em outras operações.
  - **Dashboard:** Página inicial após o login com um resumo dos dados do sistema (total de usuários e serviços).
  - **Gerenciamento de Serviços (CRUD):**
      - Listagem de todos os serviços.
      - Criação de novos serviços através de um formulário.
      - Edição de informações de serviços existentes.
      - Exclusão de serviços com diálogo de confirmação.
  - **Gerenciamento de Usuários (CRUD):**
      - Listagem de todos os usuários do sistema.
      - Criação de novos usuários.
      - Edição de dados de usuários.
      - Exclusão de usuários.
  - **Layout Responsivo:** A interface se adapta a diferentes tamanhos de tela.
  - **Navegação Protegida:** As rotas de gerenciamento são protegidas e só podem ser acessadas por usuários autenticados.
  - **Componentes Reutilizáveis:** Estrutura com componentes como Navbar e Footer que se mantêm fixos em todas as telas, exceto no login.

## **🛠️ Tecnologias Utilizadas**

  - **Front-end:**
      - [React.js](https://react.dev/)
      - [React Router DOM](https://reactrouter.com/) (para navegação)
      - [Axios](https://axios-http.com/) (para requisições HTTP)
      - CSS puro para estilização.
  - **Back-end (Simulado):**
      - [JSON Server](https://github.com/typicode/json-server)
  - **Ambiente de Desenvolvimento:**
      - [Node.js](https://nodejs.org/)
      - [npm](https://www.npmjs.com/)

## **Pré-requisitos**

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

  - [Node.js](https://nodejs.org/) (versão 16 ou superior)
  - [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)

## **🚀 Instalação e Execução**

Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    ```

2.  **Acesse o diretório do projeto:**

    ```bash
    cd nome-do-repositorio
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Inicie o Servidor da API (JSON Server):**
    Abra um terminal e execute o seguinte comando. O backend simulado estará disponível em `http://localhost:3001`.

    ```bash
    npm run server
    ```

5.  **Inicie a Aplicação React:**
    **Em um novo terminal**, execute o comando abaixo. A aplicação estará disponível em `http://localhost:3000`.

    ```bash
    npm start
    ```

## **🔑 Credenciais de Acesso**

Para acessar o sistema, utilize as credenciais padrão definidas no arquivo `db.json`:

  - **Email:** `admin@empresa.com`
  - **Senha:** `admin`

## **📁 Estrutura de Pastas**

O projeto está organizado da seguinte forma:

```
minha-app-gerenciamento/
├── public/
├── src/
│   ├── components/       # Componentes reutilizáveis (Navbar, Footer)
│   ├── context/          # Contexto de autenticação
│   ├── pages/            # Componentes de página e CRUDs
│   ├── services/         # Configuração do Axios (se houver)
│   ├── App.css           # Estilos globais
│   ├── App.js            # Componente principal e rotas
│   └── index.js          # Ponto de entrada da aplicação
├── .gitignore
├── db.json               # Banco de dados simulado
├── package.json
└── README.md
