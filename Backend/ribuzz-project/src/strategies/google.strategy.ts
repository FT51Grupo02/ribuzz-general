import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/Auth/auth.service';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private authService: AuthService) {
        super({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['email', 'profile'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const googleUser = {
        email: emails[0].value,
        name: name.givenName,
        photo: photos[0].value,
        accessToken,  // Se pasa el accessToken como parte de los datos del usuario de Google
        };

        const user = await this.authService.loginWithGoogle(googleUser);

        // Verificamos si el valor devuelto es una instancia de Error
        if (user instanceof Error) {
        return done(new InternalServerErrorException(user.message), false);
        }

        return done(null, user);
    }
}
