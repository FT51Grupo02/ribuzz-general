/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Post, Query,Body, UseGuards } from "@nestjs/common";
import { giveAdminService } from "./asigAdmin.service";
import { ApiTags, ApiQuery } from "@nestjs/swagger";
import { AdminGuard } from "src/Guardianes/admin.guard";


@ApiTags('Admin-Auth')
@Controller('authadmin')
export class giveAdminController {
    constructor(private authAdminService:giveAdminService){}
    
    @Post('/admin')
    //@UseGuards(AdminGuard)
    //@ApiQuery({name:'email', required:true})
    //@ApiQuery({name:'rol', required:false})
    async getAdmin(@Query('email') email:string, @Query('rolUser') rolUser?:string){
        return await this.authAdminService.getAdmin(email,rolUser)
    }
}