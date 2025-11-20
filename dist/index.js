"use strict";
// import express, { Application } from "express";
// import cors from "cors";
// import morgan from "morgan";
// import path from "path";
// import authRoutes from "./routes/auth";
// import { AppDataSource } from "./config/data-source";
// import propertiesRoutes from "./routes/properties";
// import tenantsRoutes from "./routes/tenants";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const PORT = parseInt(process.env.PORT || "3004", 10);
// const app: Application = express();
// app.use(cors());
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use("/api/tenants", tenantsRoutes);
// app.use("/api/properties", propertiesRoutes);
// app.use("/api",authRoutes)
// console.log("🔍 Variables de entorno:");
// console.log({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });
// AppDataSource.initialize()
//   .then(() => {
// console.log("📦 Base de datos conectada correctamente!");
//     console.log("¿Base de datos conectada?", AppDataSource.isInitialized);
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error initializing data source:", error);
//   });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // 👈 Esto TIENE que ir antes de cualquier acceso a process.env
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const data_source_1 = require("./config/data-source");
const properties_1 = __importDefault(require("./routes/properties"));
const tenants_1 = __importDefault(require("./routes/tenants"));
const PORT = parseInt(process.env.PORT || "3004", 10);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/api/tenants", tenants_1.default);
app.use("/api/properties", properties_1.default);
app.use("/api", auth_1.default);
console.log("🔍 Variables de entorno:");
console.log({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Base de datos conectada correctamente!");
    console.log("¿Base de datos conectada?", data_source_1.AppDataSource.isInitialized);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("Error initializing data source:", error);
});
