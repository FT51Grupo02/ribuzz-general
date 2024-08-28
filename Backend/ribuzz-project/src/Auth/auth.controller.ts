/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./Dto/auth.dto";


@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService) {}

    @Post('/signIn/clients')
    async signInClient(@Body() credentials:AuthDto){
        const{email,password}=credentials
        return this.authService.signInClient(email,password)
    }

    @Post('/signIn/entrepreneur')
    async signInEntrepreneur(@Body() credentials:AuthDto){
        const{email,password}=credentials
        return this.authService.signInEntrepreneur(email,password)
    }

}