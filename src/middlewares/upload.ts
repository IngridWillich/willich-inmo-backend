import multer from "multer";
import path from "path";
import fs from "fs";


const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`📁 Created uploads directory: ${uploadDir}`);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📥 Saving file to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const sanitized = originalname
    .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '') 
      .replace(/[^a-zA-Z0-9\._-]/g, '_'); 
    const newFilename = `${Date.now()}-${file.originalname}`;
    console.log(`📂 Generated filename: ${sanitized}`);
    cb(null, newFilename);
  }
});

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

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter,
});

export default upload;