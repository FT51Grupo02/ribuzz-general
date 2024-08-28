/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import {RoleValidatorService} from "./role.guard"

@Injectable()
export class ClientGuard implements CanActivate{
    constructor(private roleValidationService: RoleValidatorService){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        this.roleValidationService.validateTokenRol(token, "emprendedor");
        return true;
    }

    private extractToken(request: any): string {
        const authorizate = request.headers.authorization;
        if (!authorizate) { throw new UnauthorizedException("No tiene permisos para esta transacción"); }
        return request.headers.authorization.split(' ')[1];
    }
        
}