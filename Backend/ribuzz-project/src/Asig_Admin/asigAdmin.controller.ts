/* eslint-disable prettier/prettier */
import { Controller, Put, Body } from "@nestjs/common";
import { giveAdminService } from "./asigAdmin.service";
//import { asignAdminDto } from "./Dto/asignAdmin.dto";

@Controller('authadmin')
export class giveAdminController {
    constructor(private authAdminService:giveAdminService){}
    
    @Put('/admin')
    async asingAdmin(@Body('email') email:string){
        return await this.authAdminService.asingAdmin(email)
    }
}