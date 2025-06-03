export interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  imageSrc: string[];
}
export const properties: Property[] = [];
// Función para agregar una nueva propiedad con múltiples imágenes
export const addProperty = (
  title: string,
  price: string,
  location: string,
  bedrooms: number,
  bathrooms: number,
  area: string,
  description: string,
  imageSrc: string[], // Acepta múltiples imágenes
  
): Property => {
  const newProperty: Property = {
    id: properties.length + 1,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    description,
    imageSrc, // Ahora es un array de imágenes
   

  };

  properties.push(newProperty);
  return newProperty;
};
