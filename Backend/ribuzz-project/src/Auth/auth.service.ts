/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/usuario.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "src/usuario/User.dto/Create-user.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private userService: UsuarioService,
        private jwtService: JwtService,
    ) {}

    async signInClient(email: string, password: string) {
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

            if(password === '') throw new UnauthorizedException('Please Provide The Password')

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

    async validateGoogleUser(googleUser: Partial<CreateUserDto>) {
        try {
            this.logger.debug(`Attempting to validate Google user: ${googleUser.email}`);
    
            // Validar que el email esté presente
            if (!googleUser.email) {
                throw new BadRequestException('No email provided in Google user profile');
            }
    
            let user;
            try {
                user = await this.userService.findUserEmail(googleUser.email);
                this.logger.debug(`Existing user found for email: ${googleUser.email}`);
            } catch (error) {
                if (error instanceof NotFoundException) {
                    this.logger.debug(`No existing user found. Attempting to create new user for: ${googleUser.email}`);
    
                    const newUser: Partial<CreateUserDto> = {
                        email: googleUser.email,
                        name: googleUser.name || 'Default Name', // Asignar nombre predeterminado si no está presente
                        password: '', // Considera manejar el password de manera adecuada según tus necesidades
                        rol: googleUser.rol || 'cliente', // Rol predeterminado si no se provee
                    };
    
                    user = await this.userService.createUser(newUser);
                    this.logger.debug(`New user created successfully: ${user.email}`);
                } else {
                    throw new InternalServerErrorException('Error al buscar el usuario en la base de datos');
                }
            }
    
            return user;
        } catch (error) {
            this.logger.error('Error in validateGoogleUser');
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException('Error al autenticar usuario con Google');
        }
    }

    async handleGoogleAuth(user: any) {
        try {
            this.logger.debug(`Handling Google auth for user: ${user.email}`);
            
            const usePayload = {
                id: user.id,
                correo: user.email,
                rol: user.rol,
            };
    
            const token = await this.jwtService.sign(usePayload);
    
            return {
                message: "Ingreso éxitoso",
                token,
                rol: user.rol
            };
        } catch (error) {
            this.logger.error('Error in handleGoogleAuth');
            throw new InternalServerErrorException('Error al procesar autenticación de Google');
        }
    }
    
        

}
