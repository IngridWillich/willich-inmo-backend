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
exports.GuarantorNote = exports.GuarantorNoteType = void 0;
// src/entities/GuarantorNote.ts
const typeorm_1 = require("typeorm");
const Guarantor_1 = require("./Guarantor");
var GuarantorNoteType;
(function (GuarantorNoteType) {
    GuarantorNoteType["PROBLEMA_CONTACTO"] = "problema_contacto";
    GuarantorNoteType["DOCUMENTACION"] = "documentacion";
    GuarantorNoteType["HISTORIAL_CREDITICIO"] = "historial_crediticio";
    GuarantorNoteType["CAPACIDAD_PAGO"] = "capacidad_pago";
    GuarantorNoteType["OBSERVACION_GENERAL"] = "observacion_general";
    GuarantorNoteType["RECOMENDACION"] = "recomendacion";
    GuarantorNoteType["ADVERTENCIA"] = "advertencia";
})(GuarantorNoteType || (exports.GuarantorNoteType = GuarantorNoteType = {}));
let GuarantorNote = class GuarantorNote {
    id;
    tipo;
    contenido;
    autor;
    importante; // Si es una observación crítica
    fechaCreacion;
    // Relación con el garante
    garante;
    guarantorId;
};
exports.GuarantorNote = GuarantorNote;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GuarantorNote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: GuarantorNoteType,
        default: GuarantorNoteType.OBSERVACION_GENERAL
    }),
    __metadata("design:type", String)
], GuarantorNote.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], GuarantorNote.prototype, "contenido", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GuarantorNote.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], GuarantorNote.prototype, "importante", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], GuarantorNote.prototype, "fechaCreacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Guarantor_1.Guarantor, guarantor => guarantor.notas),
    (0, typeorm_1.JoinColumn)({ name: "guarantorId" }),
    __metadata("design:type", Guarantor_1.Guarantor)
], GuarantorNote.prototype, "garante", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GuarantorNote.prototype, "guarantorId", void 0);
exports.GuarantorNote = GuarantorNote = __decorate([
    (0, typeorm_1.Entity)("guarantor_notes")
], GuarantorNote);
