"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitTenants1763478707903 = void 0;
class InitTenants1763478707903 {
    name = 'InitTenants1763478707903';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "properties_estado_check"`);
        await queryRunner.query(`CREATE TYPE "public"."guarantor_notes_tipo_enum" AS ENUM('problema_contacto', 'documentacion', 'historial_crediticio', 'capacidad_pago', 'observacion_general', 'recomendacion', 'advertencia')`);
        await queryRunner.query(`CREATE TABLE "guarantor_notes" ("id" SERIAL NOT NULL, "tipo" "public"."guarantor_notes_tipo_enum" NOT NULL DEFAULT 'observacion_general', "contenido" text NOT NULL, "autor" character varying NOT NULL, "importante" boolean NOT NULL DEFAULT false, "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(), "guarantorId" integer NOT NULL, CONSTRAINT "PK_5614de6fa3322a5a21a5d554f91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guarantors" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "dni" character varying NOT NULL, "email" character varying NOT NULL, "telefono" character varying NOT NULL, "fechaNacimiento" date NOT NULL, "direccion" character varying NOT NULL, "ocupacion" character varying NOT NULL, "ingresoMensual" numeric(10,2) NOT NULL, "relacionConInquilino" character varying NOT NULL, "esGaranteDeOtro" boolean NOT NULL DEFAULT false, "observacionesGenerales" text, "historialCrediticio" text, "capacidadPagoObservaciones" text, "garanteConfiable" boolean NOT NULL DEFAULT false, "motivosInconfiabilidad" text, "observacionesDocumentacion" text, "tenantId" integer NOT NULL, CONSTRAINT "PK_5282b468a3bedf77b8dc92b6b60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tenant_notes_tipo_enum" AS ENUM('queja_vecino', 'problema_pago', 'daño_propiedad', 'incumplimiento', 'observacion_conducta', 'reclamo', 'felicitacion', 'general')`);
        await queryRunner.query(`CREATE TABLE "tenant_notes" ("id" SERIAL NOT NULL, "tipo" "public"."tenant_notes_tipo_enum" NOT NULL DEFAULT 'general', "contenido" text NOT NULL, "autor" character varying NOT NULL, "requiereAccion" boolean NOT NULL DEFAULT false, "resuelto" boolean NOT NULL DEFAULT false, "fechaResolucion" date, "fechaCreacion" TIMESTAMP NOT NULL DEFAULT now(), "tenantId" integer NOT NULL, CONSTRAINT "PK_2ecbf3569492950f6fcd001048b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tenants_estadopago_enum" AS ENUM('puntual', 'moroso', 'atrasado')`);
        await queryRunner.query(`CREATE TYPE "public"."tenants_desempenio_enum" AS ENUM('excelente', 'bueno', 'regular', 'malo')`);
        await queryRunner.query(`CREATE TABLE "tenants" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "apellido" character varying NOT NULL, "dni" character varying NOT NULL, "email" character varying NOT NULL, "telefono" character varying NOT NULL, "fechaNacimiento" date NOT NULL, "direccionActual" character varying NOT NULL, "ocupacion" character varying NOT NULL, "ingresoMensual" numeric(10,2) NOT NULL, "estadoPago" "public"."tenants_estadopago_enum" NOT NULL DEFAULT 'puntual', "desempenio" "public"."tenants_desempenio_enum" NOT NULL DEFAULT 'bueno', "fechaIngreso" date, "fechaSalida" date, "observacionesGenerales" text, "quejasVecinos" text, "problemasMantenimiento" text, "incumplimientosNormas" text, "observacionesConducta" text, "tieneSanciones" boolean NOT NULL DEFAULT false, "sancionesAplicadas" text, "deudaAcumulada" numeric(10,2) NOT NULL DEFAULT '0', "propertyId" integer, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "tipo"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "tipo" character varying NOT NULL DEFAULT 'venta'`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "price" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "estado" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "location" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "bedrooms" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "bathrooms" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "area" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "imagesrc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "guarantor_notes" ADD CONSTRAINT "FK_ae6bcc5567db7b18ffad3e81554" FOREIGN KEY ("guarantorId") REFERENCES "guarantors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guarantors" ADD CONSTRAINT "FK_ce8d239cd9aaeafbc3c4c23d324" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenant_notes" ADD CONSTRAINT "FK_51c3eae866fb26b1500ada50256" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_40b6986ec14295696de254b13d9" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_40b6986ec14295696de254b13d9"`);
        await queryRunner.query(`ALTER TABLE "tenant_notes" DROP CONSTRAINT "FK_51c3eae866fb26b1500ada50256"`);
        await queryRunner.query(`ALTER TABLE "guarantors" DROP CONSTRAINT "FK_ce8d239cd9aaeafbc3c4c23d324"`);
        await queryRunner.query(`ALTER TABLE "guarantor_notes" DROP CONSTRAINT "FK_ae6bcc5567db7b18ffad3e81554"`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "imagesrc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "area"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "area" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "bathrooms" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "bedrooms" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "location"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "location" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "estado" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "price" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "tipo"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "tipo" character varying(255) NOT NULL DEFAULT 'venta'`);
        await queryRunner.query(`DROP TABLE "tenants"`);
        await queryRunner.query(`DROP TYPE "public"."tenants_desempenio_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tenants_estadopago_enum"`);
        await queryRunner.query(`DROP TABLE "tenant_notes"`);
        await queryRunner.query(`DROP TYPE "public"."tenant_notes_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "guarantors"`);
        await queryRunner.query(`DROP TABLE "guarantor_notes"`);
        await queryRunner.query(`DROP TYPE "public"."guarantor_notes_tipo_enum"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "properties_estado_check" CHECK (((estado)::text = ANY ((ARRAY['disponible'::character varying, 'reservado'::character varying, 'vendido'::character varying])::text[])))`);
    }
}
exports.InitTenants1763478707903 = InitTenants1763478707903;
