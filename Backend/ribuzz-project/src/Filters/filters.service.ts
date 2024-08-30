/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity'
import {FilterDto} from './Dto/filters.dto' 
//import { Services } from 'src/Entidades/services.entity';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    //private readonly serviceRepository: Repository<Services>,
  ) {}

  async search(dto:FilterDto):Promise<Products[]> {
      try{
       
        const arrayProduct = await this.productRepository.createQueryBuilder('product') 
        
        const filter = {

          ...(dto.categorie && {categotie:dto.categorie}),
          ...(dto.price && {price:dto.price}),
          ...(dto.rating && {rating:dto.rating}),
          ...(dto.publicationDate && {publicationDate:dto.publicationDate}),
          ...(dto.populate && {populate:dto.populate}),
          ...(dto.location && {location:dto.location}),
        }
        
        //Aplicación de los filtros establecidos 

        Object.entries(filter).forEach(([key, value]) => {
          if (key === 'categorie' || key === 'location') {
            arrayProduct.andWhere(`product.${key} LIKE :${key}`, { [`${key}`]: value });
          } else {
            arrayProduct.andWhere(`product.${key} = :${key}`, { [`${key}`]: value });
          }
        })

        return await arrayProduct.getMany()

      }
      catch(error){
        throw new InternalServerErrorException("Error al encontrar el producto"+ error) 
      }
  }
  
}
