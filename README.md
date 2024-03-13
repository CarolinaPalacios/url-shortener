# 🔗 URL Shortener

**Developed with:**

[![NestJS](https://img.shields.io/badge/NestJS-gray?style=for-the-badge&logo=nestjs&logoColor=e0234e)](https://nestjs.com/) [![Docker](https://img.shields.io/badge/Docker-gray?style=for-the-badge&logo=docker&logoColor=007acc)](https://www.docker.com) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-gray?style=for-the-badge&logo=postgresql&logoColor=007acc)](https://www.postgresql.org) [![TypeOrm](https://img.shields.io/badge/TypeORM-gray?style=for-the-badge&logo=typeorm&logoColor=007acc)](https://typeorm.io) [![TypeScript](https://img.shields.io/badge/TypeScript-gray?style=for-the-badge&logo=typescript&logoColor=007acc)](https://www.typescriptlang.org)

[![codecov](https://codecov.io/gh/CarolinaPalacios/url-shortener/branch/main/graph/badge.svg)](https://codecov.io/gh/CarolinaPalacios/url-shortener)
[![CI/CD](https://github.com/CarolinaPalacios/url-shortener/actions/workflows/ci.yml/badge.svg)](https://github.com/CarolinaPalacios/url-shortener/actions/workflows/ci.yml)

## ⭐ Quick Start

### Prerequisites

Before getting started, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/): Make sure you have Node.js 20 LTS or later installed.
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Pnpm](https://pnpm.io/installation): This project uses pnpm as the package manager. Once you have installed Node.js, you can install pnpm globally by running:

```bash
npm install -g pnpm
```

- [NestJS](https://nestjs.com/): NestJS is used as the backend framework for this project. You can install NestJS globally by running:

```bash
npm install -g @nestjs/cli
```

This will install the NestJS command-line interface globally on your machine, allowing you to use it to generate NestJS projects and components.
Alternatively, if you prefer not to install NestJS globally, this project have it already installed as a development dependency in your package.json file. You can use it as well by running `npx nest` instead of `nest`.

## 💾 Installation and Setup

[Clone the repository](https://github.com/CarolinaPalacios/url-shortener): Clone, download or fork this repository to your local machine.

```bash
# Clone the repository
git clone https://github.com/CarolinaPalacios/url-shortener.git

# Navigate to the directory
cd url-shortener

# Install dependencies
pnpm install --frozen-lockfile
```

[Build and run the Docker image](): Build and run the Docker image.

```bash
pnpm docker-compose:dev
```

This will initialize the Docker container with a PostgreSQL database. Note that PostgreSQL will start on port 5432. If you want to change the port, you can modify the [docker-compose.yml](docker-compose.yml), the [stage.prod.env](stage.prod.env) and the [stage.dev.env](stage.dev.env), or if you're on Linux, you can temporarily stop the PostgreSQL service with the following command in the terminal:

```bash
   sudo service postgresql stop
```

Please note that this command stops the PostgreSQL service only temporarily.

[Visit the website](): Visit the website at http://localhost:3000, the server should be up and running.

Make file changes and it will automatically rebuild the app.

## 🧪 Running Tests

#### [Running All Tests]():

```bash
pnpm docker-compose:test
```

#### [Running All Tests (with coverage)]():

```bash
pnpm docker-compose:test:cov
```

#### [Running Tests (Watch)]():

1. Build and run the Docker image.

```bash
pnpm docker-compose:test:watch
```

2. Make file changes and it will automatically rerun tests related to changed files.

## 🚀 Build For Production

```bash
pnpm docker-compose:prod
```
