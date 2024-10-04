# ERP application.

## Description

A project applying SOLID principles and Test-Driven Development (TDD). This project delivers a back-end API using TypeScript, Node.js, Fastify, Prisma, and Vitest, with a focus on maintainability and efficient testing practices. It also implements a JWT (JSON Web Token) authentication system, ensuring secure and reliable user authentication, while leveraging these technologies to build a high-performance API grounded in software engineering best practices.

## Requirements

Before starting, ensure that Node.js, pnpm and docker are installed on your machine. You can download Node.js [here](https://nodejs.org/), docker [here](https://docs.docker.com/get-docker/) and install `pnpm` globally with the command:

```bash
npm install -g pnpm
```

## Cloning the Repository

In your terminal, clone the repository using the command:

```bash
git clone https://github.com/thalesantana/erp-rh-server.git
```

## Installing Dependencies

Navigate to the project directory:

```bash
cd erp-rh-server
```

## Install the project dependencies with pnpm:

```bash
pnpm install
```

## Create env file

Copy the file `env.example` and rename to `.env`

## Create Database

```bash
docker compose up -d
```

## Generate Prisma

```bash
npx prisma generate
```

## Starting the Project

To start the project in development mode, use the command:

```bash
npm run start:dev
```

## Technologies Used

- TypeScript: A superset of JavaScript that adds static typing.
- Node.js: A JavaScript runtime built on Chrome's V8 engine, used for building scalable network applications.
- Fastify: A web framework for Node.js focused on speed and low overhead, ideal for building APIs.
- Prisma: An ORM tool that simplifies database management with type-safe queries.
- Vitest: A fast and lightweight testing framework for TypeScript and JavaScript, used for unit and integration testing.
