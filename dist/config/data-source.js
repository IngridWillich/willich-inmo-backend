"use strict";
// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { Property } from "../entities/Property";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     ssl: true,
//     extra: {
//         ssl: {
//             rejectUnauthorized: false
//         }
//     },
//     synchronize: false,
//     logging: true,
//     entities: [Property],
//     migrations: ["dist/migrations/**/*.js"],
//     subscribers: ["dist/subscribers/**/*.js"],
// });
// //esto es la version anterior, funciona sin lo nuevo de la bd
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
// Entities
const Property_1 = require("../entities/Property");
const Tenant_1 = require("../entities/Tenant");
const Guarantor_1 = require("../entities/Guarantor");
const TenantNote_1 = require("../entities/TenantNote");
const GuarantorNote_1 = require("../entities/GuarantorNote");
dotenv_1.default.config();
const useSSL = process.env.DB_HOST?.includes("amazonaws") || process.env.DB_HOST?.includes("render");
exports.AppDataSource = new typeorm_1.DataSource({
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
        Property_1.Property,
        Tenant_1.Tenant,
        Guarantor_1.Guarantor,
        TenantNote_1.TenantNote,
        GuarantorNote_1.GuarantorNote,
    ],
    migrations: ["dist/migrations/**/*.js"],
    subscribers: ["dist/subscribers/**/*.js"],
});
