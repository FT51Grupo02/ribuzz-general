/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./Dto/auth.dto";
import { AuthGuard } from "@nestjs/passport";


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

    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req()req){
        
    }

    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req){
        return this.authService.googleLogin(req)
    }

}