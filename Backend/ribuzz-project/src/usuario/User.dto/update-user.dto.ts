/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './Create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
