/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class RoleValidatorService {
    constructor(private jwtServive : JwtService){}

    validateTokenRol(token: string, expectedRol: string): boolean {
        const secret = process.env.JWT_SECRET;
        const user = this.jwtServive.verify(token,{secret});

        //validación del Rol
        if(user.rol !== expectedRol){throw new BadRequestException(`El rol ${expectedRol} no esta autorizado para esta operación`);}
        return true
    }
}