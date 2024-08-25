/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../Entidades/user.entity';
import { UpdateUserDto } from './User.dto/update-user.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Users)
        private readonly usuarioRepository: Repository<Users>,
        /*@InjectRepository(Events)
        private readonly eventsRepository: Repository<Events>,
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
        */) {}

    async create(user: Partial<Users>) {
        try {
            const encript = await bcrypt.hash(user.password, 10);
            user.password = encript;
            const newUser = await this.usuarioRepository.save(user);
            const { password, rol, ...userPassword } = newUser;
            return userPassword;
        } catch (error) {
            throw new InternalServerErrorException('Error al crear el usuario');
        }
    }

    async findAll(page: number, limit: number) {
        try {
            let users = await this.usuarioRepository.find();
            const start = (page - 1) * limit;
            const end = start + +limit;
            users = users.slice(start, end);

            return users.map(({ password, rol, ...user }) => user);
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener los usuarios');
        }
    }

    async findOne(id: number) {
        try {
            const usuario = await this.usuarioRepository.findOne({
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

    async update(id: number, updateUsuarioDto: UpdateUserDto) {
        try {
            const existingUser = await this.usuarioRepository.findOneBy({ id });
            if (!existingUser) {
                throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
            }
        
            const updatedUser = { ...existingUser, ...updateUsuarioDto };
            await this.usuarioRepository.save(updatedUser);
        
            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        } catch (error) {
            throw new InternalServerErrorException('Error al actualizar el usuario');
        }
    }

    async deleteUser(id: number) {
        try {
            const result = await this.usuarioRepository.delete(id);
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
            const findEmail = await this.usuarioRepository.findOne({ where: { email } });
            if (!findEmail) {
                throw new NotFoundException(`Usuario con email ${email} no encontrado.`);
            }
            return findEmail;
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar el usuario por email');
        }
    }
}
