// import express, { Application } from "express";
// import cors from "cors";
// import morgan from "morgan";
// import path from "path";
// import authRoutes from "./routes/auth";
// import { AppDataSource } from "./config/data-source";
// import propertiesRoutes from "./routes/properties";
// import tenantsRoutes from "./routes/tenants";

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


import dotenv from "dotenv";
dotenv.config(); // 👈 Esto TIENE que ir antes de cualquier acceso a process.env

import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth";
import { AppDataSource } from "./config/data-source";
import propertiesRoutes from "./routes/properties";
import tenantsRoutes from "./routes/tenants";

const PORT = parseInt(process.env.PORT || "3004", 10);

const app: Application = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/tenants", tenantsRoutes);
app.use("/api/properties", propertiesRoutes);
app.use("/api", authRoutes);

console.log("🔍 Variables de entorno:");
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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
