/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./Dto/auth.dto";


@Controller('autenticacion')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    
    @Post('/ingreso')
    async signIn(@Body() credentials:AuthDto){
        const{correo,contraseña}=credentials
        return this.authService.signIn(correo,contraseña)
    }
}