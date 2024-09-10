import { FileTypeValidator,MaxFileSizeValidator,Controller,Put, Param,UseInterceptors ,UploadedFile,ParseFilePipe, UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploudService } from './file-upload.service';
import { ApiTags } from '@nestjs/swagger';
//import { AuthGuard } from "src/guards/auth.guard";

@ApiTags('Files-Image')
@Controller('files')
export class FileUploudController {
  constructor(private readonly fileUploudService: FileUploudService) {}


  @Put('uploadProductImage/:id')
 // @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async UploadProductImages(@Param('id') productId: string,
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
  return await this.fileUploudService.uploadProductImages(file,productId)

  }


  @Put('uploadServiceImage/:id')
  // @UseGuards(AuthGuard)
   @UseInterceptors(FileInterceptor('file'))
   async UploadServiceImages(@Param('id') serviceId: string,
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
   return await this.fileUploudService.uploadServiceImages(file,serviceId)
   }


   @Put('uploadEventImage/:id')
   // @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async UploadEventImages(@Param('id') eventId: string,
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
    return await this.fileUploudService.uploadEventImages(file,eventId)
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
