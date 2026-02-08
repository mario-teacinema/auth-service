# NestJS Development Guidelines

This document outlines the standards and best practices for developing NestJS applications within this project.

## 🏗 Architecture

### Modules
- **Feature Modules**: encapsulate logical units of business domain (e.g., `AuthModule`, `UsersModule`).
- **Core Module**: properly scoped singletons, global configurations, and essential providers (e.g., `ConfigModule`, `DatabaseModule`).
- **Shared Module**: providers and utilities shared across multiple modules.

### Controllers (gRPC focus)
- Since this is a gRPC service, use `@GrpcMethod` or `@MessagePattern` decorators.
- **DTOs**: Always use DTOs for input and output.
- **Validation**: Use `class-validator` decorators on DTOs.
- **Error Handling**: Throw `RpcException` for transport-layer errors, map domain errors to appropriate gRPC status codes.

### Services
- Contain business logic.
- Should be unit-testable.
- Use dependency injection for all external dependencies (Repositories, other Services).

## 📝 Code Standards

### Dependency Injection
- Never manually instantiate service classes ( `new Service()`). Always use the constructor to inject dependencies.
- Use `@Injectable()` decorator.

### Configuration
- Use `@nestjs/config` for accessing environment variables.
- Group related configurations (e.g., `database`, `app`) and validate them using `joi` or custom validators.
- Access config via `ConfigService`.

### Database (Prisma)
- **Schema**: Define data models in `prisma/schema.prisma`.
- **Client**: Use the generated Prisma Client.
- **Repositories**: Ideally, abstract Prisma calls behind a repository pattern or a dedicated data access service in the module, though directly using `PrismaService` is acceptable for simpler CRUD.
- **Migrations**: Always use migrations to change database schema. Never change the database manually.

### TypeScript
- **Strict Mode**: `strict: true` is enabled. No `any`.
- **Interfaces**: Explicitly type all method arguments and return values.
- **Enums**: Use TypeScript enums for fixed sets of values.

## 🧪 Testing

### Unit Tests (`.spec.ts`)
- Co-located with the source file.
- Mock all dependencies using `@nestjs/testing`.
- Focus on business logic in Services.

### E2E Tests (`test/`)
- Test the entire flow from controller to database (using a test database or mocked Prisma).
- Verify gRPC endpoints.

## 🛠 Common Workflows

### Creating a New Resource
1.  **Module**: Create a new module documentation/folder.
2.  **Proto**: Define the gRPC service definition in `.proto` file.
3.  **Controller**: Implement the controller methods.
4.  **Service**: Implement business logic.
5.  **DTOs**: Create request/response classes with validation.

### Database Migration
1.  Edit `prisma/schema.prisma`.
2.  Run `yarn prisma migrate dev --name <migration_name>` to generate and apply migration.
3.  Run `yarn prisma generate` to update the client.

## 🔍 Linting & Formatting
- Run `yarn lint` to check for code quality issues.
- Run `yarn format` to fix formatting issues automatically.
