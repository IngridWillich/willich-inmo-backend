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
exports.validateCredentials = exports.createCredentials = void 0;
const data_source_1 = require("../config/data-source");
const Credentials_1 = require("../entities/Credentials");
let id = 1;
let credentials = [];
const createCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCredential = yield data_source_1.AppDataSource.manager.save(Credentials_1.Credentials, { username, password });
        return newCredential.id;
    }
    catch (error) {
        throw new Error("Error creating credentials");
    }
});
exports.createCredentials = createCredentials;
const validateCredentials = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCredential = yield data_source_1.CredentialsModel.findOne({ where: { username, password } });
    if (!foundCredential) {
        throw new Error("Credenciales incorrectas");
    }
    return {
        id: foundCredential.id,
        username: foundCredential.username,
        password: foundCredential.password
    };
});
exports.validateCredentials = validateCredentials;
