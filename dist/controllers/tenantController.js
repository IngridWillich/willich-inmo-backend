"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTenant = exports.getTenantById = exports.getTenants = exports.addTenant = void 0;
const data_source_1 = require("../config/data-source");
const Tenant_1 = require("../entities/Tenant");
const Property_1 = require("../entities/Property");
const addTenant = async (req, res) => {
    try {
        const { nombre, apellido, dni, email, telefono, fechaNacimiento, direccionActual, ocupacion, ingresoMensual, estadoPago, desempenio, fechaIngreso, propertyId, observacionesGenerales, quejasVecinos, problemasMantenimiento, incumplimientosNormas, observacionesConducta, tieneSanciones, sancionesAplicadas, deudaAcumulada } = req.body;
        const tenantRepo = data_source_1.AppDataSource.getRepository(Tenant_1.Tenant);
        const propertyRepo = data_source_1.AppDataSource.getRepository(Property_1.Property);
        const property = await propertyRepo.findOneBy({ id: propertyId });
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        // Crear el objeto tenant sin usar entityLike
        const tenant = new Tenant_1.Tenant();
        tenant.nombre = nombre;
        tenant.apellido = apellido;
        tenant.dni = dni;
        tenant.email = email;
        tenant.telefono = telefono;
        tenant.fechaNacimiento = new Date(fechaNacimiento);
        tenant.direccionActual = direccionActual;
        tenant.ocupacion = ocupacion;
        tenant.ingresoMensual = parseFloat(ingresoMensual);
        tenant.estadoPago = estadoPago;
        tenant.desempenio = desempenio;
        tenant.fechaIngreso = fechaIngreso ? new Date(fechaIngreso) : null;
        tenant.propiedad = property;
        tenant.observacionesGenerales = observacionesGenerales;
        tenant.quejasVecinos = quejasVecinos;
        tenant.problemasMantenimiento = problemasMantenimiento;
        tenant.incumplimientosNormas = incumplimientosNormas;
        tenant.observacionesConducta = observacionesConducta;
        tenant.tieneSanciones = tieneSanciones === 'true';
        tenant.sancionesAplicadas = sancionesAplicadas;
        tenant.deudaAcumulada = parseFloat(deudaAcumulada) || 0;
        await tenantRepo.save(tenant);
        // Cambiar estado de la propiedad a "alquilado"
        property.estado = "alquilado"; // Type assertion temporal
        await propertyRepo.save(property);
        return res.status(201).json(tenant);
    }
    catch (error) {
        console.error("Error creating tenant:", error);
        return res.status(500).json({ message: "Error creating tenant" });
    }
};
exports.addTenant = addTenant;
const getTenants = async (req, res) => {
    try {
        const tenantRepo = data_source_1.AppDataSource.getRepository(Tenant_1.Tenant);
        const tenants = await tenantRepo.find({
            relations: ["propiedad", "garantes", "notas"]
        });
        return res.status(200).json(tenants);
    }
    catch (error) {
        console.error("Error fetching tenants:", error);
        return res.status(500).json({ message: "Error fetching tenants" });
    }
};
exports.getTenants = getTenants;
const getTenantById = async (req, res) => {
    try {
        const tenantId = parseInt(req.params.id);
        const tenantRepo = data_source_1.AppDataSource.getRepository(Tenant_1.Tenant);
        const tenant = await tenantRepo.findOne({
            where: { id: tenantId },
            relations: ["propiedad", "garantes", "notas"]
        });
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }
        return res.status(200).json(tenant);
    }
    catch (error) {
        console.error("Error fetching tenant:", error);
        return res.status(500).json({ message: "Error fetching tenant" });
    }
};
exports.getTenantById = getTenantById;
const updateTenant = async (req, res) => {
    try {
        const tenantId = parseInt(req.params.id);
        const tenantRepo = data_source_1.AppDataSource.getRepository(Tenant_1.Tenant);
        const tenant = await tenantRepo.findOneBy({ id: tenantId });
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }
        const updates = req.body;
        // Procesar fechas
        if (updates.fechaNacimiento)
            tenant.fechaNacimiento = new Date(updates.fechaNacimiento);
        if (updates.fechaIngreso)
            tenant.fechaIngreso = updates.fechaIngreso ? new Date(updates.fechaIngreso) : null;
        // Procesar números
        if (updates.ingresoMensual)
            tenant.ingresoMensual = parseFloat(updates.ingresoMensual);
        if (updates.deudaAcumulada)
            tenant.deudaAcumulada = parseFloat(updates.deudaAcumulada);
        // Procesar booleanos
        if (updates.tieneSanciones !== undefined) {
            tenant.tieneSanciones = updates.tieneSanciones === 'true';
        }
        // Actualizar otros campos
        if (updates.nombre)
            tenant.nombre = updates.nombre;
        if (updates.apellido)
            tenant.apellido = updates.apellido;
        if (updates.dni)
            tenant.dni = updates.dni;
        if (updates.email)
            tenant.email = updates.email;
        if (updates.telefono)
            tenant.telefono = updates.telefono;
        if (updates.direccionActual)
            tenant.direccionActual = updates.direccionActual;
        if (updates.ocupacion)
            tenant.ocupacion = updates.ocupacion;
        if (updates.estadoPago)
            tenant.estadoPago = updates.estadoPago;
        if (updates.desempenio)
            tenant.desempenio = updates.desempenio;
        if (updates.observacionesGenerales !== undefined)
            tenant.observacionesGenerales = updates.observacionesGenerales;
        if (updates.quejasVecinos !== undefined)
            tenant.quejasVecinos = updates.quejasVecinos;
        if (updates.problemasMantenimiento !== undefined)
            tenant.problemasMantenimiento = updates.problemasMantenimiento;
        if (updates.incumplimientosNormas !== undefined)
            tenant.incumplimientosNormas = updates.incumplimientosNormas;
        if (updates.observacionesConducta !== undefined)
            tenant.observacionesConducta = updates.observacionesConducta;
        if (updates.sancionesAplicadas !== undefined)
            tenant.sancionesAplicadas = updates.sancionesAplicadas;
        await tenantRepo.save(tenant);
        return res.status(200).json(tenant);
    }
    catch (error) {
        console.error("Error updating tenant:", error);
        return res.status(500).json({ message: "Error updating tenant" });
    }
};
exports.updateTenant = updateTenant;
