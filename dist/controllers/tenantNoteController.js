"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNoteAsResolved = exports.getTenantNotes = exports.addTenantNote = void 0;
const data_source_1 = require("../config/data-source");
const TenantNote_1 = require("../entities/TenantNote");
const Tenant_1 = require("../entities/Tenant");
const addTenantNote = async (req, res) => {
    try {
        const { tenantId } = req.params;
        const { tipo, contenido, autor, requiereAccion } = req.body;
        const noteRepo = data_source_1.AppDataSource.getRepository(TenantNote_1.TenantNote);
        const tenantRepo = data_source_1.AppDataSource.getRepository(Tenant_1.Tenant);
        const tenant = await tenantRepo.findOneBy({ id: parseInt(tenantId) });
        if (!tenant) {
            return res.status(404).json({ message: "Tenant not found" });
        }
        const note = noteRepo.create({
            tipo,
            contenido,
            autor,
            requiereAccion: requiereAccion === 'true',
            inquilino: tenant
        });
        await noteRepo.save(note);
        return res.status(201).json(note);
    }
    catch (error) {
        console.error("Error creating tenant note:", error);
        return res.status(500).json({ message: "Error creating tenant note" });
    }
};
exports.addTenantNote = addTenantNote;
const getTenantNotes = async (req, res) => {
    try {
        const { tenantId } = req.params;
        const noteRepo = data_source_1.AppDataSource.getRepository(TenantNote_1.TenantNote);
        const notes = await noteRepo.find({
            where: { tenantId: parseInt(tenantId) },
            order: { fechaCreacion: "DESC" }
        });
        return res.status(200).json(notes);
    }
    catch (error) {
        console.error("Error fetching tenant notes:", error);
        return res.status(500).json({ message: "Error fetching tenant notes" });
    }
};
exports.getTenantNotes = getTenantNotes;
const markNoteAsResolved = async (req, res) => {
    try {
        const { noteId } = req.params;
        const noteRepo = data_source_1.AppDataSource.getRepository(TenantNote_1.TenantNote);
        const note = await noteRepo.findOneBy({ id: parseInt(noteId) });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        note.resuelto = true;
        note.fechaResolucion = new Date();
        await noteRepo.save(note);
        return res.status(200).json(note);
    }
    catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({ message: "Error updating note" });
    }
};
exports.markNoteAsResolved = markNoteAsResolved;
