import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Guarantor } from "./Guarantor";

export enum GuarantorNoteType {
  PROBLEMA_CONTACTO = 'problema_contacto',
  DOCUMENTACION = 'documentacion',
  HISTORIAL_CREDITICIO = 'historial_crediticio',
  CAPACIDAD_PAGO = 'capacidad_pago',
  OBSERVACION_GENERAL = 'observacion_general',
  RECOMENDACION = 'recomendacion',
  ADVERTENCIA = 'advertencia'
}

@Entity("guarantor_notes")
export class GuarantorNote {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: GuarantorNoteType,
        default: GuarantorNoteType.OBSERVACION_GENERAL
    })
    tipo!: GuarantorNoteType;

    @Column("text")
    contenido!: string;

    @Column()
    autor!: string;

    @Column({ type: "boolean", default: false })
    importante!: boolean; 

    @CreateDateColumn()
    fechaCreacion!: Date;

    @ManyToOne(() => Guarantor, guarantor => guarantor.notas)
    @JoinColumn({ name: "guarantorId" })
    garante!: Guarantor;

    @Column()
    guarantorId!: number;
}