import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Guarantor } from "../entities/Guarantor";
import { Tenant } from "../entities/Tenant";

export const addGuarantor = async (req: Request, res: Response) => {
    try {
        const { tenantId } = req.params;
        const {
            nombre,
            apellido,
            dni,
            email,
            telefono,
            fechaNacimiento,
            direccion,
            ocupacion,
            ingresoMensual,
            relacionConInquilino,
            esGaranteDeOtro,
            observacionesGenerales,
            historialCrediticio,
            capacidadPagoObservaciones,
            garanteConfiable,
            motivosInconfiabilidad,
            observacionesDocumentacion
        } = req.body;

        const guarantorRepo = AppDataSource.getRepository(Guarantor);
        const tenantRepo = AppDataSource.getRepository(Tenant);

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
    } catch (error) {
        console.error("Error creating guarantor:", error);
        return res.status(500).json({ message: "Error creating guarantor" });
    }
};

export const getGuarantors = async (req: Request, res: Response) => {
    try {
        const guarantorRepo = AppDataSource.getRepository(Guarantor);
        const guarantors = await guarantorRepo.find({
            relations: ["inquilino", "notas"]
        });
        return res.status(200).json(guarantors);
    } catch (error) {
        console.error("Error fetching guarantors:", error);
        return res.status(500).json({ message: "Error fetching guarantors" });
    }
};