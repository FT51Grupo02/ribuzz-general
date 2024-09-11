
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly roles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const userRole = decodedToken.rol;

      // Permitir acceso si el rol del usuario está en los roles permitidos
      return this.roles.includes(userRole);
    } catch (error) {
      throw new UnauthorizedException('Token inválido: ');
    }
  }
}

// Helper para crear el guardián con múltiples roles
export function rolesGuard(roles: string[]) {
  return {
    canActivate: (context: ExecutionContext): boolean => {
      const rolesGuard = new RolesGuard(new JwtService(), roles);
      return rolesGuard.canActivate(context);
    },
  };
}
