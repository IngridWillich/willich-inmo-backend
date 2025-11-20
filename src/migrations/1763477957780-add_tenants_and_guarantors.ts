import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTenantsAndGuarantors1763477957780 implements MigrationInterface {
    name = 'AddTenantsAndGuarantors1763477957780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."guarantor_notes_tipo_enum" AS ENUM('problema_contacto', 'documentacion', 'historial_crediticio', 'capacidad_pago', 'observacion_general', 'recomendacion', 'advertencia')`);
        await queryRunner.query(`CREATE TABLE "guarantor_notes" ("id" SERIAL NOT NULL, "tipo" "public"."guarantor_notes_tipo_enum" NOT NULL DEFAULT 'observacion_general', "contenido" text NOT NULL, "autor" character varying NOT NULL, "importante" boolean NOT NULL DEFAULT false, "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(), "guarantorId" integer NOT NULL, CONSTRAINT "PK_5614de6fa3322a5a21a5d554f91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guarantors" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "dni" character varying NOT NULL, "email" character varying NOT NULL, "telefono" character varying NOT NULL, "fechaNacimiento" date NOT NULL, "direccion" character varying NOT NULL, "ocupacion" character varying NOT NULL, "ingresoMensual" numeric(10,2) NOT NULL, "relacionConInquilino" character varying NOT NULL, "esGaranteDeOtro" boolean NOT NULL DEFAULT false, "observacionesGenerales" text, "historialCrediticio" text, "capacidadPagoObservaciones" text, "garanteConfiable" boolean NOT NULL DEFAULT false, "motivosInconfiabilidad" text, "observacionesDocumentacion" text, "tenantId" integer NOT NULL, CONSTRAINT "PK_5282b468a3bedf77b8dc92b6b60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tenant_notes_tipo_enum" AS ENUM('queja_vecino', 'problema_pago', 'daño_propiedad', 'incumplimiento', 'observacion_conducta', 'reclamo', 'felicitacion', 'general')`);
        await queryRunner.query(`CREATE TABLE "tenant_notes" ("id" SERIAL NOT NULL, "tipo" "public"."tenant_notes_tipo_enum" NOT NULL DEFAULT 'general', "contenido" text NOT NULL, "autor" character varying NOT NULL, "requiereAccion" boolean NOT NULL DEFAULT false, "resuelto" boolean NOT NULL DEFAULT false, "fechaResolucion" date, "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(), "tenantId" integer NOT NULL, CONSTRAINT "PK_2ecbf3569492950f6fcd001048b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tenants_estadopago_enum" AS ENUM('puntual', 'moroso', 'atrasado')`);
        await queryRunner.query(`CREATE TYPE "public"."tenants_desempenio_enum" AS ENUM('excelente', 'bueno', 'regular', 'malo')`);
        await queryRunner.query(`CREATE TABLE "tenants" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "dni" character varying NOT NULL, "email" character varying NOT NULL, "telefono" character varying NOT NULL, "fechaNacimiento" date NOT NULL, "direccionActual" character varying NOT NULL, "ocupacion" character varying NOT NULL, "ingresoMensual" numeric(10,2) NOT NULL, "estadoPago" "public"."tenants_estadopago_enum" NOT NULL DEFAULT 'puntual', "desempenio" "public"."tenants_desempenio_enum" NOT NULL DEFAULT 'bueno', "fechaIngreso" date, "fechaSalida" date, "observacionesGenerales" text, "quejasVecinos" text, "problemasMantenimiento" text, "incumplimientosNormas" text, "observacionesConducta" text, "tieneSanciones" boolean NOT NULL DEFAULT false, "sancionesAplicadas" text, "deudaAcumulada" numeric(10,2) NOT NULL DEFAULT '0', "propertyId" integer, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "properties" ("id" SERIAL NOT NULL, "tipo" character varying NOT NULL DEFAULT 'venta', "title" character varying NOT NULL, "price" character varying NOT NULL, "estado" character varying NOT NULL DEFAULT 'disponible', "location" character varying NOT NULL, "bedrooms" integer NOT NULL, "bathrooms" integer NOT NULL, "area" character varying NOT NULL, "description" text NOT NULL, "imagesrc" text array NOT NULL, CONSTRAINT "PK_2d83bfa0b9fcd45dee1785af44d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "guarantor_notes" ADD CONSTRAINT "FK_ae6bcc5567db7b18ffad3e81554" FOREIGN KEY ("guarantorId") REFERENCES "guarantors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guarantors" ADD CONSTRAINT "FK_ce8d239cd9aaeafbc3c4c23d324" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_notes" ADD CONSTRAINT "FK_51c3eae866fb26b1500ada50256" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_40b6986ec14295696de254b13d9" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_40b6986ec14295696de254b13d9"`);
        await queryRunner.query(`ALTER TABLE "tenant_notes" DROP CONSTRAINT "FK_51c3eae866fb26b1500ada50256"`);
        await queryRunner.query(`ALTER TABLE "guarantors" DROP CONSTRAINT "FK_ce8d239cd9aaeafbc3c4c23d324"`);
        await queryRunner.query(`ALTER TABLE "guarantor_notes" DROP CONSTRAINT "FK_ae6bcc5567db7b18ffad3e81554"`);
        await queryRunner.query(`DROP TABLE "properties"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
        await queryRunner.query(`DROP TYPE "public"."tenants_desempenio_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tenants_estadopago_enum"`);
        await queryRunner.query(`DROP TABLE "tenant_notes"`);
        await queryRunner.query(`DROP TYPE "public"."tenant_notes_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "guarantors"`);
        await queryRunner.query(`DROP TABLE "guarantor_notes"`);
        await queryRunner.query(`DROP TYPE "public"."guarantor_notes_tipo_enum"`);
    }

}
