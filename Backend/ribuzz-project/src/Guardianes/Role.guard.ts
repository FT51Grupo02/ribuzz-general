/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesClass implements CanActivate{
    constructor(private readonly reflector: Reflector){}
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();

        const user = request.user;

        if(user.admin){return user.admin}
        else {throw new ForbiddenException("El usuario no esta autorizado para este movimiento")}
    }
    
}