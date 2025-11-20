"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/tenants.ts
const express_1 = require("express");
const tenantController_1 = require("../controllers/tenantController");
const guarantorController_1 = require("../controllers/guarantorController");
const tenantNoteController_1 = require("../controllers/tenantNoteController");
const guarantorNoteController_1 = require("../controllers/guarantorNoteController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Rutas para inquilinos
router.post("/", authMiddleware_1.verifyToken, tenantController_1.addTenant);
router.get("/", authMiddleware_1.verifyToken, tenantController_1.getTenants);
router.get("/:id", authMiddleware_1.verifyToken, tenantController_1.getTenantById);
router.put("/:id", authMiddleware_1.verifyToken, tenantController_1.updateTenant);
// Rutas para garantes
router.post("/:tenantId/guarantors", authMiddleware_1.verifyToken, guarantorController_1.addGuarantor);
router.get("/guarantors/all", authMiddleware_1.verifyToken, guarantorController_1.getGuarantors);
// Rutas para notas de inquilinos
router.post("/:tenantId/notes", authMiddleware_1.verifyToken, tenantNoteController_1.addTenantNote);
router.get("/:tenantId/notes", authMiddleware_1.verifyToken, tenantNoteController_1.getTenantNotes);
router.put("/notes/:noteId/resolve", authMiddleware_1.verifyToken, tenantNoteController_1.markNoteAsResolved);
// Rutas para notas de garantes
router.post("/guarantors/:guarantorId/notes", authMiddleware_1.verifyToken, guarantorNoteController_1.addGuarantorNote);
router.get("/guarantors/:guarantorId/notes", authMiddleware_1.verifyToken, guarantorNoteController_1.getGuarantorNotes);
router.get("/test", (req, res) => {
    res.json({ message: "✅ Tenants route working!" });
});
exports.default = router;
