"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Property_1 = require("../entities/Property");
7;
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "mentagringa",
    database: process.env.DB_NAME || "inmo_db",
    synchronize: false,
    logging: true,
    entities: [Property_1.Property],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: ["src/subscribers/**/*.ts"],
});
// export const UserModel= AppDataSource.getRepository(User)
// export const CredentialsModel= AppDataSource.getRepository(Credentials)
// export const AppointmentModel=  AppDataSource.getRepository(Appointment)
