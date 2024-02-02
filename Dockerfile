FROM node:16.14.2-alpine AS base

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install -g pnpm

FROM base AS dev
ENV NODE_ENV=dev
RUN pnpm install
COPY . .
CMD ["pnpm", "run", "start:dev"]

FROM dev AS test
ENV NODE_ENV=test
CMD ["pnpm", "run", "test"]

FROM test AS test-cov
CMD ["pnpm", "run", "test:cov"]

FROM test AS test-watch
ENV GIT_WORK_TREE=/app GIT_DIR=/app/.git
RUN apk add git
CMD ["pnpm", "run", "test:watch"]

FROM base AS prod
ENV NODE_ENV=production
RUN pnpm install --frozen-lockfile --production
COPY . .
RUN pnpm global add @nestjs/cli
RUN pnpm run build
CMD ["pnpm", "run", "start:prod"]