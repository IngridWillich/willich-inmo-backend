"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    id;
    name;
    email;
    birthDate;
    dni;
    username;
    constructor(id, name, email, birthDate, dni, username) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
        this.dni = dni;
        this.username = username;
    }
}
exports.UserDto = UserDto;
