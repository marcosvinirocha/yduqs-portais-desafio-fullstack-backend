# YDUQS Portais Desafio Fullstack - Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Backend application for YDUQS Portals Challenge built with NestJS and PostgreSQL</p>

## Description

This is the backend component of the YDUQS Portals Fullstack Challenge. It's a REST API built with NestJS that provides user management functionality with comprehensive validation. The application includes:

- User creation with validation for email, CPF, and required fields
- PostgreSQL database with Prisma ORM
- Input validation using class-validator
- API documentation with Swagger
- Comprehensive testing setup with Jest
- Docker configuration for database and pgAdmin

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose**
- **Git**

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/yduqs-portais-desafio-fullstack.git
cd yduqs-portais-desafio-fullstack/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

You'll need to create a `.env` file in the root of the backend directory with the following content:

```env
DATABASE_URL="postgresql://postgres@localhost:5432/minha_app"
PORT=3000
```

## Database Setup

The application uses PostgreSQL with Prisma ORM. The project includes a Docker Compose configuration to easily set up the database and pgAdmin.

### 1. Start the database services

```bash
docker-compose up -d
```

This command will start:
- PostgreSQL database (port 5432)
- pgAdmin (port 8080) - accessible at http://localhost:8080

### 2. Database credentials for pgAdmin

- Email: `admin@prisma.com`
- Password: `prisma123`

### 3. Prisma setup

Generate Prisma client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma db push
# or run the following command if you have migrations in the prisma/migrations folder
npx prisma migrate dev
```

## API Endpoints

The application provides the following API endpoints:

### User Management

#### Create User
- **POST** `/user`
- **Description**: Creates a new user with validation
- **Headers**: `Content-Type: application/json`
- **Body**: 
```json
{
  "email": "user@example.com",
  "name": "User Name",
  "cpf": "12345678901",
  "birthday": "01/01/1990",
  "graduationDate": "01/01/2023",
  "cellphone": "11999999999"
}
```
- **Response**: 
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "User Name",
  "cpf": "12345678901",
  "birthday": "01/01/1990",
  "graduationDate": "01/01/2023",
  "cellphone": "11999999999",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```
- **Validation**:
  - Email must be valid
  - CPF must be valid and 11 digits
  - Name, birthday, graduationDate, and cellphone are required
  - Birthday and graduationDate must be in DD/MM/YYYY format

#### Delete All Users
- **DELETE** `/user`
- **Description**: Deletes all users from the database
- **Response**: Status 204 (No Content)

### Swagger Documentation

The API is documented with Swagger and available at:
- **URL**: `http://localhost:3000/api`
- Provides interactive API documentation with example requests and responses

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

```bash
# Run in watch mode (reloads on file changes)
npm run start:dev
```

The application will be available at `http://localhost:3000` (or the port specified in your `.env` file).

### Production Mode

To build and run the application in production mode:

```bash
# Build the application
npm run build

# Run the built application
npm run start:prod
```

### Other Commands

- **Start without watch mode**: `npm run start`
- **Start in debug mode**: `npm run start:debug`
- **Format code**: `npm run format`
- **Lint code**: `npm run lint`

## Testing

The application includes comprehensive testing with different options:

### Unit Tests

To run unit tests:

```bash
npm run test
```

### Unit Tests in Watch Mode

To run unit tests in watch mode (re-runs tests on file changes):

```bash
npm run test:watch
```

### Test Coverage

To run tests and generate a coverage report:

```bash
npm run test:cov
```

### End-to-End Tests

To run end-to-end tests:

```bash
npm run test:e2e
```

### Debug Tests

To run tests in debug mode:

```bash
npm run test:debug
```

### Test Structure

- **Test files**: Located in the `src/` directory alongside the code they test (e.g., `user.service.spec.ts` for `user.service.ts`)
- **Framework**: Uses Jest as the testing framework
- **Mocking**: Includes mocking and test fixtures where appropriate

## Database Schema

The application uses the following database schema:

### User Model
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Int | @id @default(autoincrement()) | Unique identifier |
| email | String | @unique | User's email address |
| name | String? | Nullable | User's full name |
| cpf | String | Required | User's CPF (Brazilian ID) |
| birthday | String | Required | User's birthday (DD/MM/YYYY) |
| graduationDate | String | Required | User's graduation date (DD/MM/YYYY) |
| cellphone | String | Required | User's phone number |
| createdAt | DateTime | @default(now()) | Record creation timestamp |
| updatedAt | DateTime | @updatedAt | Record update timestamp |

## Project Architecture

The application follows a modular architecture pattern:

- **app.module.ts**: Main application module
- **user/**: User management module containing:
  - `user.controller.ts`: API endpoints
  - `user.service.ts`: Business logic
  - `user.repository.ts`: Data access layer
  - `dto/`: Data transfer objects for validation
- **db/**: Database module containing:
  - `prisma.service.ts`: Prisma database service
  - `db.module.ts`: Database module configuration

## Validation

The application implements comprehensive validation using:

- `class-validator` and `class-transformer` for input validation
- Custom CPF validation using `class-validator-cpf`
- DTOs (Data Transfer Objects) to define request contracts
- Automatic validation pipe in `main.ts` for request handling

## Deployment

For production deployment:

1. Ensure environment variables are properly configured for production
2. Run database migrations before starting the application
3. Build the application: `npm run build`
4. Start the production server: `npm run start:prod`

## Troubleshooting

### Common Issues

1. **Database Connection Errors**: Ensure Docker containers are running with `docker-compose ps`
2. **Migration Issues**: Run `npx prisma db push` for schema updates
3. **Missing Dependencies**: Run `npm install` to reinstall dependencies

### Useful Commands

- Check running Docker containers: `docker-compose ps`
- View Docker logs: `docker-compose logs`
- Stop Docker services: `docker-compose down`

## Support

For questions about this project:

- Check the [NestJS Documentation](https://docs.nestjs.com) for framework-related questions
- For project-specific questions, create an issue in the repository
- For Prisma-related questions, check the [Prisma Documentation](https://www.prisma.io/docs)

## License

This project is [MIT licensed](LICENSE).
