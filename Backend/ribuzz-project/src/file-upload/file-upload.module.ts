import { Module } from '@nestjs/common';
import { FileUploudService } from './file-upload.service';
import { FileUploudController } from './file-upload.controller';
import { ClaudinaryConfig } from 'src/config/claudinary.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity';
import { FileUploadRepository } from './file-upload.repository';
import { Users } from 'src/Entidades/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Products,Users])],
  controllers: [FileUploudController],
  providers: [FileUploudService,FileUploadRepository ,ClaudinaryConfig],
})
export class FileUploudModule {}
