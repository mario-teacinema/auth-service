---
name: create-dto
description: Scaffolds a new NestJS Data Transfer Object (DTO) with validation decorators. Use this skill when the user wants to create a new DTO class.
---

# Create DTO

This skill helps you scaffold a new Data Transfer Object (DTO) for a NestJS application. It ensures consistency with the project's validation standards by using `class-validator` and `class-transformer`.

## Workflow

1.  **Identify Location**:
    -   Ask the user for the **Module Name** (e.g., `auth`, `user`).
    -   Ask for the **DTO Name** (e.g., `CreateUserDto`, `LoginRequestDto`).
    -   The target path will be `src/modules/<module-name>/dto/<dto-name>.dto.ts`.
    -   *Note*: If the `dto` directory doesn't exist, you will create it.

2.  **Gather Properties**:
    -   Ask the user to list the properties for the DTO.
    -   For each property, determine:
        -   **Name** (camelCase)
        -   **Type** (`string`, `number`, `boolean`, `Date`, or custom class)
        -   **Validators** (e.g., `@IsString()`, `@IsInt()`, `@IsOptional()`, `@IsEmail()`)
        -   **Transformations** (e.g., `@Type(() => Number)`)

3.  **Generate Code**:
    -   Create the file with the following structure:

```typescript
import { Type } from "class-transformer";
import { IsString, IsInt, IsOptional, IsEmail, Min, Max } from "class-validator"; // Import only used validators

export class <DtoName> {
  @IsString()
  public readonly <propertyName>: string;

  @Type(() => Number)
  @IsInt()
  public readonly <otherProperty>: number;
}
```

4.  **Review & Save**:
    -   Present the generated code to the user.
    -   Upon approval, save the file to the target path.

## Guidelines

-   **Read-only Properties**: Always mark DTO properties as `public readonly`.
-   **Strict Types**: Use specific TypeScript types (avoid `any`).
-   **Validation**: Every property (except optional ones, though even those need `@IsOptional()`) should have at least one validator.
-   **Imports**: Clean up unused imports.
