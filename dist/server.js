"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const Property_1 = require("./entities/Property");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("./config/constants");
const authMiddleware_1 = require("./middlewares/authMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas de la API para las citas
// Rutas para los usuarios
app.get("/api/properties", async (req, res) => {
    try {
        const propertyRepo = data_source_1.AppDataSource.getRepository(Property_1.Property);
        const properties = await propertyRepo.find();
        res.json(properties);
    }
    catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === constants_1.USERNAME && password === constants_1.PASSWORD) {
        const token = jsonwebtoken_1.default.sign({ role: "admin" }, constants_1.SECRET_KEY, { expiresIn: "48h" });
        return res.json({ token });
    }
    else {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }
});
app.post("/api/properties", authMiddleware_1.verifyToken, async (req, res) => {
    try {
        const { title, description, price, location, area, bedrooms, bathrooms, imageSrc } = req.body;
        if (!title || !description || !price || !location || !bedrooms || !bathrooms || !area) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (isNaN(price) || isNaN(area) || isNaN(bedrooms) || isNaN(bathrooms)) {
            return res.status(400).json({ message: "Price, area, bedrooms, and bathrooms must be numbers" });
        }
        const propertyRepo = data_source_1.AppDataSource.getRepository(Property_1.Property);
        const newProperty = propertyRepo.create({
            title,
            description,
            bathrooms,
            bedrooms,
            area,
            price,
            location,
            imageSrc,
        });
        await propertyRepo.save(newProperty);
        res.status(201).json({ message: "Property created successfully", property: newProperty });
    }
    catch (error) {
        console.error("Error saving property:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
app.put("/api/properties/:id", authMiddleware_1.verifyToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, area, bedrooms, bathrooms, imageSrc } = req.body;
    try {
        const propertyRepo = data_source_1.AppDataSource.getRepository(Property_1.Property);
        const property = await propertyRepo.findOneBy({ id: parseInt(id) });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        property.title = title;
        property.description = description;
        property.price = price;
        property.location = location;
        property.area = area;
        property.bedrooms = bedrooms;
        property.bathrooms = bathrooms;
        property.imageSrc = imageSrc;
        await propertyRepo.save(property);
        res.json({ message: "Property updated successfully", property });
    }
    catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
app.delete("/api/properties/:id", authMiddleware_1.verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const propertyRepo = data_source_1.AppDataSource.getRepository(Property_1.Property);
        const property = await propertyRepo.findOneBy({ id: parseInt(id) });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        await propertyRepo.remove(property);
        res.json({ message: "Property deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
////////////////////////hasta aca funcionando 
////searchbar con filtros
exports.default = app;
