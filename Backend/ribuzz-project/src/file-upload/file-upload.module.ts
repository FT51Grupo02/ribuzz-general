import { Module } from '@nestjs/common';
import { FileUploudService } from './file-upload.service';
import { FileUploudController } from './file-upload.controller';
import { ClaudinaryConfig } from 'src/config/claudinary.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity';
import { FileUploadRepository } from './file-upload.repository';
import { Users } from 'src/Entidades/user.entity';
import { SharedModule } from 'src/shared/shared.module';
import { Events } from 'src/Entidades/events.entity';
import { Services } from 'src/Entidades/services.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Products,Users,Events,Services]), SharedModule],
  controllers: [FileUploudController],
  providers: [FileUploudService,FileUploadRepository ,ClaudinaryConfig],
})
export class FileUploudModule {}
