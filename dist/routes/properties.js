"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = __importDefault(require("../middlewares/upload"));
const propertyController_1 = require("../controllers/propertyController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Obtener todas las propiedades
router.get("/", propertyController_1.getProperties);
// Agregar propiedad con imágenes (único endpoint para crear propiedades)
router.post("/", authMiddleware_1.verifyToken, upload_1.default.array("images", 30), propertyController_1.addProperty);
// Editar
router.put("/:id", authMiddleware_1.verifyToken, upload_1.default.array("images", 30), propertyController_1.updateProperty);
// Eliminar
router.delete("/:id", authMiddleware_1.verifyToken, propertyController_1.deleteProperty);
// Buscar
router.get("/search", propertyController_1.searchProperties);
exports.default = router;
