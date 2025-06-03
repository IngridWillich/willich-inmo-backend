"use strict";
// import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./User";
// import { Status } from "../dto/AppointmentDto";
// enum TurnType {
//     VISITA_DE_PROPIEDAD = "Visita de propiedad",
//     VISITA_DE_LOTEO="Visita de loteo",
//     TASACION = "Tasación",
//     ENTREGA_DE_LLAVES = "Entrega de llaves",
//     REUNION_CON_EL_AGENTE = "Reunión con el agente inmobiliario",
//     FIRMA_DE_CONTRATO = "Firma de contrato",
//     ASESORAMIENTO_FINANCIERO = "Asesoramiento financiero",
// }
// export default TurnType
// @Entity({name: "appointments"})
// export class Appointment {
//     @PrimaryGeneratedColumn()
//     id!: number
//     @Column()
//     date!: Date
//     @Column()
//     time!: string
//     @Column({
//         type: "enum",
//         enum: TurnType 
//     })
//     type!: TurnType;
//     @Column({type: "enum", enum: Status, default: Status.ACTIVE})
//     status!: "ACTIVE" | "CANCELLED"
//     @ManyToOne(() => User, user => user.appointments)
//     user!: User
// }
