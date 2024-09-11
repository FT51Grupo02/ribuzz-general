/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Put, Query,Body, UseGuards } from "@nestjs/common";
import { giveAdminService } from "./asigAdmin.service";
import { ApiTags, ApiQuery, ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { AdminGuard } from "src/Guardianes/admin.guard";
import { asignAdminDto } from "./Dto/asignAdmin.dto";




@ApiTags('Admin-Auth')
@Controller('authadmin')
export class giveAdminController {
    constructor(private authAdminService:giveAdminService){}
    
    @Put('/admin')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiBody({type: asignAdminDto})
    async getAdmin(@Body('email') email:string){
        return await this.authAdminService.getAdmin(email)
    }
}