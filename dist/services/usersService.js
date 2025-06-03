"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserService = exports.findUserByCredentialId = exports.getUserByIdService = exports.getUsersService = void 0;
const data_source_1 = require("../config/data-source");
const credentialsService_1 = require("./credentialsService");
let users = [{
        id: 0,
        name: "Ingrid",
        email: "willichingrid@gmail.com",
        birthdate: new Date(),
        nDni: 45757841,
        credentialId: 1,
    }];
let id = 1;
const getUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield data_source_1.UserModel.find({ relations: ["appointments"] });
    return allUsers;
});
exports.getUsersService = getUsersService;
// } 
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield data_source_1.UserModel.findOne({ where: { id }, relations: ["appointments"] });
        return user;
    }
    catch (error) {
        throw new Error("User not found");
    }
});
exports.getUserByIdService = getUserByIdService;
const findUserByCredentialId = (credentialId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield data_source_1.UserModel.findOneBy({
        credentials: { id: credentialId }
    });
    if (!user)
        throw new Error("Usuario no encontrado");
    return user;
});
exports.findUserByCredentialId = findUserByCredentialId;
const createUserService = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCredential = yield (0, credentialsService_1.createCredentials)(newUser.username, newUser.password);
        const userCreated = yield data_source_1.UserModel.save({
            name: newUser.name,
            email: newUser.email,
            birthDate: newUser.birthDate,
            dni: newUser.dni,
            Credentials: newCredential
        });
        return "Usuario creado";
    }
    catch (error) {
        throw new Error("Error creating user");
    }
});
exports.createUserService = createUserService;
