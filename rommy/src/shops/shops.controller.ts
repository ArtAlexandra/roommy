
import { Controller, Header, HttpCode, HttpStatus, Body, Post, Get, Param, UseInterceptors, Request, UploadedFile, Delete } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');

import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}


@Controller('shops')
export class ShopsController {
    constructor(private shopsService: ShopsService){}

   
    @Post('/signin')
    @UseInterceptors(FileInterceptor('file', storage))
    create(@Body() shopDto :CreateShopDto,@UploadedFile() file){
        return this.shopsService.create(shopDto, file.originalname);
    }

   
    //@UseGuards(JwtAuthGuard)
    @Get('/get-all')
    getAll(){
        return this.shopsService.findAll();
    }
    @Get('/get-shop/:id')
    getShop(@Param('id') id:number){
        return this.shopsService.getShop(id);
    }


    @Get('/get-shops/:city')
    getShops(@Param('city') city:string){
        return this.shopsService.getShopsCity(city);
    }
}
