import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { GuarantorNote, GuarantorNoteType } from "../entities/GuarantorNote";
import { Guarantor } from "../entities/Guarantor";

export const addGuarantorNote = async (req: Request, res: Response) => {
    try {
        const { guarantorId } = req.params;
        const { tipo, contenido, autor, importante } = req.body;

        const noteRepo = AppDataSource.getRepository(GuarantorNote);
        const guarantorRepo = AppDataSource.getRepository(Guarantor);

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
    } catch (error) {
        console.error("Error creating guarantor note:", error);
        return res.status(500).json({ message: "Error creating guarantor note" });
    }
};

export const getGuarantorNotes = async (req: Request, res: Response) => {
    try {
        const { guarantorId } = req.params;
        const noteRepo = AppDataSource.getRepository(GuarantorNote);
        
        const notes = await noteRepo.find({
            where: { guarantorId: parseInt(guarantorId) },
            order: { fechaCreacion: "DESC" }
        });

        return res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching guarantor notes:", error);
        return res.status(500).json({ message: "Error fetching guarantor notes" });
    }
};