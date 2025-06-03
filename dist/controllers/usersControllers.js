"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getUserById = exports.getUsers = void 0;
const usersService_1 = require("../services/usersService");
const credentialsService_1 = require("../services/credentialsService");
const getUsers = async (req, res) => {
    try {
        const users = await (0, usersService_1.getUsersService)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, usersService_1.getUserByIdService)(Number(id));
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: "User not found" });
    }
};
exports.getUserById = getUserById;
const registerUser = async (req, res) => {
    try {
        const { name, email, birthDate, dni, username, password } = req.body;
        const newUser = await (0, usersService_1.createUserService)({
            name,
            email,
            birthDate,
            dni,
            username,
            password
        });
        res.status(201).json({ message: "El usuario ha sido creado con éxito", user: newUser });
    }
    catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Datos recibidos para login:", { username, password });
        const credential = await (0, credentialsService_1.validateCredentials)(username, password);
        const user = await (0, usersService_1.getUserByIdService)(credential.id); // debería ser con findUserByCredentialId
        res.status(200).json({
            loggin: true,
            user
        });
    }
    catch (error) {
        console.error("Error en loginUser:", error.message);
        res.status(404).send(error.message);
    }
};
exports.loginUser = loginUser;
