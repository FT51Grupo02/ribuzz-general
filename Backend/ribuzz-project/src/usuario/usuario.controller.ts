/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Query} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './User.dto/Create-user.dto';
import { UpdateUserDto } from './User.dto/update-user.dto';
/*import { EntrepreneurGuard } from 'src/Guardianes/entrepreneur.guard';
import { AdminGuard } from 'src/Guardianes/admin.guard';*/

@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usuarioService.createUser(user);
  }

  
  @Get()
  findAll(@Query(`page`) page:number, @Query(`limit`) limit:number) {
    if (page && limit){
      return this.usuarioService.findAll(page,limit );  
    }
    return this.usuarioService.findAll(1, 3);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
    
  }

  //@UseGuards(EntrepreneurGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUserDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }
  
  //@UseGuards(AdminGuard)
  @Delete(':id')
  deleteUser(@Param(`id`) id:string){
    return this.usuarioService.deleteUser(id);
  }

}
