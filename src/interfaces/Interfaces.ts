

// Enumeración para los estados de las citas
export enum Status {
    ACTIVE = "ACTIVE",
    CANCELLED = "CANCELLED",
  }

  export default interface IAppointment {
    id:number,
    date: Date;
    time: string;
    userId: number;
    status: Status;
   
}
  
  // Interfaz para las credenciales de un usuario
  export interface ICredential {
    username: string;
    password: string;
  }
  
  // Interfaz para la programación de citas o eventos
  export interface ISchedule {
    date: Date;
    time: string;
    userId: number;
    
  }
  
  // Interfaz para los servicios ofrecidos
  export interface IService {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  // Interfaz para los usuarios
  export interface IUser {
    id: number;
    name: string;
    email: string;
    birthDate: Date;
    credentialsId: number;
  }
  