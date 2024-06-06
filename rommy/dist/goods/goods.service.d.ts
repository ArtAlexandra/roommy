import { Goods } from './goods.model';
import { GoodsDto } from './dto/goods.dto';
export declare class GoodsService {
    private goodsModel;
    constructor(goodsModel: typeof Goods);
    findOne(filter: {
        where: {
            id_g?: number | string;
            title?: string;
            article?: string;
        };
    }): Promise<Goods>;
    findAll(): Promise<Goods[]>;
    create(goodsDto: GoodsDto): Promise<Goods | {
        warningMessage: string;
    }>;
    getGoodsId(id_g: number): Promise<GoodsDto | string>;
    getGoodsTypeClothes(id: number): Promise<GoodsDto[] | string>;
    getGoodsShop(name: string): Promise<GoodsDto[] | string>;
    getGoodsQuantity(id_g: number): Promise<number | string>;
}
