/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity';
import { FileUploadRepository } from './file-upload.repository';
import { Repository } from "typeorm";
import { Users } from 'src/Entidades/user.entity';
@Injectable()
export class FileUploudService {
    constructor(private readonly filesRepository:FileUploadRepository,
    @InjectRepository(Products)
    private readonly productRepository:Repository<Products>,
    @InjectRepository(Users)
    private readonly usuarioRepository: Repository<Users>
    ){}
    async uploadImages(file:Express.Multer.File, productId:string){

        const product = await this.productRepository.findOneBy({id:productId})
        if(!product){
            throw new NotFoundException("product no encontrado");  
        }
        const uploadedImage = await this.filesRepository.uploadImage(file)
        console.log(uploadedImage);

        await this.productRepository.update(product.id, {
            images: [...product.images, uploadedImage.secure_url],
        });

        return await this.productRepository.findOneBy({ id:productId })
    }
    async uploadUserImages(file:Express.Multer.File, userId:any){

    const user = await this.usuarioRepository.findOneBy({id:userId})
    if(!user){
        throw new NotFoundException("product no encontradosss");  
    }
    const uploadedImage = await this.filesRepository.uploadImage(file)
    console.log(uploadedImage);

    await this.usuarioRepository.update(user.id,{
        photo: uploadedImage.secure_url,
    });

    return await this.usuarioRepository.findOneBy({ id:userId })
}
}
