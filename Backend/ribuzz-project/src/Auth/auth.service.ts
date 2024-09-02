/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/usuario.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsuarioService,
        private jwtService: JwtService,
    ) {}

    async signInClient(email: string, password: string) {
        try {

            const find_user = await this.userService.findUserEmail(email);
            if (!find_user) {
                throw new BadRequestException("Credenciales no validas");
            }


            const isValidatePass = await bcrypt.compare(password, find_user.password);
            if (!isValidatePass) {
                throw new BadRequestException("Correo y/o contraseña invalidas");
            }
            
            if(find_user.rol !== "cliente"){throw new BadRequestException("El rol no esta asignado con el usuario")}

            const usePayload = {
                id: find_user.id,
                correo: find_user.email,
                rol: find_user.rol,
            };

            const token = await this.jwtService.sign(usePayload);

            return {
                message: "Ingreso éxitoso",
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

    async signInEntrepreneur(email: string, password: string) {
        try {

            const find_user = await this.userService.findUserEmail(email);
            if (!find_user) {
                throw new BadRequestException("Credenciales no validas");
            }


            const isValidatePass = await bcrypt.compare(password, find_user.password);
            if (!isValidatePass) {
                throw new BadRequestException("Correo y/o contraseña invalidas");
            }
            
            if(find_user.rol !== "emprendedor"){throw new BadRequestException("El rol no esta asignado con el usuario")}

            const usePayload = {
                id: find_user.id,
                correo: find_user.email,
                rol: find_user.rol,
            };

            const token = await this.jwtService.sign(usePayload);

            return {
                message: "Ingreso éxitoso",
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

    async generateToken(user: any) {
        try {
            const payload = {
                email: user.email,
                name: user.firstName,
                photo: user.picture,
            };

            return await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET || 'default_secret',
                expiresIn: '60m',
            });
        } catch (error) {
            throw new InternalServerErrorException(`Error al generar el token: ${(error as Error).message}`);
        }
    }

    async googleLogin(req) {
        try {
            // Busca el usuario por email
            const user = await this.userService.findUserEmail(req.user.email);
    
            if (!user) {
                // Crea un nuevo objeto de usuario con las propiedades necesarias
                const newUser = {
                    email: req.user.email,
                    name: req.user.name,
                    photo: req.user.photo,
                    rol: 'cliente', // Asigna un rol predeterminado
                    password: '', // Contraseña vacía por defecto
                    date: new Date(),
                    events: [], // Inicializa eventos si es necesario
                    orders: [] // Inicializa pedidos si es necesario
                };
    
                // Guarda el nuevo usuario en la base de datos
                await this.userService.createUser(newUser);
    
                // Redirige al formulario de registro para completar la información
                return { redirectTo: `/complete-registration?email=${encodeURIComponent(req.user.email)}` };
            }
    
            // Genera un token para el usuario existente
            const token = await this.generateToken(user);
    
            return {
                message: 'User Info from Google',
                user: req.user,
                token: token,
            };
        } catch (error) {
            throw new InternalServerErrorException(`Error during Google login: ${(error as Error).message}`);
        }
    }
    

}
