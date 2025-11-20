import { Router, Request, Response } from "express";
import { properties } from "../bd/properties";
import upload from "../middlewares/upload"; 
import { AppDataSource } from "../config/data-source";
import { Property } from "../entities/Property";
import { addProperty,deleteProperty,getProperties, searchProperties, updateProperty } from "../controllers/propertyController";
import { verifyToken } from "../middlewares/authMiddleware";


const router = Router();

router.get("/", getProperties);

router.post("/",verifyToken ,upload.array("images", 30), addProperty )

router.put("/:id", verifyToken, upload.array("images", 30), updateProperty);

router.delete("/:id", verifyToken, deleteProperty);

router.get("/search", searchProperties);


export default router;
