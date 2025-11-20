import { ILike, Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Property } from "../entities/Property";

export async function addPropertyWithImages(data: {
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  images: File[]; 
}) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("price", String(data.price));
  formData.append("location", data.location);
  formData.append("bedrooms", String(data.bedrooms));
  formData.append("bathrooms", String(data.bathrooms));
  formData.append("area", String(data.area));
  formData.append("description", data.description);

  data.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await fetch("http://localhost:3004/api/properties", {
    method: "POST",
    body: formData, 
  });

  if (!response.ok) {
    throw new Error("Failed to add property");
  }

  return await response.json();
}


// DELETE property
export async function deleteProperty(id: number, token: string) {
  const response = await fetch(`http://localhost:3004/api/properties/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete property");
  }

  return await response.json();
}

// UPDATE property
export async function updateProperty(
  id: number,
  data: {
    title?: string;
    price?: number;
    location?: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    description?: string;
    tipo?: string;
    estado?:string;
    images?: File[];
  },
  token: string
) {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.price) formData.append("price", String(data.price));
  if (data.location) formData.append("location", data.location);
  if (data.bedrooms) formData.append("bedrooms", String(data.bedrooms));
  if (data.bathrooms) formData.append("bathrooms", String(data.bathrooms));
  //if (data.area) formData.append("area", data.area);
  if (data.description) formData.append("description", data.description);
  if (data.tipo) formData.append("tipo", data.tipo);
  if (data.estado) formData.append("estado", data.estado);

  if (data.images) {
    data.images.forEach((img) => {
      formData.append("images", img);
    });
  }

  const response = await fetch(
    `http://localhost:3004/api/properties/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update property");
  }

  return await response.json();
}





///
export async function searchPropertiesService(queryParams: any) {
  const {
    query,
    type,
    bedrooms,
    bathrooms,
  } = queryParams;

  const repo = AppDataSource.getRepository(Property);
  const where: any[] = [];

  if (query) {
    const searchValue = `%${query}%`;
    where.push(
      { title: ILike(searchValue) },
      { description: ILike(searchValue) },
      { location: ILike(searchValue) },

    );
  }

  const filterConditions: any = {};
  if (type) filterConditions.tipo = type;
  const bedroomsNumber = parseInt(bedrooms);
const bathroomsNumber = parseInt(bathrooms);

if (!isNaN(bedroomsNumber)) {
  filterConditions.bedrooms = MoreThanOrEqual(bedroomsNumber);
}
if (!isNaN(bathroomsNumber)) {
  filterConditions.bathrooms = MoreThanOrEqual(bathroomsNumber);
}
  
  let results;
  if (where.length > 0) {
    results = await repo.find({
      where: where.map(condition => ({ ...condition, ...filterConditions })),
    });
  } else {
    results = await repo.find({
      where: filterConditions,
    });
  }

  return results;
}