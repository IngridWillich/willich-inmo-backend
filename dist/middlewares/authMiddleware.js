"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Token requerido" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, constants_1.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: "Token inválido" });
    }
}
