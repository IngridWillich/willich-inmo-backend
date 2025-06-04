// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { Property } from "../entities/Property";7


// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: process.env.DB_HOST || "localhost",
//     port: Number(process.env.DB_PORT) || 5432,
//     username: process.env.DB_USER || "postgres",
//     password: process.env.DB_PASSWORD ||"mentagringa",
//     database: process.env.DB_NAME || "inmo_db",
//     synchronize: false, 
//     logging: true,
//     entities: [Property],
//     migrations: ["src/migrations/**/*.ts"],
//     subscribers: ["src/subscribers/**/*.ts"],
// });


import "reflect-metadata";
import { DataSource } from "typeorm";
import { Property } from "../entities/Property";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    synchronize: false,
    logging: true,
    entities: [Property],
    migrations: ["dist/migrations/**/*.js"],
    subscribers: ["dist/subscribers/**/*.js"],
});