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
exports.GoodsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const goods_model_1 = require("./goods.model");
let GoodsService = class GoodsService {
    constructor(goodsModel) {
        this.goodsModel = goodsModel;
    }
    findOne(filter) {
        return this.goodsModel.findOne({ ...filter });
    }
    findAll() {
        return this.goodsModel.findAll();
    }
    async create(goodsDto) {
        const goods = new goods_model_1.Goods();
        const existingGoodsByArticle = await this.findOne({
            where: { article: goodsDto.article }
        });
        if (existingGoodsByArticle) {
            return {
                warningMessage: 'Одежда с таким артикулом уже существует'
            };
        }
        const existingGoodsByTitle = await this.findOne({
            where: { title: goodsDto.title }
        });
        if (existingGoodsByTitle) {
            return {
                warningMessage: 'Одежда с таким названием уже существует'
            };
        }
        goods.article = goodsDto.article;
        goods.composition = goodsDto.composition;
        goods.quantity = goodsDto.quantity;
        goods.description = goodsDto.description;
        goods.mark = goodsDto.mark;
        goods.state = goodsDto.state;
        goods.title = goodsDto.title;
        goods.price = goodsDto.price;
        goods.shopId = goodsDto.shopId;
        goods.typeId = goodsDto.typeId;
        return goods.save();
    }
    async getGoodsId(id_g) {
        const goods = await this.findOne({ where: { id_g } });
        if (!goods) {
            return "Такой товар не найден";
        }
        return goods;
    }
    async getGoodsTypeClothes(id) {
        let goods = await this.findAll();
        goods = goods.filter(item => item.typeId === id);
        if (!goods) {
            return "Нет ни одной одежды такого типа";
        }
        return goods;
    }
    async getGoodsShop(name) {
        let goods = await this.findAll();
        goods = goods.filter(item => item.shop.name == name);
        if (!goods) {
            return "У этого магазина пока нет товара";
        }
        return goods;
    }
    async getGoodsQuantity(id_g) {
        let goods = await this.findOne({ where: { id_g } });
        if (!goods) {
            return "Такой товар не найден";
        }
        return goods.quantity;
    }
};
exports.GoodsService = GoodsService;
exports.GoodsService = GoodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(goods_model_1.Goods)),
    __metadata("design:paramtypes", [Object])
], GoodsService);
//# sourceMappingURL=goods.service.js.map