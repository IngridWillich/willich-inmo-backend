"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guarantor = void 0;
const typeorm_1 = require("typeorm");
const Tenant_1 = require("./Tenant");
const GuarantorNote_1 = require("./GuarantorNote");
let Guarantor = class Guarantor {
    id;
    nombre;
    apellido;
    dni;
    email;
    telefono;
    fechaNacimiento;
    direccion;
    ocupacion;
    ingresoMensual;
    relacionConInquilino;
    esGaranteDeOtro;
    // Campos específicos para observaciones de la inmobiliaria
    observacionesGenerales;
    historialCrediticio; // Observaciones sobre su historial
    capacidadPagoObservaciones; // Sobre su capacidad de pago
    garanteConfiable;
    motivosInconfiabilidad; // Razones por las que no es confiable
    observacionesDocumentacion; // Problemas con documentación
    // Relación con el inquilino
    inquilino;
    tenantId;
    // Relación con notas específicas
    notas;
};
exports.Guarantor = Guarantor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Guarantor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guarantor.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guarantor.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guarantor.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guarantor.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guarantor.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Guarantor.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guarantor.prototype, "direccion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guarantor.prototype, "ocupacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Guarantor.prototype, "ingresoMensual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Guarantor.prototype, "relacionConInquilino", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Guarantor.prototype, "esGaranteDeOtro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Guarantor.prototype, "observacionesGenerales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Guarantor.prototype, "historialCrediticio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Guarantor.prototype, "capacidadPagoObservaciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Guarantor.prototype, "garanteConfiable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Guarantor.prototype, "motivosInconfiabilidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Guarantor.prototype, "observacionesDocumentacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tenant_1.Tenant, tenant => tenant.garantes),
    (0, typeorm_1.JoinColumn)({ name: "tenantId" }),
    __metadata("design:type", Tenant_1.Tenant)
], Guarantor.prototype, "inquilino", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Guarantor.prototype, "tenantId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GuarantorNote_1.GuarantorNote, note => note.garante),
    __metadata("design:type", Array)
], Guarantor.prototype, "notas", void 0);
exports.Guarantor = Guarantor = __decorate([
    (0, typeorm_1.Entity)("guarantors")
], Guarantor);
