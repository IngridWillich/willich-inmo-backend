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
exports.Property = void 0;
const typeorm_1 = require("typeorm");
const Tenant_1 = require("./Tenant");
const typeorm_2 = require("typeorm");
let Property = class Property {
    id;
    tipo;
    title;
    price;
    estado;
    location;
    bedrooms;
    bathrooms;
    area;
    description;
    //
    imageSrc;
    tenants;
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Property.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        default: "venta",
        enum: ["venta", "alquiler"]
    }),
    __metadata("design:type", String)
], Property.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Property.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        default: "disponible",
        enum: ["disponible", "reservado", "vendido"]
    }),
    __metadata("design:type", String)
], Property.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "bedrooms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Property.prototype, "bathrooms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Property.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "imagesrc", array: true }),
    __metadata("design:type", Array)
], Property.prototype, "imageSrc", void 0);
__decorate([
    (0, typeorm_2.OneToMany)(() => Tenant_1.Tenant, tenant => tenant.propiedad),
    __metadata("design:type", Array)
], Property.prototype, "tenants", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)("properties")
], Property);
