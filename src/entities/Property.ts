import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("properties")
export class Property {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        default: "venta", 
        enum: ["venta", "alquiler"] 
    })
    tipo!: "venta" | "alquiler";

    @Column()
    title!: string;

    @Column("varchar")
    price!: string;
    
    @Column({
  type: "varchar",
  default: "disponible",
  enum: ["disponible", "reservado", "vendido"]
})
estado!: "disponible" | "reservado" | "vendido";

    @Column()
    location!: string;

    @Column()
    bedrooms!: number;

    @Column()
    bathrooms!: number;

    @Column()
    area!: string;

    @Column("text")
    description!: string;
//
    @Column("text", { name: "imagesrc", array: true })
    imageSrc!: string[];
}
