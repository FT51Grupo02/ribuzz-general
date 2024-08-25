/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './User.dto/Create-user.dto';
import { UpdateUserDto } from './User.dto/update-user.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usuarioService.create(user);
  }

  @Get()
  findAll(@Query(`page`) page:number, @Query(`limit`) limit:number) {
    if (page && limit){
      return this.usuarioService.findAll(page,limit );  
    }
    return this.usuarioService.findAll(1, 3);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUserDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  deleteUser(@Param(`id`) id:number){
    return this.usuarioService.deleteUser(id);
  }

}
