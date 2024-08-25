/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/usuario.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService{
    constructor(
        private userService : UsuarioService, 
        private jwtService: JwtService,
    ){}

    async signIn(email: string, password:string){
        
        const find_user = await this.userService.findUserEmail(email)
        if(!find_user){throw new BadRequestException("Credenciales no validas")}

        const isValidatePass = await bcrypt.compare((password), find_user.password)
        if(!isValidatePass){throw new BadRequestException("Correo y/o contraseña invalidas")}

        const usePayload = {
            id:find_user.id,
            correo:find_user.email,
            rol:find_user.rol
        }

        const token = await this.jwtService.sign(usePayload)

        return {
            message:"Ingreso éxitoso", 
            token,
        }
    }
}