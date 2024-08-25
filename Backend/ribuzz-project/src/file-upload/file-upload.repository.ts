import { Injectable } from "@nestjs/common";
import { UploadApiResponse,v2 } from "cloudinary";
import  toStream  = require('buffer-to-stream')



@Injectable()
export class FileUploadRepository {
    async uploadImage(file: Express.Multer.File):Promise<UploadApiResponse>{
    return new Promise((resolve, reject) => {
    const upload = v2.uploader.upload_stream(
        {resourse_type: 'image'},
        (error, result) =>{
            if(error){
                reject(error)
            }else {
                resolve(result)
            }
        }
    )
    toStream(file.buffer).pipe(upload)
}
)
}
}