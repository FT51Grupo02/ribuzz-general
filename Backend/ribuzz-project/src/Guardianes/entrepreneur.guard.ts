/* eslint-disable prettier/prettier */
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class EntrepreneurGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const authorizate = request.headers.authorization;

        if(!authorizate){throw new UnauthorizedException("Autorización no valida");}

        const token = request.headers.authorization.split(' ')[1];
        if(!token){throw new UnauthorizedException("Token no autorizado")}

        try{
            const secret = process.env.JWS_SECRET
            const user = this.jwtService.verify(token,{secret})

            user.exp = new Date(user.exp*1000)
            user.iat = new Date(user.iat*1000)

            //Validación de roles

            if(user.rol!=="emprendedor"){throw new BadRequestException("El emprendimiento no esta autorizado para esta orden")}
            return true;
        }
        catch{
            throw new UnauthorizedException("Token invalido");
        }

    }
}