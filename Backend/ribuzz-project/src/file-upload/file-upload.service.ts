/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity';
import { FileUploadRepository } from './file-upload.repository';
import { Repository } from "typeorm";
import { Users } from 'src/Entidades/user.entity';
import { Services } from 'src/Entidades/services.entity';
import { Events } from 'src/Entidades/events.entity';
@Injectable()
export class FileUploudService {
    constructor(private readonly filesRepository:FileUploadRepository,
    @InjectRepository(Products)
    private readonly productRepository:Repository<Products>,
    @InjectRepository(Services)
    private readonly serviceRepository:Repository<Services>,
    @InjectRepository(Events)
    private readonly eventRepository:Repository<Events>,
    @InjectRepository(Users)
    private readonly usuarioRepository: Repository<Users>
    ){}
    async uploadProductImages(file:Express.Multer.File, productId:string){

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


    async uploadServiceImages(file:Express.Multer.File, serviceId:string){

        const service = await this.productRepository.findOneBy({id:serviceId})
        if(!service){
            throw new NotFoundException("service no encontrado");  
        }
        const uploadedImage = await this.filesRepository.uploadImage(file)
        

        await this.serviceRepository.update(service.id, {
            images: [...service.images, uploadedImage.secure_url],
        });

        return await this.productRepository.findOneBy({ id:serviceId })
    }


    
    async uploadEventImages(file:Express.Multer.File, eventId:string){

        const event = await this.eventRepository.findOneBy({id:eventId})
        if(!event){
            throw new NotFoundException("evento no encontrado");  
        }
        const uploadedImage = await this.filesRepository.uploadImage(file)
        

        await this.serviceRepository.update(event.id, {
            images: [...event.images, uploadedImage.secure_url],
        });

        return await this.productRepository.findOneBy({ id:eventId })
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
