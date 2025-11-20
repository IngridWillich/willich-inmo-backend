export class UserDto {
    id: number;
    name: string;
    email: string;
    birthDate: string; 
    dni: string;
    username: string;

    constructor(id: number, name: string, email: string, birthDate: string, dni: string, username: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
        this.dni = dni;
        this.username = username;
    }
}
