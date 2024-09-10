/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
//import { Users } from "src/Entidades/user.entity";
import { UsuarioService } from "src/usuario/usuario.service";


@Injectable()
export class giveAdminService {
    constructor(private  userService:UsuarioService ) { }

    async getAdmin(email:string, rol:string) {
    
        const user = await this.userService.findUserEmail(email)

        if(!user){throw new BadRequestException("Usuario no encontrado")}

        if(user.rol !== 'admin'){
            
            user.rol = 'admin';
            await this.userService.update(user.id,{rol:user.rol})
            console.log(user.rol)
            return {message: `El usuario ya tiene el rol de admin+`}
        
        }
    }

}