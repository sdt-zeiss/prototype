# ZEISS ZKM Prototype

## Features

## Tech Stack

- Next.js (React)
- Prisma (ORM)
- PostgreSQL (Database)
- OpenAI GPT4 + WHISPER (API)
- TailwindCSS (Styling)
- Turborepo (Monorepo)
- ShadcnUI (Styling)
- Resend.com (Emails)
- Render.com (Hosting)

## Development

To get started, you will need to have Node.js (v21) and pnpm (v8) installed. After cloning, run the following command:

```bash
pnpm install
```

You will then have to create an `.env.local` file in `/apps/web/` and add the following:

```bash
DATABASE_URL=...
```

Do the same in `/packages/database/`.

### Commands

A bunch of commands are available to you:

```bash
pnpm run dev --filter web # Start the web app
pnpm run dev db:push --filter database # Push the database schema to the database
pnpm run dev db:seed --filter database # Seed the database with some data
pnpm run dev db:generate --filter database # Generate the Prisma client
```

## Deployment

Both the web app and database are currently deployed on render.com. If you decide to deploy, you can use the IaC blueprint in `render.yaml` to deploy everything with a single click:

```yaml
services:
  - type: web
    name: zeiss-zkm-prototype
    runtime: node
    buildCommand: pnpm install --filter web && pnpm run build --filter web
    startCommand: pnpm run start --filter web
databases:
  - name: zeiss-zkm-prototype
    region: frankfurt
    plan: standard
    databaseName: prototype
    postgresMajorVersion: 15
```

## Architecture

This is the diagram of the database. You can also find the schema in `/packages/database/schema.prisma`

![](./diagram.png)

## Screenshots

You can find more screenshots in the screenshots folder.

## License

No License. Please do not use this project for commercial purposes without permission :)
