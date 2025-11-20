"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uploadDir = path_1.default.join(__dirname, "../../uploads");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
    console.log(`📁 Created uploads directory: ${uploadDir}`);
}
const storage = multer_1.default.diskStorage({
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
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    console.log(`📝 File received: ${file.originalname} - Type: ${file.mimetype}`);
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        console.error("❌ File rejected: Only images are allowed");
        cb(new Error("Only images are allowed"), false);
    }
};
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter,
});
exports.default = upload;
