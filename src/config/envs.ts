import "dotenv/config";
import dotenv from "dotenv";
// Configuramos dotenv para usar un archivo de entorno específico
dotenv.config({ path: "./src/config/.env" });
export const PORT = Number(process.env.PORT) || 3000;
export const PROTO = process.env.PROTO || "http";
export const HOST = process.env.HOST || "localhost";
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || "Ingrid";
export const DB_PASSWORD = process.env.DB_PASSWORD || "mentagringa";
export const DB_NAME = process.env.DB_NAME || "inmo_db";
