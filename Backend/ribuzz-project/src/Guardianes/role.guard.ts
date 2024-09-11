/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()

export class RoleValidatorService implements CanActivate {
    constructor(private readonly reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest()

        const user = request.user;

        if(user.rol === 'admin'){return user.rol === 'admin'}
        else if ( user.rol === 'cliente'){return user.rol === 'cliente'}
        else if ( user.rol === 'emprendedor'){return user.rol === 'emprendedor'}
        else{return user.rol === 'usuario'}

    }
}