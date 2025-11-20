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

export const addProperty = (
  title: string,
  price: string,
  location: string,
  bedrooms: number,
  bathrooms: number,
  area: string,
  description: string,
  imageSrc: string[], 
  
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
    imageSrc, 
   

  };

  properties.push(newProperty);
  return newProperty;
};
