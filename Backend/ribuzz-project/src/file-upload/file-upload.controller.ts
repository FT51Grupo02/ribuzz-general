import { FileTypeValidator,MaxFileSizeValidator,Controller,Put, Param,UseInterceptors ,UploadedFile,ParseFilePipe, UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploudService } from './file-upload.service';
//import { AuthGuard } from "src/guards/auth.guard";

@Controller('files')
export class FileUploudController {
  constructor(private readonly fileUploudService: FileUploudService) {}


  @Put('uploadImage/:id')
 // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async UploadImages(@Param('id') productId: string,
  @UploadedFile (
    new ParseFilePipe({
    validators:[
      new MaxFileSizeValidator({
        maxSize: 200000,
        message: 'file tiene que ser de 200kb max'
      }),
      new FileTypeValidator({
        fileType: /(jpg|jpeg|png|webp)$/,
      }),   
    ],
  }),
  ) 
  file: Express.Multer.File
  ){
  return await this.fileUploudService.uploadImages(file,productId)
  }

  @Put('uploadUserImage/:id')
  // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async UploadUserImages(@Param('id') userId: string,
    @UploadedFile (
      new ParseFilePipe({
    validators:[
      new MaxFileSizeValidator({
      maxSize: 200000,
        message: 'file tiene que ser de 200kb max'
      }),
      new FileTypeValidator({
        fileType: /(jpg|jpeg|png|webp)$/,
      }),   
    ],
  }),
  ) 
  file: Express.Multer.File
  ){
  return await this.fileUploudService.uploadUserImages(file,userId)
  }
} 
