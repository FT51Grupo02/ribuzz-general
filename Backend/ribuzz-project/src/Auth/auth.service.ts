/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/usuario.service";
import * as bcrypt from "bcrypt";
//import { CreateUserDto } from "src/usuario/User.dto/Create-user.dto";
import {GoogleUserResponseDto} from 'src/Auth/Dto/handleGoogleUser.dto'
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/Entidades/user.entity";
import { Repository } from "typeorm";
import { OAuth2Client } from 'google-auth-library';

@Injectable()
// export class AuthService {
//   private client: OAuth2Client

@Injectable()
export class AuthService {
    private client:OAuth2Client;

    constructor(
        private userService: UsuarioService,
        private jwtService: JwtService,
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        

    ) {
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      }
    

    async signInClient(email: string, password: string) {
        try {

            if(password === '') throw new UnauthorizedException('Por favor ingrese la contraseña')

            const find_user = await this.userService.findUserEmail(email);
            if (!find_user) {
                throw new BadRequestException("Credenciales no validas");
            }


            const isValidatePass = await bcrypt.compare(password, find_user.password);
            if (!isValidatePass) {
                throw new BadRequestException("Correo y/o contraseña invalidas");
            }
            
            if(find_user.rol !== 'cliente'&&find_user.rol !== 'admin'){throw new BadRequestException("El rol no esta asignado con el usuario")}
            

            const usePayload = {
                id: find_user.id,
                name: find_user.name || 'Anonimo',
                correo: find_user.email,
                photo:find_user.photo,
                rol: find_user.rol,
            };

            const token = await this.jwtService.sign(usePayload);

            return {
                message: "Ingreso éxitoso",
                name: find_user.name || 'Anonimo',
                id: find_user.id,
                token
            };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            } else {
                throw new InternalServerErrorException(`Error al iniciar sesión: ${(error as Error).message}`);
            }
        }
    }

    async signInEntrepreneur(email: string, password: string) {
        try {

            if(password === '') throw new UnauthorizedException('Please Provide The Password')

            const find_user = await this.userService.findUserEmail(email);
            if (!find_user) {
                throw new BadRequestException("Credenciales no validas");
            }


            const isValidatePass = await bcrypt.compare(password, find_user.password);
            if (!isValidatePass) {
                throw new BadRequestException("Correo y/o contraseña invalidas");
            }
            

            if(find_user.rol !== 'emprendedor'&&find_user.rol !== 'admin'){throw new BadRequestException("El rol no esta asignado con el usuario")}


            const usePayload = {
                id: find_user.id,
                name: find_user.name || 'Anonimo',
                correo: find_user.email,
                photo:find_user.photo,
                rol: find_user.rol,
            };

            const token = await this.jwtService.sign(usePayload);

            return {
                message: "Ingreso éxitoso",
                id: find_user.id,
                name: find_user.name || 'Anonimo',
                token,
            };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            } else {
                throw new InternalServerErrorException(`Error al iniciar sesión: ${(error as Error).message}`);
            }
        }
    }

    // AuthGoogle
    // import { Injectable } from '@nestjs/common';
    // import { JwtService } from '@nestjs/jwt';
    // import { OAuth2Client } from 'google-auth-library';
    
//     @Injectable()
// export class AuthService {
//   private client: OAuth2Client;

//   constructor(private jwtService: JwtService) {
//     this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//   }
     
  async validateGoogleToken(idToken: string): Promise<any> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload || !payload.email || !payload.sub) {
        throw new Error('La respuesta de Google no contiene la información esperada');
      }

      return { email: payload.email, name: payload.name, sub: payload.sub };
    } catch (error) {
      throw new Error(`Error al validar el token de Google: ${error}`);
    }
  }

  async loginWithGoogle(user: any) {
    // Busca o crea un usuario en la base de datos
    


    const currentUser = await this.userService.findUserEmail(user.email);

    if (!currentUser) {
      throw new Error('El usuario no fue encontrado después de la creación');
    }

    const payload = { email: currentUser.email, role: currentUser.rol };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, role: currentUser.rol };
  }
}