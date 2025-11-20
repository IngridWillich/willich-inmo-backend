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
  
  export interface ICredential {
    username: string;
    password: string;
  }
  

  export interface ISchedule {
    date: Date;
    time: string;
    userId: number;
    
  }
  
  export interface IService {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  export interface IUser {
    id: number;
    name: string;
    email: string;
    birthDate: Date;
    credentialsId: number;
  }
  