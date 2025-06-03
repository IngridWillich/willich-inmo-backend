import { Router } from "express";
import usersRoutes from "./usersRoutes";
// import turnsRoutes from "./turnsRoutes";

const router = Router();

router.use("/users", usersRoutes); //bien
// router.use("/Appointments", turnsRoutes);

export default router;
