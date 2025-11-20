import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { TenantNote } from "../entities/TenantNote";
import { Tenant } from "../entities/Tenant";

export const addTenantNote = async (req: Request, res: Response) => {
    try {
        const { tenantId } = req.params;
        const { tipo, contenido, autor, requiereAccion } = req.body;

        const noteRepo = AppDataSource.getRepository(TenantNote);
        const tenantRepo = AppDataSource.getRepository(Tenant);

        const tenant = await tenantRepo.findOneBy({ id: parseInt(tenantId) });
        if (!tenant) { return res.status(404).json({ message: "Tenant not found" });}

        const note = noteRepo.create({tipo,contenido,autor,requiereAccion: requiereAccion === 'true',inquilino: tenant });

        await noteRepo.save(note);
        return res.status(201).json(note);
    } catch (error) {
        console.error("Error creating tenant note:", error);
        return res.status(500).json({ message: "Error creating tenant note" });
    }
};

export const getTenantNotes = async (req: Request, res: Response) => {
    try {
        const { tenantId } = req.params;
        const noteRepo = AppDataSource.getRepository(TenantNote);
        
        const notes = await noteRepo.find({
            where: { tenantId: parseInt(tenantId) },
            order: { fechaCreacion: "DESC" }
        });

        return res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching tenant notes:", error);
        return res.status(500).json({ message: "Error fetching tenant notes" });
    }
};

export const markNoteAsResolved = async (req: Request, res: Response) => {
    try {
        const { noteId } = req.params;
        const noteRepo = AppDataSource.getRepository(TenantNote);
        
        const note = await noteRepo.findOneBy({ id: parseInt(noteId) });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        note.resuelto = true;
        note.fechaResolucion = new Date();
        await noteRepo.save(note);

        return res.status(200).json(note);
    } catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({ message: "Error updating note" });
    }
};