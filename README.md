# YDUQS Portais Desafio Fullstack - Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Aplicação backend para o Desafio YDUQS Portais construído com NestJS e PostgreSQL</p>

## Descrição

Este é o componente backend do Desafio Fullstack YDUQS Portais. É uma API REST construída com NestJS que fornece funcionalidades de gerenciamento de usuários com validação abrangente. A aplicação inclui:

- Criação de usuário com validação para email, CPF e campos obrigatórios
- Banco de dados PostgreSQL com ORM Prisma
- Validação de entrada usando class-validator
- Documentação da API com Swagger
- Configuração abrangente de testes com Jest
- Configuração Docker para banco de dados e pgAdmin

## Pré-requisitos

Antes de configurar o projeto, certifique-se de ter os seguintes itens instalados:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Docker** e **Docker Compose**
- **Git**

## Configuração do Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/your-username/yduqs-portais-desafio-fullstack.git
cd yduqs-portais-desafio-fullstack/backend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configuração de ambiente

Você precisará criar um arquivo `.env` na raiz do diretório backend com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://postgres@localhost:5432/minha_app"
```

## Configuração do Banco de Dados

A aplicação utiliza PostgreSQL com ORM Prisma. O projeto inclui uma configuração do Docker Compose para configurar facilmente o banco de dados e o pgAdmin.

### 1. Iniciar os serviços do banco de dados

```bash
docker-compose up -d
```

Este comando iniciará:

- Banco de dados PostgreSQL (porta 5432)
- pgAdmin (porta 8080) - acessível em http://localhost:8080

### 2. Credenciais do banco de dados para pgAdmin

- Email: `admin@prisma.com`
- Senha: `prisma123`

### 3. Configuração do Prisma

Gerar cliente Prisma:

```bash
npx prisma generate
```

Aplicar migrações do banco de dados:

```bash
npx prisma db push
# ou execute o seguinte comando se você tiver migrações na pasta prisma/migrations
npx prisma migrate dev
```

## Endpoints da API

A aplicação fornece os seguintes endpoints da API:

### Gerenciamento de Usuários

#### Criar Usuário

- **POST** `/user`
- **Descrição**: Cria um novo usuário com validação
- **Headers**: `Content-Type: application/json`
- **Corpo**:

```json
{
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "cpf": "12345678901",
  "birthday": "01/01/1990",
  "graduationDate": "01/01/2023",
  "cellphone": "11999999999"
}
```

- **Resposta**:

```json
{
  "id": 1,
  "email": "usuario@exemplo.com",
  "name": "Nome do Usuário",
  "cpf": "12345678901",
  "birthday": "01/01/1990",
  "graduationDate": "01/01/2023",
  "cellphone": "11999999999",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

- **Validação**:
  - Email deve ser válido
  - CPF deve ser válido e ter 11 dígitos
  - Nome, aniversário, data de formatura e celular são obrigatórios
  - Aniversário e data de formatura devem estar no formato DD/MM/AAAA

#### Excluir Todos os Usuários

- **DELETE** `/user`
- **Descrição**: Exclui todos os usuários do banco de dados
- **Resposta**: Status 204 (No Content)

### Documentação Swagger

A API é documentada com Swagger e está disponível em:

- **URL**: `http://localhost:3000/api`
- Fornece documentação interativa da API com exemplos de requisições e respostas

## Executando a Aplicação

### Modo de Desenvolvimento

Para executar a aplicação em modo de desenvolvimento com recarga automática:

```bash
# Executar em modo watch (recarrega em alterações de arquivos)
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000` (ou na porta especificada no seu arquivo `.env`).

### Modo de Produção

Para construir e executar a aplicação em modo de produção:

```bash
# Construir a aplicação
npm run build

# Executar a aplicação construída
npm run start:prod
```

### Outros Comandos

- **Iniciar sem modo watch**: `npm run start`
- **Iniciar em modo debug**: `npm run start:debug`
- **Formatar código**: `npm run format`
- **Verificar código**: `npm run lint`

## Testes

A aplicação inclui testes abrangentes com diferentes opções:

### Testes Unitários

Para executar testes unitários:

```bash
npm run test
```

### Testes Unitários em Modo Watch

Para executar testes unitários em modo watch (executa novamente os testes em alterações de arquivos):

```bash
npm run test:watch
```

### Cobertura de Testes

Para executar testes e gerar um relatório de cobertura:

```bash
npm run test:cov
```

### Testes de Ponta a Ponta

Para executar testes de ponta a ponta:

```bash
npm run test:e2e
```

### Testes em Modo Debug

Para executar testes em modo debug:

```bash
npm run test:debug
```

### Estrutura de Testes

- **Arquivos de teste**: Localizados no diretório `src/` junto com o código que estão testando (ex: `user.service.spec.ts` para `user.service.ts`)
- **Framework**: Utiliza Jest como framework de testes
- **Mocking**: Inclui mocking e fixtures de teste onde apropriado

## Esquema do Banco de Dados

A aplicação utiliza o seguinte esquema do banco de dados:

### Modelo Usuário

| Campo          | Tipo     | Restrições                    | Descrição                                 |
| -------------- | -------- | ----------------------------- | ----------------------------------------- |
| id             | Int      | @id @default(autoincrement()) | Identificador único                       |
| email          | String   | @unique                       | Endereço de email do usuário              |
| name           | String?  | Nulo                          | Nome completo do usuário                  |
| cpf            | String   | Obrigatório                   | CPF do usuário (ID brasileiro)            |
| birthday       | String   | Obrigatório                   | Aniversário do usuário (DD/MM/AAAA)       |
| graduationDate | String   | Obrigatório                   | Data de formatura do usuário (DD/MM/AAAA) |
| cellphone      | String   | Obrigatório                   | Número de telefone do usuário             |
| createdAt      | DateTime | @default(now())               | Timestamp de criação do registro          |
| updatedAt      | DateTime | @updatedAt                    | Timestamp de atualização do registro      |

## Arquitetura do Projeto

A aplicação segue um padrão de arquitetura modular:

- **app.module.ts**: Módulo principal da aplicação
- **user/**: Módulo de gerenciamento de usuários contendo:
  - `user.controller.ts`: Endpoints da API
  - `user.service.ts`: Lógica de negócio
  - `user.repository.ts`: Camada de acesso a dados
  - `dto/`: Objetos de transferência de dados para validação
- **db/**: Módulo de banco de dados contendo:
  - `prisma.service.ts`: Serviço de banco de dados Prisma
  - `db.module.ts`: Configuração do módulo de banco de dados

## Validação

A aplicação implementa validação abrangente utilizando:

- `class-validator` e `class-transformer` para validação de entrada
- Validação personalizada de CPF usando `class-validator-cpf`
- DTOs (Objetos de Transferência de Dados) para definir contratos de requisição
- Pipe de validação automática em `main.ts` para tratamento de requisições

## Deploy

Para deploy em produção:

1. Certifique-se de que as variáveis de ambiente estão configuradas corretamente para produção
2. Execute as migrações do banco de dados antes de iniciar a aplicação
3. Construa a aplicação: `npm run build`
4. Inicie o servidor de produção: `npm run start:prod`

## Solução de Problemas

### Problemas Comuns

1. **Erros de Conexão com o Banco de Dados**: Certifique-se de que os containers Docker estão rodando com `docker-compose ps`
2. **Problemas de Migração**: Execute `npx prisma db push` para atualizações de esquema
3. **Dependências Ausentes**: Execute `npm install` para reinstalar dependências

### Comandos Úteis

- Verificar containers Docker em execução: `docker-compose ps`
- Visualizar logs do Docker: `docker-compose logs`
- Parar serviços Docker: `docker-compose down`

## Licença

Este projeto está licenciado sob a [licença MIT](LICENSE).
