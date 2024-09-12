import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./Dto/auth.dto";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { GoogleAuthGuard } from "src/Guardianes/google-auth.guard";

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

    @Get('google/callback')
    async googleCallback(@Req() req, @Res() res) {
        try {
            const result = await this.authService.handleGoogleUser(req.user);

            if (result instanceof Error) {
                console.log(result);
                return res.redirect(`${process.env.GOOGLE_RETURN}?message=${encodeURIComponent(result.message)}`);
            }

            // Modifica la redirección para incluir también el nombre e id
            const { token, name, id } = result;
            res.redirect(`${process.env.GOOGLE_RETURN}/oauth?token=${encodeURIComponent(token)}&name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`);
        } catch (err) {
            const errorMessage = (err as Error).message || 'Unknown error';
            res.redirect(`${process.env.GOOGLE_RETURN}?message=${encodeURIComponent(errorMessage)}`);
        }
    }


}
