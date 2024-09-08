import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { RoleValidatorService } from "./role-validator.service";

@Injectable()
export abstract class BaseRoleGuard implements CanActivate {
    constructor(private roleValidationService: RoleValidatorService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        const expectedRoles = this.getExpectedRoles();
        this.roleValidationService.validateTokenRol(token, expectedRoles);
        return true;
    }

    protected abstract getExpectedRoles(): string[];

    private extractToken(request: any): string {
        const authorizate = request.headers.authorization;
        if (!authorizate) { throw new UnauthorizedException("No tiene permisos para esta transacción"); }
        return request.headers.authorization.split(' ')[1];
    }
}
