

import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth";
import { AppDataSource } from "./config/data-source";
import propertiesRoutes from "./routes/properties";
// import AppointmentRouter from "./routes/turnsRoutes";
const PORT = parseInt(process.env.PORT || "3004", 10);

const app: Application = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Servir imágenes estáticas
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas
app.use("/api/properties", propertiesRoutes);

app.use("/api",authRoutes)
// Inicializar la base de datos y servidor
AppDataSource.initialize()
  .then(() => {
console.log("📦 Base de datos conectada correctamente!");
    console.log("¿Base de datos conectada?", AppDataSource.isInitialized);


    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error initializing data source:", error);
  });