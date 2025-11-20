import express, { Express } from 'express';
import cors from 'cors';
import { PORT } from './config/envs';
import { AppDataSource } from "./config/data-source";
import { Property } from "./entities/Property";
import jwt from "jsonwebtoken";
import { USERNAME,PASSWORD,SECRET_KEY } from "./config/constants";
import { verifyToken } from './middlewares/authMiddleware';


import { getUsers, getUserById, registerUser, loginUser } from './controllers/usersControllers';
import { searchProperties } from './controllers/propertyController';



const app: Express = express();


app.use(cors());
app.use(express.json());






app.get("/api/properties", async (req, res) => {
  try {
    const propertyRepo = AppDataSource.getRepository(Property);
    const properties = await propertyRepo.find();
    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ role: "admin" },SECRET_KEY, { expiresIn: "48h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }
});


app.post("/api/properties", verifyToken,async (req, res) => {
  try {
    const { title, description, price, location, area, bedrooms, bathrooms, imageSrc } = req.body;

    if (!title || !description || !price || !location || !bedrooms || !bathrooms || !area) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(price) || isNaN(area) || isNaN(bedrooms) || isNaN(bathrooms)) {
      return res.status(400).json({ message: "Price, area, bedrooms, and bathrooms must be numbers" });
    }

    const propertyRepo = AppDataSource.getRepository(Property);

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
  } catch (error) {
    console.error("Error saving property:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


app.put("/api/properties/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, area, bedrooms, bathrooms, imageSrc } = req.body;

  try {
    const propertyRepo = AppDataSource.getRepository(Property);
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
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



app.delete("/api/properties/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const propertyRepo = AppDataSource.getRepository(Property);
    const property = await propertyRepo.findOneBy({ id: parseInt(id) });

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await propertyRepo.remove(property);

    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ message: "Server error", error });
  }
});



export default app;


