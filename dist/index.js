"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const data_source_1 = require("./config/data-source");
const properties_1 = __importDefault(require("./routes/properties"));
// import AppointmentRouter from "./routes/turnsRoutes";
const PORT = parseInt(process.env.PORT || "3004", 10);
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Servir imágenes estáticas
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Rutas
app.use("/api/properties", properties_1.default);
app.use("/api", auth_1.default);
// Inicializar la base de datos y servidor
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
