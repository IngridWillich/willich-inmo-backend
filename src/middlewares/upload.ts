


import multer from "multer";
import path from "path";
import fs from "fs";

// Directorio donde se guardarán las imágenes
const uploadDir = path.join(__dirname, "../../uploads");

// Asegurar que la carpeta "uploads" existe
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`📁 Created uploads directory: ${uploadDir}`);
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📥 Saving file to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const sanitized = originalname
    .normalize('NFD') // Descomponer caracteres acentuados
      .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
      .replace(/[^a-zA-Z0-9\._-]/g, '_'); // Reemplazar otros caracteres especiales
    const newFilename = `${Date.now()}-${file.originalname}`;
    console.log(`📂 Generated filename: ${sanitized}`);
    cb(null, newFilename);
  }
});

// Filtrar archivos para permitir solo imágenes
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  console.log(`📝 File received: ${file.originalname} - Type: ${file.mimetype}`);

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.error("❌ File rejected: Only images are allowed");
    cb(new Error("Only images are allowed"), false);
  }
};

// Configurar `multer`
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Máximo 10MB
  fileFilter,
});

export default upload;