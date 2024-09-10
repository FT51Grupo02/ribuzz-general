/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export abstract class BaseRoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // Aquí el método debe ser declarado como abstracto
  protected abstract getExpectedRoles(): string[];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const userRole = decodedToken.rol;
      const expectedRoles = this.getExpectedRoles();

      return expectedRoles.includes(userRole);
    } catch (error) {
      throw new UnauthorizedException('Token inválido'+error);
    }
  }
}
