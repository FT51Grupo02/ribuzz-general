import { Controller, Put, Body } from "@nestjs/common";
import { giveAdminService } from "./asigAdmin.service";
import { ApiTags } from "@nestjs/swagger";
//import { asignAdminDto } from "./Dto/asignAdmin.dto";

@ApiTags('Admin-Auth')
@Controller('authadmin')
export class giveAdminController {
    constructor(private authAdminService:giveAdminService){}
    
    @Put('/admin')
    async asingAdmin(@Body('email') email:string){
        return await this.authAdminService.asingAdmin(email)
    }
}