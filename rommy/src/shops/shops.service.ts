import { All, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

//import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt'
import { Shop } from './shops.model';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopsService {
    constructor(
        @InjectModel(Shop)
        private shopModel : typeof Shop,
      ){}

      findOne(filter: {
        where: { id?: number|string; name?: string; email?: string, city?:string; };
      }): Promise<Shop> {
        return this.shopModel.findOne({ ...filter });
      }
    
      findAll(): Promise<Shop[]> {
        return this.shopModel.findAll();
      }
      async create(
        createShopDto: CreateShopDto, image: string
    ): Promise<Shop| {warningMessage:string}>{
        const shop = new Shop();
        // const existingUserByName = await this.findOne({
        //     where: {name: createUserDto.username}
        // });

        const existingShopByEmail = await this.findOne({
            where: {email : createShopDto.email}
        });
        // if(existingUserByName){
        //     return {
        //         warningMessage : 'Пользователь с таким именем уже существует'
        //     };
        // }
        if(existingShopByEmail){
            return {
                warningMessage : 'Магазин с таким email уже существует'
            };
        }

        const hashedPassword = await bcrypt.hash(createShopDto.password, 10);
       // const image = createShopDto.image;
       // await  this.shopModel.update({image}, {where: {email: createShopDto.email}})
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

    async getShop(id:number):Promise<CreateShopDto|string>{
        const shop = await this.findOne({where:{id}});
        if(!shop){
            return "Такой магазин не найден";
        }
        return shop;
    }

    async getShopsCity(city:string):Promise<CreateShopDto[]|string>{
        let shop = await this.findAll();
        shop = shop.filter(item=>item.city===city)
        if(!shop){
            return "Нет ни одного магазина в этом городе";
        }
        return shop;
    }
}
