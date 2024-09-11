/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export abstract class BaseRoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  protected abstract getExpectedRoles(): string[];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      console.log('Token decodificado:', decodedToken);
      const userRole = decodedToken.rol;
      const expectedRoles = this.getExpectedRoles();

      if (!expectedRoles.includes(userRole)) {
        throw new UnauthorizedException(`Rol no autorizado: ${userRole}`);
      }

      return true;
    } catch (error) {
      console.error('Error al verificar el token:', error);

      // Convertimos el error a tipo Error
      const typedError = error as Error;
      const errorMessage = typedError.message || typedError.name || 'Error desconocido al verificar el token';
      throw new UnauthorizedException(`Token inválido: ${errorMessage}`);
    }
  }
}
