/* eslint-disable prettier/prettier */
import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate{
    jwtService: any;
    constructor(private readonly reflector: Reflector){}
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizate = request.headers.authorization;

        if(!authorizate){throw new UnauthorizedException("No tiene permisos para esta transacción");}

        const token = request.headers.authorization.split(' ')[1];
        if(!token){throw new UnauthorizedException("Token no autorizado")}

        try{
            const secret = process.env.JWS_SECRET
            const user = this.jwtService.verify(token,{secret})

            user.exp = new Date(user.exp*1000)
            user.iat = new Date(user.iat*1000)

            //Validación de roles

            if(user.rol!=="admin"){throw new BadRequestException("El cliente no esta autorizado para esta orden")}
            return true;
        }
        catch{
            throw new UnauthorizedException("Token invalido");
        }

    }
    
    
}