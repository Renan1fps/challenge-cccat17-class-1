Este conteúdo é parte do curso Clean Code e Clean Architecture da Branas.io

Para mais informações acesse:

https://branas.io

# Desafio 1 Refatoração do curso Clean Code e Clean Architecture do Rodrigo Branas

Este projeto utiliza Docker para gerenciar um servidor PostgreSQL e Node.js para a aplicação. Siga as instruções abaixo para configurar e executar o projeto.

## Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/)

## Configuração

### 1. Definir o Caminho do Volume

Antes de iniciar o Docker Compose, você precisa definir a variável de ambiente `LOCAL_PATH` para o caminho do volume na sua máquina. Isso pode ser feito de duas formas:

#### Usando o terminal

No Windows, abra o terminal e execute:

```sh
set LOCAL_PATH=C:/<path_do_projeto>
```` 

No linux:

```sh
export LOCAL_PATH=<path_do_projeto>
```` 


Usando um arquivo .env

Crie um arquivo .env na raiz do seu projeto com o seguinte conteúdo:

```sh
LOCAL_PATH=<path_do_projeto>
```` 

### 2. Rodar o Docker Compose

```sh
docker-compose up -d
```

### 3. Instalar Dependências
Instale as dependências do projeto usando npm:

```sh
npm install
```

### 4. Rodar o Servidor
Para iniciar o servidor Node.js, execute:
```sh
npm run start-server
```

### 5. Rodar os Testes
Para executar todos os testes, execute:
```sh
npm run test
```
