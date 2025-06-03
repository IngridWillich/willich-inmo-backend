"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPropertyWithImages = addPropertyWithImages;
exports.deleteProperty = deleteProperty;
exports.updateProperty = updateProperty;
exports.searchPropertiesService = searchPropertiesService;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../config/data-source");
const Property_1 = require("../entities/Property");
async function addPropertyWithImages(data) {
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
async function deleteProperty(id, token) {
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
async function updateProperty(id, data, token) {
    const formData = new FormData();
    if (data.title)
        formData.append("title", data.title);
    if (data.price)
        formData.append("price", String(data.price));
    if (data.location)
        formData.append("location", data.location);
    if (data.bedrooms)
        formData.append("bedrooms", String(data.bedrooms));
    if (data.bathrooms)
        formData.append("bathrooms", String(data.bathrooms));
    if (data.area)
        formData.append("area", data.area);
    if (data.description)
        formData.append("description", data.description);
    if (data.tipo)
        formData.append("tipo", data.tipo);
    if (data.estado)
        formData.append("estado", data.estado);
    if (data.images) {
        data.images.forEach((img) => {
            formData.append("images", img);
        });
    }
    const response = await fetch(`http://localhost:3004/api/properties/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    if (!response.ok) {
        throw new Error("Failed to update property");
    }
    return await response.json();
}
///
async function searchPropertiesService(queryParams) {
    const { query, type, bedrooms, bathrooms, } = queryParams;
    const repo = data_source_1.AppDataSource.getRepository(Property_1.Property);
    const where = [];
    if (query) {
        const searchValue = `%${query}%`;
        where.push({ title: (0, typeorm_1.ILike)(searchValue) }, { description: (0, typeorm_1.ILike)(searchValue) }, { location: (0, typeorm_1.ILike)(searchValue) });
    }
    const filterConditions = {};
    if (type)
        filterConditions.tipo = type;
    const bedroomsNumber = parseInt(bedrooms);
    const bathroomsNumber = parseInt(bathrooms);
    if (!isNaN(bedroomsNumber)) {
        filterConditions.bedrooms = (0, typeorm_1.MoreThanOrEqual)(bedroomsNumber);
    }
    if (!isNaN(bathroomsNumber)) {
        filterConditions.bathrooms = (0, typeorm_1.MoreThanOrEqual)(bathroomsNumber);
    }
    let results;
    if (where.length > 0) {
        results = await repo.find({
            where: where.map(condition => ({ ...condition, ...filterConditions })),
        });
    }
    else {
        results = await repo.find({
            where: filterConditions,
        });
    }
    return results;
}
