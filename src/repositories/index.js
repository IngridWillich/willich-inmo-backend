"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.CredentialsModel = void 0;
const data_source_1 = require("../config/data-source");
const Credentials_1 = require("../entities/Credentials");
const User_1 = require("../entities/User");
exports.CredentialsModel = data_source_1.AppDataSource.getRepository(Credentials_1.Credentials);
exports.UserModel = data_source_1.AppDataSource.getRepository(User_1.User);
