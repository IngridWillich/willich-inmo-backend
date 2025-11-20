import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Tenant } from "./Tenant";

export enum TenantNoteType {
  QUEJA_VECINO = 'queja_vecino',
  PROBLEMA_PAGO = 'problema_pago',
  DAÑO_PROPIEDAD = 'daño_propiedad',
  INCUMPLIMIENTO = 'incumplimiento',
  OBSERVACION_CONDUCTA = 'observacion_conducta',
  RECLAMO = 'reclamo',
  FELICITACION = 'felicitacion',
  GENERAL = 'general'
}

@Entity("tenant_notes")
export class TenantNote {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "enum",
        enum: TenantNoteType,
        default: TenantNoteType.GENERAL
    })
    tipo!: TenantNoteType;

    @Column("text")
    contenido!: string;

    @Column()
    autor!: string; 

    @Column({ type: "boolean", default: false })
    requiereAccion!: boolean; 

    @Column({ type: "boolean", default: false })
    resuelto!: boolean;

    @Column({ type: "date", nullable: true })
    fechaResolucion!: Date;

    @CreateDateColumn()
    fechaCreacion!: Date;

    @ManyToOne(() => Tenant, tenant => tenant.notas)
    @JoinColumn({ name: "tenantId" })
    inquilino!: Tenant;

    @Column()
    tenantId!: number;
}