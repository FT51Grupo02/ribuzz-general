/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/Entidades/products.entity';
import { Review } from 'src/Entidades/reviews';
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
        ) 
        {}


    
    
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
        
    // async findAll(page: number, limit: number) {
    //     try {
    //         let users = await this.userRepository.find();
    //         const start = (page - 1) * limit;
    //         const end = start + +limit;
    //         users = users.slice(start, end);

    //         return users.map(({ password, rol, ...user }) => user);
    //     } catch (error) {
    //         throw new InternalServerErrorException('Error al obtener los usuarios');
    //     }
    // }

    // async findOne(id: string) {
    //     try {
    //         const usuario = await this.userRepository.findOne({
    //             where: { id },
    //             relations:{orders:true}
    //         });
    //         if (!usuario) {
    //             throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    //         }
    //         const { password, rol, ...userPassword } = usuario;
    //         return userPassword;
    //     } catch (error) {
    //         throw new InternalServerErrorException('Error al obtener el usuario');
    //     }
    // }

    // async update(id: string, updateUsuarioDto: UpdateUserDto) {
    //     try {
    //         const existingUser = await this.userRepository.findOneBy({ id });
    //         if (!existingUser) {
    //             throw new NotFoundException("Usuario no encontrado.");
    //         }  
    //         if ('rol' in updateUsuarioDto || 'date' in updateUsuarioDto) {
    //             throw new BadRequestException("Los campos 'rol' y 'date' no son modificables.");
    //         }
    //         const upDateUser: Partial<UpdateUserDto> = { ...existingUser };
    //         if (updateUsuarioDto.password) {
    //             upDateUser.password = await bcrypt.hash(updateUsuarioDto.password, 10);
    //         }
           
    //         if (updateUsuarioDto.name) {
    //             upDateUser.name = updateUsuarioDto.name;
    //         }
    //         if (updateUsuarioDto.email) {
    //             upDateUser.email = updateUsuarioDto.email;
    //         }
    
            
    //         await this.userRepository.save(upDateUser);
    
            
    //         const { password, ...userWithoutPassword } = upDateUser;
    //         return userWithoutPassword;
    
    //     } catch (error) {
    //         throw new BadRequestException('Error al actualizar el usuario: ' + error);
    //     }
    // }
    

//     async deleteReview(id: string) {
//         try {
//             const result = await this.reviewRepository.delete(id);
//             if (result.affected === 0) {
//                 throw new NotFoundException(`review con ID ${id} no encontrado.`);
//             }
//             return result;
//         } catch (error) {
//             throw new InternalServerErrorException('Error al eliminar el review');
//         }
//     }
}
