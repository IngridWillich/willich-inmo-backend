# Etapa 1: Compilar TypeScript
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Ejecutar app
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app/dist ./dist
COPY .env .env

CMD ["node", "dist/index.js"]
