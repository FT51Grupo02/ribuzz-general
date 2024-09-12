/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./Dto/auth.dto";
//import { GoogleAuthGuard } from "src/Guardianes/google-auth.guard";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private configService: ConfigService) {}

    @Post('/signIn/clients')
    async signInClient(@Body() credentials: AuthDto) {
        const { email, password } = credentials;
        return this.authService.signInClient(email, password);
    }

    @Post('/signIn/entrepreneur')
    async signInEntrepreneur(@Body() credentials: AuthDto) {
        const { email, password } = credentials;
        return this.authService.signInEntrepreneur(email, password);
    }

    // @Get('google/login')
    // async googleLogin(@Res() res: Response) {
    //   const redirectUri = https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=profile email;
    //   res.redirect(redirectUri);
    // }
    //@UseGuards(GoogleAuthGuard)

    @Get('google/login')
    async googleLogin(@Res() res: Response) {
      const redirectUri = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&response_type=code&scope=profile email`;
     res.redirect(redirectUri);
    }
   //@UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Req() req, @Res() res) {
    try {
        const result = await this.authService.validateGoogleToken(req.user);

        if (result instanceof Error) {
            console.log(result);
            return res.redirect(`${process.env.GOOGLE_RETURN}?message=${encodeURIComponent(result.message)}`);
        }

        const { accessToken, rol } = result;
        res.redirect(`${process.env.GOOGLE_RETURN}/oauth?token=${encodeURIComponent(accessToken)}&role=${encodeURIComponent(rol)}`);
    } catch (err) {
        const errorMessage = (err as Error).message || 'Unknown error';
        res.redirect(`${process.env.GOOGLE_RETURN}?message=${encodeURIComponent(errorMessage)}`);
    }
}



}
