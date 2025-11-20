import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Property } from "./Property";
import { Guarantor } from "./Guarantor";
import { TenantNote } from "./TenantNote";

export enum PaymentStatus {
  PUNTUAL = 'puntual',
  MOROSO = 'moroso',
  ATRASADO = 'atrasado'
}

export enum PerformanceStatus {
  EXCELENTE = 'excelente',
  BUENO = 'bueno',
  REGULAR = 'regular',
  MALO = 'malo'
}

@Entity("tenants")
export class Tenant {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nombre!: string;

    @Column()
    apellido!: string;

    @Column()
    dni!: string;

    @Column()
    email!: string;

    @Column()
    telefono!: string;

    @Column({ type: "date" })
    fechaNacimiento!: Date;

    @Column()
    direccionActual!: string;

    @Column()
    ocupacion!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    ingresoMensual!: number;

    @Column({
        type: "enum",
        enum: PaymentStatus,
        default: PaymentStatus.PUNTUAL
    })
    estadoPago!: PaymentStatus;

    @Column({
        type: "enum",
        enum: PerformanceStatus,
        default: PerformanceStatus.BUENO
    })
    desempenio!: PerformanceStatus;

    @Column({ type: "date", nullable: true })
    fechaIngreso!: Date | null;

    @Column({ type: "date", nullable: true })
    fechaSalida!: Date | null;

    @Column({ type: "text", nullable: true })
    observacionesGenerales!: string | null;

    @Column({ type: "text", nullable: true })
    quejasVecinos!: string | null;

    @Column({ type: "text", nullable: true })
    problemasMantenimiento!: string | null;

    @Column({ type: "text", nullable: true })
    incumplimientosNormas!: string | null;

    @Column({ type: "text", nullable: true })
    observacionesConducta!: string | null;

    @Column({ type: "boolean", default: false })
    tieneSanciones!: boolean;

    @Column({ type: "text", nullable: true })
    sancionesAplicadas!: string | null;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    deudaAcumulada!: number;

    @ManyToOne(() => Property, property => property.tenants)
    @JoinColumn({ name: "propertyId" })
    propiedad!: Property;

    @Column({ nullable: true })
    propertyId!: number;

    @OneToMany(() => Guarantor, guarantor => guarantor.inquilino)
    garantes!: Guarantor[];

    @OneToMany(() => TenantNote, note => note.inquilino)
    notas!: TenantNote[];
}