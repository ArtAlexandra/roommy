import { All, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Goods } from './goods.model';
import { GoodsDto } from './dto/goods.dto';

@Injectable()
export class GoodsService {
    constructor(
        @InjectModel(Goods)
        private goodsModel : typeof Goods,
      ){}

      findOne(filter: {
        where: { id_g?: number|string; title?: string; article?:string; };
      }): Promise<Goods> {
        return this.goodsModel.findOne({ ...filter });
      }
    
      findAll(): Promise<Goods[]> {
        return  this.goodsModel.findAll();
      }
      async create(
        goodsDto: GoodsDto
    ): Promise<Goods| {warningMessage:string}>{
        const goods = new Goods();
      
        const existingGoodsByArticle = await this.findOne({
            where: { article: goodsDto.article}
        });
        
        if(existingGoodsByArticle){
            return {
                warningMessage : 'Одежда с таким артикулом уже существует'
            };
        }

        const existingGoodsByTitle = await this.findOne({
            where: { title: goodsDto.title}
        });
        
        if(existingGoodsByTitle){
            return {
                warningMessage : 'Одежда с таким названием уже существует'
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

    async getGoodsId(id_g:number):Promise<GoodsDto|string>{
        const goods = await this.findOne({where:{id_g}});
        if(!goods){
            return "Такой товар не найден";
        }
        return goods;
    }

    async getGoodsTypeClothes(id:number):Promise<GoodsDto[]|string>{
        let goods = await this.findAll();
        goods = goods.filter(item=>item.typeId===id)
        if(!goods){
            return "Нет ни одной одежды такого типа";
        }
        return goods;
    }
    
    async getGoodsShop(name:string):Promise<GoodsDto[]|string>{
        let goods = await this.findAll();
        goods = goods.filter(item=>item.shop.name==name)
        if(!goods){
            return "У этого магазина пока нет товара";
        }
        return goods;
    }

    async getGoodsQuantity(id_g:number):Promise<number|string>{
        let goods = await this.findOne({where:{id_g}});
       
        if(!goods){
            return "Такой товар не найден";
        }
        return goods.quantity;
    }

}
