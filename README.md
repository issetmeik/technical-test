## Desafiotech-junior

Esse projeto visa integrar com uma API externa, essa API nos fornece uma collection de usuários, e também informações sobre endereço do mesmo e lista de contatos. Então fazemos o processamento e salvamos o usuário com seus respectivos endereços e contatos.

## Indice

- [Desafiotech-junior](#Desafiotech-junior)
- [Índice](#indice)
- [Características](#características)
- [Setup](#setup)
  - [Pré-requisitos](#pre-requisitos)
  - [Instructions](#instructions)
- [Docker](#docker)
- [Technologies](#technologies)
- [Environment](#environment)

## Características

- Integrando o sistema Mockapi, recebendo todos os usuários.
- Integrando com mockapi, recebendo endereços de cada usuário.
- Integrando com mockapi, recebendo contatos de cada usuário.
- Processando os usuários, com seus endereços, e persistindo no MONGODB.

## Setup

### Pré-requisitos

- [Node 14.17.5 LTS](https://nodejs.org/en/) -> Para rodar a aplicação se você **não** usar [Docker](#docker)
- [NPM](https://www.npmjs.com) -> Para instalar e usar os scripts package.json
- [Docker](https://www.docker.com) -> Se você não tiver uma configuração de ambiente preparada
- [MongoDB](https://www.mongodb.com/try) -> Para configurar localmente ou usar o cluster MongoDB Atlas
- [Mockapi](https://www.mockapi.io) -> Para integração com o mockapi, crie uma conta e pegue a chave da API

### Instructions

Feito os pré-requisitos, o próximo passo é seguir estas instruções:

1. Clonar o repositório.
2. Abra o terminal na pasta raiz do projeto e digite "npm install" para instalar todas as dependências.
3. Crie um arquivo chamado ".env" na raiz do projeto.
4. Use o seguinte código no arquivo criado:

# LOCAL

```env
MONGODB_URI='mongodb+srv://<YOUR_HOST>'
MOCK_API_HOST=<YOUR_MOCKAPI_KEY>
API_PORT=4000
VERSION=1.0.0
```

Para cada variável de ambiente você precisa substituir por seus **próprios dados configurados**.

5. Com a configuração concluída, você só precisa testar a execução do **npm run dev** OU **npm run docker**
6. Se tudo estiver OK, você deve testar o status do servidor através do endpoint: **seu_dominio:sua_porta/api/health** que retorna um JSON com informações básicas e o terminal deve mostrar um log como `{ "status": "ok", "info": { "mongoose": { "status": "up" } }, "error": {}, "details": { "mongoose": { "status": "up" } }, "version": "1.0.0" }`.
7. Divirta-se! :D

## Docker

Este projeto é compatível com o Docker e usei a seguinte configuração para configurar o projeto com o Docker:

**Dockerfile**

```Dockerfile
FROM node:lts-alpine

WORKDIR /usr/src/app/

COPY package*.json ./
W
RUN npm install --production

COPY . .

RUN chmod +x docker.entrypoint.sh
ENTRYPOINT [ "./docker.entrypoint.sh" ]
```

**docker.entrypoint.sh**

```sh
#!/bin/sh
npm run start
```

## Tecnologias

- :star: Node.js
- :star: Nest.api
- :star: Moongose
- :star: MongoDB Atlas
- :star: Docker
- :star: Mockapi

## Ambiente

- :desktop_computer: Visual Studio Code para codificação
- :desktop_computer: MongoDB Compass para gerenciamento de banco de dados
- :desktop_computer: Insomnia para testes de API
- :desktop_computer: Git para versionamento de código
- :desktop_computer: Spotify para focar
- :desktop_computer: Stack Overflow para debug
