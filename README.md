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
AUTH_SECRET=
```

`AUTH_SECRET` can be any random string. If you are on a unix (macOS, Linux) system, you can run the following command to generate a random string:

```bash
openssl rand -base64 32
```

If you are on Windows, you can use the following command (untested)

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

`DATABASE_URL` should be the URL to your PostgreSQL database. If you want to use the hosted database, please ping me (Jonas S.) on Slack

Then also create a `.env` file in `/packages/database/prisma` and copy the `DATABASE_URL` from the `.env.local` file.

If you are bored you can figure out how to reduce the number of `.env` files:D

### Commands

A bunch of commands are available to you:

```bash
pnpm run dev --filter web # Start the web app
pnpm run dev db:push --filter database # Push the database schema to the database
pnpm run dev db:seed --filter database # Seed the database with some data
pnpm run dev db:generate --filter database # Generate the Prisma client
```

If you want to migrate the database schema, change your directory to `packages/database` and run `npx prisma migrate dev`. This will generate a new migration file in `prisma/migrations` and apply it to the database.

## Deployment

The web app is deployed on sliplane.io using Docker. You can run the following command to build the Docker image:

```bash
docker build -t prototype -f ./apps/web/Dockerfile .
```

You can then run the following command to run the Docker image:

```bash
docker run -p 3000:3000 prototype
```

To deploy, simply push to the main branch. The app will be automatically deployed and available at [https://insightsout.sliplane.app](https://insightsout.sliplane.app).

## Architecture

This is the diagram of the database. You can also find the schema in `/packages/database/schema.prisma`

![](./diagram.png)

## Screenshots

You can find more screenshots in the screenshots folder.

## License

No License. Please do not use this project for commercial purposes without permission :)
