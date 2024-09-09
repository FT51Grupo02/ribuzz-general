/* eslint-disable prettier/prettier */
import { Controller, Put, Query } from "@nestjs/common";
import { giveAdminService } from "./asigAdmin.service";
import { ApiTags, ApiQuery } from "@nestjs/swagger";
//import { asignAdminDto } from "./Dto/asignAdmin.dto";

@ApiTags('Admin-Auth')
@Controller('authadmin')
export class giveAdminController {
    constructor(private authAdminService:giveAdminService){}
    
    @Put('/admin')
    @ApiQuery({name:'email', required:true})
    @ApiQuery({name:'rol', required:false})
    async asingAdmin(@Query('email') email:string, @Query('rol') rol?:string){
        return await this.authAdminService.asingAdmin(email,rol)
    }
}