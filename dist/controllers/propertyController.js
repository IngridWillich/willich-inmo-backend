"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProperties = exports.updateProperty = exports.deleteProperty = exports.getProperties = exports.addProperty = void 0;
const data_source_1 = require("../config/data-source");
const Property_1 = require("../entities/Property");
const propertyService_1 = require("../services/propertyService");
const addProperty = async (req, res) => {
    try {
        console.log("Received request to add property with images.");
        console.log("Request body:", req.body);
        console.log("Uploaded files:", req.files);
        const { title, price, location, bedrooms, bathrooms, area, description, tipo, estado } = req.body;
        if (!title || !price || !location || !bedrooms || !bathrooms || !area || !description) {
            console.error("Error: Missing required fields");
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!req.files || req.files.length === 0) {
            console.error("Error: No images uploaded");
            return res.status(400).json({ message: "At least one image is required" });
        }
        const imageSrc = req.files.map(file => `/uploads/${file.filename}`);
        const propertyRepo = data_source_1.AppDataSource.getRepository(Property_1.Property);
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
            estado: estado || "disponible"
        });
        await propertyRepo.save(property);
        console.log("New property saved:", property);
        return res.status(201).json(property);
    }
    catch (error) {
        console.error("Error creating property:", error);
        return res.status(500).json({ message: "Error creating property" });
    }
};
exports.addProperty = addProperty;
const getProperties = async (req, res) => {
    try {
        const propertyRepository = data_source_1.AppDataSource.getRepository(Property_1.Property);
        const properties = await propertyRepository.find();
        console.log("Properties fetched:", properties);
        return res.status(200).json(properties);
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        return res.status(500).json({ message: "Error fetching properties" });
    }
};
exports.getProperties = getProperties;
// DELETE property
const deleteProperty = async (req, res) => {
    try {
        const propertyId = parseInt(req.params.id);
        const propertyRepo = data_source_1.AppDataSource.getRepository(Property_1.Property);
        const property = await propertyRepo.findOneBy({ id: propertyId });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        await propertyRepo.remove(property);
        return res.status(200).json({ message: "Property deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting property:", error);
        return res.status(500).json({ message: "Error deleting property" });
    }
};
exports.deleteProperty = deleteProperty;
// PUT (edit) property
const updateProperty = async (req, res) => {
    try {
        const propertyId = parseInt(req.params.id);
        const propertyRepo = data_source_1.AppDataSource.getRepository(Property_1.Property);
        const property = await propertyRepo.findOneBy({ id: propertyId });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        const { title, price, location, bedrooms, bathrooms, area, description, tipo, estado } = req.body;
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
        if (req.files && req.files.length > 0) {
            const imageSrc = req.files.map((file) => `/uploads/${file.filename}`);
            property.imageSrc = imageSrc;
        }
        await propertyRepo.save(property);
        return res.status(200).json({ message: "Property updated", property });
    }
    catch (error) {
        console.error("Error updating property:", error);
        return res.status(500).json({ message: "Error updating property" });
    }
};
exports.updateProperty = updateProperty;
/////////////////
const searchProperties = async (req, res) => {
    try {
        const results = await (0, propertyService_1.searchPropertiesService)(req.query);
        return res.status(200).json(results);
    }
    catch (error) {
        console.error("Error en búsqueda de propiedades:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.searchProperties = searchProperties;
