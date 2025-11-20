import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Property } from "../entities/Property";
import { Tenant } from "../entities/Tenant";
import { Guarantor } from "../entities/Guarantor";
import { TenantNote } from "../entities/TenantNote";
import { GuarantorNote } from "../entities/GuarantorNote";

dotenv.config();

const useSSL = process.env.DB_HOST?.includes("amazonaws") || process.env.DB_HOST?.includes("render");

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: useSSL
    ? { rejectUnauthorized: false }
    : false,
  synchronize: false,
  logging: true,
  entities: [
    Property,
    Tenant,
    Guarantor,
    TenantNote,
    GuarantorNote,
  ],
  migrations: ["dist/migrations/**/*.js"],
  subscribers: ["dist/subscribers/**/*.js"],
});
