import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Tenant } from "./Tenant";
import { GuarantorNote } from "./GuarantorNote";

@Entity("guarantors")
export class Guarantor {
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
    direccion!: string;
    @Column()
    ocupacion!: string;
    @Column({ type: "decimal", precision: 10, scale: 2 })
    ingresoMensual!: number;
    @Column()
    relacionConInquilino!: string;
    @Column({ type: "boolean", default: false })
    esGaranteDeOtro!: boolean;
    @Column({ type: "text", nullable: true })
    observacionesGenerales!: string;
    @Column({ type: "text", nullable: true })
    historialCrediticio!: string; 
    @Column({ type: "text", nullable: true })
    capacidadPagoObservaciones!: string; 
    @Column({ type: "boolean", default: false })
    garanteConfiable!: boolean;
    @Column({ type: "text", nullable: true })
    motivosInconfiabilidad!: string; 
    @Column({ type: "text", nullable: true })
    observacionesDocumentacion!: string; 
    @ManyToOne(() => Tenant, tenant => tenant.garantes)
    @JoinColumn({ name: "tenantId" })
    inquilino!: Tenant;
    @Column()
    tenantId!: number;
    @OneToMany(() => GuarantorNote, note => note.garante)
    notas!: GuarantorNote[];
}