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
exports.Tenant = exports.PerformanceStatus = exports.PaymentStatus = void 0;
// src/entities/Tenant.ts
const typeorm_1 = require("typeorm");
const Property_1 = require("./Property");
const Guarantor_1 = require("./Guarantor");
const TenantNote_1 = require("./TenantNote");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PUNTUAL"] = "puntual";
    PaymentStatus["MOROSO"] = "moroso";
    PaymentStatus["ATRASADO"] = "atrasado";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PerformanceStatus;
(function (PerformanceStatus) {
    PerformanceStatus["EXCELENTE"] = "excelente";
    PerformanceStatus["BUENO"] = "bueno";
    PerformanceStatus["REGULAR"] = "regular";
    PerformanceStatus["MALO"] = "malo";
})(PerformanceStatus || (exports.PerformanceStatus = PerformanceStatus = {}));
let Tenant = class Tenant {
    id;
    nombre;
    apellido;
    dni;
    email;
    telefono;
    fechaNacimiento;
    direccionActual;
    ocupacion;
    ingresoMensual;
    estadoPago;
    desempenio;
    // Cambiar a nullable para permitir null
    fechaIngreso;
    fechaSalida;
    // Campos específicos para quejas/observaciones de la inmobiliaria
    observacionesGenerales;
    quejasVecinos;
    problemasMantenimiento;
    incumplimientosNormas;
    observacionesConducta;
    tieneSanciones;
    sancionesAplicadas;
    deudaAcumulada;
    // Relación con la propiedad que alquila
    propiedad;
    propertyId;
    // Relación con garantes
    garantes;
    // Relación con notas específicas
    notas;
};
exports.Tenant = Tenant;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tenant.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "dni", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Tenant.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "direccionActual", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tenant.prototype, "ocupacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Tenant.prototype, "ingresoMensual", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: PaymentStatus,
        default: PaymentStatus.PUNTUAL
    }),
    __metadata("design:type", String)
], Tenant.prototype, "estadoPago", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: PerformanceStatus,
        default: PerformanceStatus.BUENO
    }),
    __metadata("design:type", String)
], Tenant.prototype, "desempenio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "fechaIngreso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "fechaSalida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "observacionesGenerales", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "quejasVecinos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "problemasMantenimiento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "incumplimientosNormas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "observacionesConducta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "tieneSanciones", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Tenant.prototype, "sancionesAplicadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Tenant.prototype, "deudaAcumulada", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Property_1.Property, property => property.tenants),
    (0, typeorm_1.JoinColumn)({ name: "propertyId" }),
    __metadata("design:type", Property_1.Property)
], Tenant.prototype, "propiedad", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tenant.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Guarantor_1.Guarantor, guarantor => guarantor.inquilino),
    __metadata("design:type", Array)
], Tenant.prototype, "garantes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TenantNote_1.TenantNote, note => note.inquilino),
    __metadata("design:type", Array)
], Tenant.prototype, "notas", void 0);
exports.Tenant = Tenant = __decorate([
    (0, typeorm_1.Entity)("tenants")
], Tenant);
