import { Request, Response } from "express";
import {
    getUsersService,
    getUserByIdService,
    createUserService
} from "../services/usersService";
import { validateCredentials } from "../services/credentialsService";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(Number(id));
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, birthDate, dni, username, password } = req.body;
        const newUser = await createUserService({
            name,
            email,
            birthDate,
            dni,
            username,
            password
        });
        res.status(201).json({ message: "El usuario ha sido creado con éxito", user: newUser });
    } catch (error) {
        res.status(400).json({ message: "Internal Server Error" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        console.log("Datos recibidos para login:", { username, password });
        const credential = await validateCredentials(username, password);
        const user = await getUserByIdService(credential.id); 
        res.status(200).json({
            loggin: true,
            user
        });
    } catch (error: any) {
        console.error("Error en loginUser:", error.message);
        res.status(404).send(error.message);
    }
};
