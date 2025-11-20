"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuarantors = exports.addGuarantor = void 0;
const data_source_1 = require("../config/data-source");
const Guarantor_1 = require("../entities/Guarantor");
const Tenant_1 = require("../entities/Tenant");
const addGuarantor = async (req, res) => {
    try {
        const { tenantId } = req.params;
        const { nombre, apellido, dni, email, telefono, fechaNacimiento, direccion, ocupacion, ingresoMensual, relacionConInquilino, esGaranteDeOtro, observacionesGenerales, historialCrediticio, capacidadPagoObservaciones, garanteConfiable, motivosInconfiabilidad, observacionesDocumentacion } = req.body;
        const guarantorRepo = data_source_1.AppDataSource.getRepository(Guarantor_1.Guarantor);
        const tenantRepo = data_source_1.AppDataSource.getRepository(Tenant_1.Tenant);
        const tenant = await tenantRepo.findOneBy({ id: parseInt(tenantId) });
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }
        const guarantor = guarantorRepo.create({
            nombre,
            apellido,
            dni,
            email,
            telefono,
            fechaNacimiento: new Date(fechaNacimiento),
            direccion,
            ocupacion,
            ingresoMensual: parseFloat(ingresoMensual),
            relacionConInquilino,
            esGaranteDeOtro: esGaranteDeOtro === 'true',
            observacionesGenerales,
            historialCrediticio,
            capacidadPagoObservaciones,
            garanteConfiable: garanteConfiable === 'true',
            motivosInconfiabilidad,
            observacionesDocumentacion,
            inquilino: tenant
        });
        await guarantorRepo.save(guarantor);
        return res.status(201).json(guarantor);
    }
    catch (error) {
        console.error("Error creating guarantor:", error);
        return res.status(500).json({ message: "Error creating guarantor" });
    }
};
exports.addGuarantor = addGuarantor;
const getGuarantors = async (req, res) => {
    try {
        const guarantorRepo = data_source_1.AppDataSource.getRepository(Guarantor_1.Guarantor);
        const guarantors = await guarantorRepo.find({
            relations: ["inquilino", "notas"]
        });
        return res.status(200).json(guarantors);
    }
    catch (error) {
        console.error("Error fetching guarantors:", error);
        return res.status(500).json({ message: "Error fetching guarantors" });
    }
};
exports.getGuarantors = getGuarantors;
