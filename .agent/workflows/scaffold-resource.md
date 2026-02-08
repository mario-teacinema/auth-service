---
description: Create a new NestJS resource (Module, Controller, Service).
---
1.  **Ask the user**: "What is the name of the new resource?"
2.  **Generate**: Use the `run_command` tool to generate the resource using the Nest CLI.
    ```bash
    npx nest generate resource <resource-name> --no-spec
    ```
3.  **Create DTOs**: Create `create-<resource-name>.dto.ts` and `update-<resource-name>.dto.ts` in the `dto` folder of the new module.
4.  **Update Controller**: Update the controller to define gRPC methods.
5.  **Update Service**: Implement basic CRUD operations in the service.
6.  **Register Module**: Verify that the new module is imported in `app.module.ts`.
