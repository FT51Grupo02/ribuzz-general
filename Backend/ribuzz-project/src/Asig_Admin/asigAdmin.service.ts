/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
//import { Users } from "src/Entidades/user.entity";
import { UsuarioService } from "src/usuario/usuario.service";


@Injectable()
export class giveAdminService {
    constructor(private  userService:UsuarioService ) { }

    async asingAdmin(email:string, rol?:string) {
        try {
            const user = await this.userService.findUserEmail(email);
            if(!user){throw new BadRequestException("Usuario no encontrado")}
            
            if(user.rol!=='admin' ){
                user.rol='admin'
                await this.userService.update(user.id,{rol:user.rol})
                return {message:`El usuario ${user.name} es administrador`}
            }

            const validateRol = ['usuario', 'cliente', 'emprendedor']

            if(rol && validateRol.includes(rol)){
                user.rol=rol
                await this.userService.update(user.id,{rol:user.rol})
                return {message: `El usuario ${user.name} ya se le cambio al rol de ${user.rol}`}
            }
          
                
                /*if(user.rol==='admin') {throw new BadRequestException("El ususario tiene el rol de administrado")}
                user.rol='usuario'
                await this.userService.update(user.id,{rol:user.rol})
                return {message:`El usuario ${user.name} ya no tiene el rol de administrador`}
                */
            
        } 
        catch (error) {
            if(error instanceof BadRequestException){throw error}
            else{
                throw new InternalServerErrorException(`Error al realizar la operación${error}`)
            }
        }
    }

}