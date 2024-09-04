import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from 'src/Auth/config/google-oauth.config';
import { ConfigType } from '@nestjs/config';
import { AuthService } from 'src/Auth/auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfiguration: ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
    ) {
    super({
        clientID: googleConfiguration.clinetID,
        clientSecret: googleConfiguration.clientSecret,
        callbackURL: googleConfiguration.callbackURL,
        scope: ['email', 'profile'],
    });
    }

    async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
    ) {
    console.log({ profile });
    const user = await this.authService.validateGoogleUser({
        email: profile.emails[0].value,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        photo: profile.photos[0].value,
        password: '',
        date: profile._json.birthday,
        rol: 'cliente'
    
    });
    const email = profile.emails?.[0]?.value;
    const photo = profile.photos?.[0]?.value || '';
    if (!email) {
    throw new BadRequestException('No email found in Google profile');
    }
    
    done(null, user);
    // return user;
    }
}