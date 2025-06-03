"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
const router = (0, express_1.Router)();
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === constants_1.USERNAME && password === constants_1.PASSWORD) {
        const token = jsonwebtoken_1.default.sign({ role: "admin" }, constants_1.SECRET_KEY, { expiresIn: "48h" });
        return res.json({ token });
    }
    else {
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }
});
exports.default = router;
