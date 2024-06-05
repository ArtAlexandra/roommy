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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt = require("bcrypt");
const shops_model_1 = require("./shops.model");
let ShopsService = class ShopsService {
    constructor(shopModel) {
        this.shopModel = shopModel;
    }
    findOne(filter) {
        return this.shopModel.findOne({ ...filter });
    }
    findAll() {
        return this.shopModel.findAll();
    }
    async create(createShopDto, image) {
        const shop = new shops_model_1.Shop();
        const existingShopByEmail = await this.findOne({
            where: { email: createShopDto.email }
        });
        if (existingShopByEmail) {
            return {
                warningMessage: 'Магазин с таким email уже существует'
            };
        }
        const hashedPassword = await bcrypt.hash(createShopDto.password, 10);
        shop.name = createShopDto.name;
        shop.email = createShopDto.email;
        shop.password = hashedPassword;
        shop.phone = createShopDto.phone;
        shop.address = createShopDto.address;
        shop.owner = createShopDto.owner;
        shop.owner = createShopDto.owner;
        shop.owner = createShopDto.owner;
        shop.city = createShopDto.city;
        shop.timeWork = createShopDto.timeWork;
        shop.image = image;
        return shop.save();
    }
    async getShop(id) {
        const shop = await this.findOne({ where: { id } });
        if (!shop) {
            return "Такой магазин не найден";
        }
        return shop;
    }
    async getShopsCity(city) {
        let shop = await this.findAll();
        shop = shop.filter(item => item.city === city);
        if (!shop) {
            return "Нет ни одного магазина в этом городе";
        }
        return shop;
    }
};
exports.ShopsService = ShopsService;
exports.ShopsService = ShopsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(shops_model_1.Shop)),
    __metadata("design:paramtypes", [Object])
], ShopsService);
//# sourceMappingURL=shops.service.js.map