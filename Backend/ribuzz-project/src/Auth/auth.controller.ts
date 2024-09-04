/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./Dto/auth.dto";
import { AuthGuard } from "@nestjs/passport";
import { GoogleAuthGuard } from "src/Guardianes/google-auth.guard";
import { ConfigService } from "@nestjs/config";


@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService, private configService: ConfigService) {}

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

    //Google
    
    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleLogin(){

    }
    

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req, @Res() res) {
        try {
            const { user } = req;
            if (!user) {
                throw new HttpException('No user from Google', HttpStatus.BAD_REQUEST);
            }

            const result = await this.authService.handleGoogleAuth(user);
            
            const frontendUrl = this.configService.get<string>('FRONTEND_URL');
            const redirectUrl = `${frontendUrl}/auth-callback`;

            // Redirect to the frontend with the auth result as query parameters
            res.redirect(`${redirectUrl}?token=${result.token}&rol=${result.rol}&message=${encodeURIComponent(result.message)}`);
        } catch (error) {
            console.error('Error in Google auth callback:', error);
            const errorUrl = this.configService.get<string>('FRONTEND_ERROR_URL');
            res.redirect(`${errorUrl}?error=${encodeURIComponent}`);
        }
    }
}