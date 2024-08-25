/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./Dto/auth.dto";


@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    
    @Post('/signIn')
    async signIn(@Body() credentials:AuthDto){
        const{email,password}=credentials
        return this.authService.signIn(email,password)
    }
}