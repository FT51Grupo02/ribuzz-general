/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()

export class giveAdminService {
    constructor(private readonly authService: UsuarioService){}

    async getAdmin (email:string){
        try{
            const user = await this.authService.findUserEmail(email)
            if(!user){throw new BadRequestException("Usuario no encontrado")}

            if(user.rol === 'emprendedor'){
                user.rol = 'admin'
                await this.authService.update(user.id,{rol:user.rol})
                return `El usuario ${user.name} ya es administardor`
            }
            
            else if(user.rol === 'admin'){
                user.rol = 'usuario'
                await this.authService.update(user.id,{rol:user.rol})
                return `El usuario ${user.name} no es administardor, su nuevo rol es: ${user.rol}`
            }

            else if(user.rol === 'usuario'){
                user.rol = 'cliente'
                await this.authService.update(user.id,{rol:user.rol})
                return `El usuario ${user.name} tiene un nuevo rol que es: ${user.rol}`
            }

            else{
                user.rol = 'emprendedor'
                await this.authService.update(user.id,{rol:user.rol})
                return `El usuario ${user.name} tiene un nuevo rol que es: ${user.rol}`
            }
               
        }    
        catch(error){
            if(error instanceof BadRequestException){
                return error
            }
            else{
                throw new InternalServerErrorException('Error al asignar rol');
            }
        }
    }
}