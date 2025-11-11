FROM node:20-slim
ENV PATH="/pnpm:$PATH"
RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml package.json .

RUN pnpm i

COPY . .

CMD [ "pnpm", "dev", "--host" ]
