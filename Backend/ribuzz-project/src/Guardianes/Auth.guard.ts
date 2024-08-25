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
            switch(user){
                case 1:
                    user.usuario=user.rol=['Emprendedor']   
                    break;
                case 2:
                    user.cliente=user.rol=['Cliente']
                    break;    
                case 3:
                    user.admin=user.rol=['Admin']
                    break;    
                default:
                    user.rol=['Usuario Anonimo']

                return true
            }
        }
        catch{
            throw new UnauthorizedException("Token Invalido")
        }

    }
}