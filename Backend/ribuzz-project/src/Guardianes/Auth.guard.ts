/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization.split(' ')[1];
        if(!token){throw new UnauthorizedException("Token Invalido")}

        try{
            const secret = process.env.JWS_SECRET
            const user = this.jwtService.verify(token,{secret})

            user.exp = new Date(user.exp*1000)
            user.iat = new Date(user.iat*1000)

            //Validación de roles
            if (user === 1) {
                user.role = ['Entrepreneur'];
            } else if (user === 2) {
                user.role = ['Client'];
            } else if (user === 3) {
                user.role = ['Admin'];
            } else {
                user.role = ['Anonymous User'];
            }

            return true;
        }
        catch{
            throw new UnauthorizedException("Invalid Token");
        }

    }
}