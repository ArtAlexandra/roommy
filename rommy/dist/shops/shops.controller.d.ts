import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
export declare const storage: {
    storage: any;
};
export declare class ShopsController {
    private shopsService;
    constructor(shopsService: ShopsService);
    create(shopDto: CreateShopDto, file: any): Promise<import("./shops.model").Shop | {
        warningMessage: string;
    }>;
    getAll(): Promise<import("./shops.model").Shop[]>;
    getShop(id: number): Promise<string | CreateShopDto>;
    getShops(city: string): Promise<string | CreateShopDto[]>;
}
