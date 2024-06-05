import { Shop } from './shops.model';
import { CreateShopDto } from './dto/create-shop.dto';
export declare class ShopsService {
    private shopModel;
    constructor(shopModel: typeof Shop);
    findOne(filter: {
        where: {
            id?: number | string;
            name?: string;
            email?: string;
            city?: string;
        };
    }): Promise<Shop>;
    findAll(): Promise<Shop[]>;
    create(createShopDto: CreateShopDto, image: string): Promise<Shop | {
        warningMessage: string;
    }>;
    getShop(id: number): Promise<CreateShopDto | string>;
    getShopsCity(city: string): Promise<CreateShopDto[] | string>;
}
