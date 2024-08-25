/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../Entidades/user.entity';
import { UpdateUserDto } from './User.dto/update-user.dto';
import { Events } from '../Entidades/events.entity';
import { Orders } from '../Entidades/orders.entity';
import * as bcrypt from "bcrypt"

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

    async create(user: Partial<Users>){
        const encript = await bcrypt.hash(user.password, 10)
        user.password = encript
        const newUser = await this.usuarioRepository.save(user);
        const {password, rol, ... userPassword} = newUser;
        return userPassword
    }


    async findAll(page:number, limit:number) {
        let users = await this.usuarioRepository.find()
        const start = (page - 1) * limit
        const end = start + +limit
        users = users.slice(start,end)

        return users.map(({password, rol, ...user }) => user)
    }

    async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
        where: { id }
    });
    if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    const {password, rol, ... userPassword} = usuario;
    return userPassword
    }

    async update(id: number, updateUsuarioDto: UpdateUserDto) {

        const existingUser = await this.usuarioRepository.findOneBy({ id });
        
        if (!existingUser) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }
    
        const updatedUser = { ...existingUser, ...updateUsuarioDto };
        
        await this.usuarioRepository.save(updatedUser);
    
        const { password, ...userWithoutPassword } = updatedUser;
    
        return userWithoutPassword;
    }

    async deleteUser(id: number){
        const result = await this.usuarioRepository.delete(id);
    
        if (result.affected === 0) {
            throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
        }
    
        return result;
        }

    async findUserEmail(email:string):Promise<Users>{

        const findEmail = await this.usuarioRepository.findOne({where:{email}})
        return findEmail
    }    

}
