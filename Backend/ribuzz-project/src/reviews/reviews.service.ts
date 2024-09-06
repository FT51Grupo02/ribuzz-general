/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from 'src/Entidades/events.entity';
import { Products } from 'src/Entidades/products.entity';
import { Review } from 'src/Entidades/reviews';
import { Services } from 'src/Entidades/services.entity';
import { Repository } from 'typeorm';
import { Users } from '../Entidades/user.entity';
import { CreateReviewDto } from './dto/review.dto';
//import { UpdateUserDto } from './User.dto/update-user.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,


        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,

         @InjectRepository(Products)
         private readonly productRepository: Repository<Products>,

         @InjectRepository(Events)
         private readonly eventRepository: Repository<Events>,

         @InjectRepository(Services)
         private readonly serviceRepository: Repository<Services>,
        ) 
        {}


    
    ///////////////product review///////////////
   async AddProductReview(reviews:CreateReviewDto){
    const { productsId, userId, rating, comment } = reviews;

    // Obtener el producto y el usuario de la base de datos
    const product = await this.productRepository.findOneBy({ id: productsId });
    const user = await this.userRepository.findOneBy({ id: userId });
    console.log(product);
    console.log(user);


    // Asegurarse de que ambos existan
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Crear la nueva reseña
    const review = new Review();
    review.rating = rating;
    review.comment = comment;
    review.username = user.name
    review.productId = product;  
    review.userId = user;    
     
    
    return this.reviewRepository.save(review);
}


          ///////////////event review///////////
async AddEventReview(reviews){
    const { eventId, userId, rating, comment } = reviews;

    // Obtener el producto y el usuario de la base de datos
    const event = await this.eventRepository.findOneBy({ id:eventId });
    const user = await this.userRepository.findOneBy({ id: userId });
    console.log(event);
    console.log(user);


    if (!event) {
      throw new Error('evento no encontrado');
    }
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Crear la nueva reseña
    const review = new Review();
    review.rating = rating;
    review.comment = comment;
    review.username = user.name
    review.eventId = event;  
    review.userId = user;    
     
    
    return this.reviewRepository.save(review);
}
//////////////review service/////////////////

async AddServiceReview(reviews){
    const { serviceId, userId, rating, comment } = reviews;

    // Obtener el producto y el usuario de la base de datos
    const service = await this.serviceRepository.findOneBy({ id:serviceId });
    const user = await this.userRepository.findOneBy({ id: userId });
    console.log(service);
    console.log(user);


    if (!service) {
      throw new Error('service no encontrado');
    }
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Crear la nueva reseña
    const review = new Review();
    review.rating = rating;
    review.comment = comment;
    review.username = user.name
    review.serviceId = service;  
    review.userId = user;    
     
    
    return this.reviewRepository.save(review);
}
        

    async findOne(id: string) {
        try {
            const review = await this.reviewRepository.findOne({
                where: { id }
               
            });
            if (!review) {
                throw new NotFoundException(`review con ID ${id} no encontrado.`);
            }
            return review;
        } catch (error) {
            throw new InternalServerErrorException('Error al obtener el review');
        }
    }

   

    async deleteReview(id: string) {
        try {
            const result = await this.reviewRepository.delete(id);
            if (result.affected === 0) {
                throw new NotFoundException(`review con ID ${id} no encontrado.`);
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException('Error al eliminar el review');
        }
    }
}
