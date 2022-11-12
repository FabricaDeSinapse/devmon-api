# DevMon API

Essa é a API do projeto DevMon, desenvolvida utilizando NestJS e Prisma, com banco de dados em SQLite, disponível no arquivo [sqlite.db](https://github.com/FabricaDeSinapse/devmon-api/blob/main/prisma/sqlite.db).

## Rodando a aplicação

1. Faça o clone do repositório.
2. Dentro da pasta do projeto, instale as dependências com o comando:
    ```bash
    npm ci
    ```
3. Rode o projeto com o comando:
    ```bash
    npm start
    ```
4. Abra o navegador ou HTTP Client na URL [http://localhost:3000](http://localhost:3000).

## Endpoints

- `[GET] /creature`: Lista de criaturas
- `[GET] /creature/:id`: Detalhes de uma criatura

### Swagger

Confira a lista completa e teste os endpoints na rota da documentação: [http://localhost:3000/api](http://localhost:3000/api).
