/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
//import { Users } from "src/Entidades/user.entity";
import { UsuarioService } from "src/usuario/usuario.service";


@Injectable()
export class giveAdminService {
    constructor(private  userService:UsuarioService ) { }

    async asingAdmin(email:string) {
        try {
            const user = await this.userService.findUserEmail(email);
            if(!user){throw new BadRequestException("Usuario no encontrado")}
            
            if(user.rol!=='admin' ){
                user.rol='admin'
                await this.userService.update(user.id,{rol:user.rol})
                return {message:`El usuario ${user.name} es administrador`}
            }
            else {
                user.rol='usuario'
                await this.userService.update(user.id,{rol:user.rol})
                return {message:`El usuario ${user.name} ya no tiene el rol de administrador`}
            }
        } 
        catch (error) {
            if(error instanceof BadRequestException){throw error}
            else{
                throw new InternalServerErrorException(`Error al realizar la operación${error}`)
            }
        }
    }

}