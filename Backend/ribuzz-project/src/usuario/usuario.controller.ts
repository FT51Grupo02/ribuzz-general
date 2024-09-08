import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './User.dto/Create-user.dto';
import { UpdateUserDto } from './User.dto/update-user.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/Guardianes/admin.guard';


@ApiTags('Users')
@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usuarioService.createUser(user);
  }

  
  @Get()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  findAll(@Query(`page`) page:number, @Query(`limit`) limit:number) {
    if (page && limit){
      return this.usuarioService.findAll(page,limit );  
    }
    return this.usuarioService.findAll(1, 3);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
    
  }

  
  @Put(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUserDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }
  
  
  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  deleteUser(@Param(`id`) id:string){
    return this.usuarioService.deleteUser(id);
  }

}
