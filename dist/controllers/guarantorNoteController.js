"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGuarantorNotes = exports.addGuarantorNote = void 0;
const data_source_1 = require("../config/data-source");
const GuarantorNote_1 = require("../entities/GuarantorNote");
const Guarantor_1 = require("../entities/Guarantor");
const addGuarantorNote = async (req, res) => {
    try {
        const { guarantorId } = req.params;
        const { tipo, contenido, autor, importante } = req.body;
        const noteRepo = data_source_1.AppDataSource.getRepository(GuarantorNote_1.GuarantorNote);
        const guarantorRepo = data_source_1.AppDataSource.getRepository(Guarantor_1.Guarantor);
        const guarantor = await guarantorRepo.findOneBy({ id: parseInt(guarantorId) });
        if (!guarantor) {
            return res.status(404).json({ message: "Guarantor not found" });
        }
        const note = noteRepo.create({
            tipo,
            contenido,
            autor,
            importante: importante === 'true',
            garante: guarantor
        });
        await noteRepo.save(note);
        return res.status(201).json(note);
    }
    catch (error) {
        console.error("Error creating guarantor note:", error);
        return res.status(500).json({ message: "Error creating guarantor note" });
    }
};
exports.addGuarantorNote = addGuarantorNote;
const getGuarantorNotes = async (req, res) => {
    try {
        const { guarantorId } = req.params;
        const noteRepo = data_source_1.AppDataSource.getRepository(GuarantorNote_1.GuarantorNote);
        const notes = await noteRepo.find({
            where: { guarantorId: parseInt(guarantorId) },
            order: { fechaCreacion: "DESC" }
        });
        return res.status(200).json(notes);
    }
    catch (error) {
        console.error("Error fetching guarantor notes:", error);
        return res.status(500).json({ message: "Error fetching guarantor notes" });
    }
};
exports.getGuarantorNotes = getGuarantorNotes;
