

import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Property } from "../entities/Property";
import { ILike, Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import { searchPropertiesService } from "../services/propertyService";


export const addProperty = async (req: Request, res: Response) => {
  try {
    console.log("Received request to add property with images.");
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);

    const { title, price, location, bedrooms, bathrooms, area, description,tipo,estado } = req.body;
    

    if (!title || !price || !location || !bedrooms || !bathrooms || !area || !description  ) {
      console.error("Error: Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }



    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      console.error("Error: No images uploaded");
      return res.status(400).json({ message: "At least one image is required" });
    }
    const imageSrc = (req.files as Express.Multer.File[]).map(file => `/uploads/${file.filename}`);

    const propertyRepo = AppDataSource.getRepository(Property);
    const property = propertyRepo.create({
      title,
      price,
      location,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      area,
      description,
      imageSrc,
      tipo: tipo || "venta",  
      estado:estado || "disponible"
    });


    await propertyRepo.save(property);

    console.log("New property saved:", property);

    return res.status(201).json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    return res.status(500).json({ message: "Error creating property" });
  }
};


export const getProperties = async (req: Request, res: Response) => {
  try {
    const propertyRepository = AppDataSource.getRepository(Property);
    const properties = await propertyRepository.find(); 
    console.log("Properties fetched:", properties);
    return res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ message: "Error fetching properties" });
  }
};

// DELETE property
export const deleteProperty = async (req: Request, res: Response) => {
    try {
      const propertyId = parseInt(req.params.id);
      const propertyRepo = AppDataSource.getRepository(Property);
  
      const property = await propertyRepo.findOneBy({ id: propertyId });
  
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
  
      await propertyRepo.remove(property);
      return res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
      console.error("Error deleting property:", error);
      return res.status(500).json({ message: "Error deleting property" });
    }
  };
  
  // PUT (edit) property
  export const updateProperty = async (req: Request, res: Response) => {
    try {
      const propertyId = parseInt(req.params.id);
      const propertyRepo = AppDataSource.getRepository(Property);
  
      const property = await propertyRepo.findOneBy({ id: propertyId });
  
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
  
      const {
        title,
        price,
        location,
        bedrooms,
        bathrooms,
        area,
        description,
        tipo,
        estado
      } = req.body;
  
      // actualiza los campos si vienen nuevos valores
      property.title = title || property.title;
      property.price = price || property.price;
      property.location = location || property.location;
      property.bedrooms = bedrooms ? parseInt(bedrooms) : property.bedrooms;
      property.bathrooms = bathrooms ? parseInt(bathrooms) : property.bathrooms;
      property.area = area || property.area;
      property.description = description || property.description;
      property.tipo = tipo || property.tipo;
      property.estado = estado || property.estado;

  
      // si hay nuevas imágenes
      if (req.files && (req.files as Express.Multer.File[]).length > 0) {
        const imageSrc = (req.files as Express.Multer.File[]).map(
          (file) => `/uploads/${file.filename}`
        );
        property.imageSrc = imageSrc;
      }
  
      await propertyRepo.save(property);
      return res.status(200).json({ message: "Property updated", property });
    } catch (error) {
      console.error("Error updating property:", error);
      return res.status(500).json({ message: "Error updating property" });
    }
  };
  
  /////////////////

  export const searchProperties = async (req: Request, res: Response) => {
    try {
      const results = await searchPropertiesService(req.query);
      return res.status(200).json(results);
    } catch (error) {
      console.error("Error en búsqueda de propiedades:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };


