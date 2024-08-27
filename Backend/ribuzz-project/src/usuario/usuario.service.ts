/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../Entidades/user.entity';
import { UpdateUserDto } from './User.dto/update-user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        /*@InjectRepository(Events)
        private readonly eventsRepository: Repository<Events>,
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
        */) {}

        async create(user: Partial<Users>) {
            try {
                const repeatUser = await this.userRepository.find({
                      where:[{name:user.name},{email:user.email},{password:user.password}]
                })

                if(repeatUser.length>0) {throw new BadRequestException("usuraio ya se encuentra registrado")}

                const encript = await bcrypt.hash(user.password, 10);
                user.password = encript;

                if(user.rol !== "cliente" && user.rol !== "admin" && user.rol !== "emprendedor"){
                    throw new BadRequestException("Rol no valido para registro de usuario")
                }
                const newUser = await this.userRepository.save(user);
                const { password, rol, ...userPassword } = newUser;
                return userPassword;

            } catch (error) {
                if( error instanceof BadRequestException){throw error}
                else{throw new InternalServerErrorException(`Error al crear el usuario: ${(error as Error).message}`)}
            }
        }
    

    async findAll(page: number, limit: number) {
        try {
            let users = await this.userRepository.find();
            const start = (page - 1) * limit;
            const end = start + +limit;
            users = users.slice(start, end);

            return users.map(({ password, rol, ...user }) => user);
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener los usuarios');
        }
    }

    async findOne(id: string) {
        try {
            const usuario = await this.userRepository.findOne({
                where: { id }
            });
            if (!usuario) {
                throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
            }
            const { password, rol, ...userPassword } = usuario;
            return userPassword;
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener el usuario');
        }
    }

    async update(id: string, updateUsuarioDto: UpdateUserDto) {
        try {
            const existingUser = await this.userRepository.findOneBy({ id });
            if (!existingUser) {
                throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
            }
        
            const updatedUser = { ...existingUser, ...updateUsuarioDto };
            await this.userRepository.save(updatedUser);
        
            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        } catch (error) {
            throw new InternalServerErrorException('Error al actualizar el usuario');
        }
    }

    async deleteUser(id: string) {
        try {
            const result = await this.userRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Error al eliminar el usuario');
        }
    }

    async findUserEmail(email: string): Promise<Users> {
        try {
            const findEmail = await this.userRepository.findOne({ where: { email } });
            if (!findEmail) {
                throw new NotFoundException(`Usuario con email ${email} no encontrado.`);
            }
            return findEmail;
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar el usuario por email');
        }
    }
}
