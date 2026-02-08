---
description: Apply database migration using Prisma
---
1.  **Ask the user**: "What is the name of the migration?"
2.  **Generate Migration**: Use the `run_command` tool to generate and apply the migration.
    ```bash
    npx prisma migrate dev --name <migration-name>
    ```
3.  **Generate Client**: Use the `run_command` tool to regenerate the Prisma client.
    ```bash
    npx prisma generate
    ```
4.  **Confirm**: Verify that the migration was applied successfully.
