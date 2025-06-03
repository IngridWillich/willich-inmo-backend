

import { Router, Request, Response } from "express";
import { properties } from "../bd/properties";
import upload from "../middlewares/upload"; 
import { AppDataSource } from "../config/data-source";
import { Property } from "../entities/Property";
import { addProperty,deleteProperty,getProperties, searchProperties, updateProperty } from "../controllers/propertyController";
import { verifyToken } from "../middlewares/authMiddleware";


const router = Router();

// Obtener todas las propiedades
router.get("/", getProperties);
// Agregar propiedad con imágenes (único endpoint para crear propiedades)
router.post("/",verifyToken ,upload.array("images", 30), addProperty )
// Editar
router.put("/:id", verifyToken, upload.array("images", 30), updateProperty);
// Eliminar
router.delete("/:id", verifyToken, deleteProperty);
// Buscar
router.get("/search", searchProperties);


export default router;
