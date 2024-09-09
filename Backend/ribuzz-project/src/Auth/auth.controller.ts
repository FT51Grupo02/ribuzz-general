/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./Dto/auth.dto";
import { GoogleAuthGuard } from "src/Guardianes/google-auth.guard";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";

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

    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin() {}

    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback(@Req() req, @Res() res) {
        const result = await this.authService.handleGoogleUser(req.user);

    if (result instanceof Error) {
        return res.redirect(`${process.env.GOOGLE_RETURN}/?message=${encodeURIComponent(result.message)}`);
    }

    const { accessToken, rol } = result;
    res.redirect(`${process.env.GOOGLE_RETURN}/?token=${accessToken}&role=${rol}`);
}
}
