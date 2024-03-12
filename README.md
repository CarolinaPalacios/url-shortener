# NestJS URL Shortener

[![codecov](https://codecov.io/gh/CarolinaPalacios/url-shortener/branch/main/graph/badge.svg)](https://codecov.io/gh/CarolinaPalacios/url-shortener)
[![CI/CD](https://github.com/CarolinaPalacios/url-shortener/actions/workflows/ci.yml/badge.svg)](https://github.com/CarolinaPalacios/url-shortener/actions/workflows/ci.yml)

## Quick Start

In the `main` branch, you will find the basic setup of the project. This includes the essential files to get started and initialize the application. Follow the steps below to set up the project in its basic form:

1. Install [Node.js](https://nodejs.org/en/download/) - _for IDE type checking_.
2. Install [Pnpm](https://pnpm.io/installation) - _for IDE type checking_.
3. Install [Docker Compose](https://docs.docker.com/compose/install/) and make sure it is running in the system background.
4. Clone the app:

```bash
git clone https://github.com/CarolinaPalacios/url-shortener.git
```

5. Install npm packages - _for IDE type checking_.

```bash
cd url-shortener
pnpm install --frozen-lockfile
```

6. Build and run the Docker image.

```bash
pnpm docker-compose:dev
```

7. Access the app at http://localhost:3000.
8. Make file changes and it will automatically rebuild the app.

## Running All Tests

```bash
pnpm docker-compose:test
```

## Running All Tests (with coverage)

```bash
pnpm docker-compose:test:cov
```

## Running Tests (Watch)

1. Build and run the Docker image.

```bash
pnpm docker-compose:test:watch
```

2. Make file changes and it will automatically rerun tests related to changed files.

## Build For Production

```bash
pnpm docker-compose:prod
```
