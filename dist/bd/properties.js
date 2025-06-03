"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProperty = exports.properties = void 0;
exports.properties = [];
// Función para agregar una nueva propiedad con múltiples imágenes
const addProperty = (title, price, location, bedrooms, bathrooms, area, description, imageSrc) => {
    const newProperty = {
        id: exports.properties.length + 1,
        title,
        price,
        location,
        bedrooms,
        bathrooms,
        area,
        description,
        imageSrc, // Ahora es un array de imágenes
    };
    exports.properties.push(newProperty);
    return newProperty;
};
exports.addProperty = addProperty;
