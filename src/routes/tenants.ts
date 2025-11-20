import { Router } from "express";
import { addTenant, getTenants, getTenantById, updateTenant } from "../controllers/tenantController";
import { addGuarantor, getGuarantors } from "../controllers/guarantorController";
import { addTenantNote, getTenantNotes, markNoteAsResolved } from "../controllers/tenantNoteController";
import { addGuarantorNote, getGuarantorNotes } from "../controllers/guarantorNoteController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", verifyToken, addTenant);
router.get("/", verifyToken, getTenants);
router.get("/:id", verifyToken, getTenantById);
router.put("/:id", verifyToken, updateTenant);
router.post("/:tenantId/guarantors", verifyToken, addGuarantor);
router.get("/guarantors/all", verifyToken, getGuarantors);
router.post("/:tenantId/notes", verifyToken, addTenantNote);
router.get("/:tenantId/notes", verifyToken, getTenantNotes);
router.put("/notes/:noteId/resolve", verifyToken, markNoteAsResolved);
router.post("/guarantors/:guarantorId/notes", verifyToken, addGuarantorNote);
router.get("/guarantors/:guarantorId/notes", verifyToken, getGuarantorNotes);
export default router;