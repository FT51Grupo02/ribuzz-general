/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export abstract class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  // Método abstracto para que las clases hijas definan los roles esperados
  protected abstract getExpectedRoles(): string[];

  // Implementación de canActivate
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token Invalido');
    }

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });

      // Convertir exp e iat a fechas
      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);

      // Verificación del rol del usuario
      if (user.rol === 'admin') {user.rol = 'admin'} 
      else if (user.rol === 'cliente') {user.rol = 'cliente'} 
      else if (user.rol === 'emprendedor') {user.rol = 'emprendedor';} 
      else {user.rol = 'usuario';}

      const expectedRoles = this.getExpectedRoles();
      if (!expectedRoles.includes(user.rol)) {
        throw new UnauthorizedException('No tienes permisos para esta transación');
      }

      return true;
    } catch (error) {
      console.error('Error al verificar el token:', error);

      const typedError = error as Error;
      const errorMessage = typedError.message || typedError.name || 'Error desconocido al verificar el token';
      throw new UnauthorizedException(`Token inválido: ${errorMessage}`);
    }
  }
}
