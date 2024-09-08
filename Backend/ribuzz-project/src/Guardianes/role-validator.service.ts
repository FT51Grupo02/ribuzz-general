import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoleValidatorService {
    constructor(private jwtServive: JwtService) {}

    validateTokenRol(token: string, expectedRoles: string[]): boolean {
        const secret = process.env.JWT_SECRET;
        const user = this.jwtServive.verify(token, { secret });

        // Validación de los roles
        if (!expectedRoles.includes(user.rol)) {
            throw new BadRequestException(`El rol ${user.rol} no está autorizado para esta operación`);
        }
        return true;
    }
}
