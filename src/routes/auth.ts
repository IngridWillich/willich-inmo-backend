import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { USERNAME, PASSWORD, SECRET_KEY } from "../config/constants";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ role: "admin" }, SECRET_KEY, { expiresIn: "48h" });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }
});

export default router;
