/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity'
import {FilterDto} from './Dto/filters.dto' 
import { Services } from 'src/Entidades/services.entity';
import { Events } from 'src/Entidades/events.entity';


@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Services)
    private readonly serviceRepository: Repository<Services>,
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>
  ) {}

  async searchProducts(dto:FilterDto):Promise<Products[]> {
      try{

        const arrayProduct = await this.productRepository.createQueryBuilder('product')
      
        const filter = {

          ...(dto.name && {name:dto.name}),
          ...(dto.price && {price:dto.price}),
          ...(dto.rating && {rating:dto.rating}),
          ...(dto.populate && {populate:dto.populate}),
       
        }
        
        //Aplicación de los filtros establecidos 

        Object.entries(filter).forEach(([key, value]) => {
          arrayProduct.andWhere(`product.${key} = :${key}`, { [`${key}`]: value });
        })

        if (dto.categories) {
          const categoriesArray = Array.isArray(dto.categories) ? dto.categories : [dto.categories];

          arrayProduct.innerJoinAndSelect('product.categories', 'category')
                      .andWhere('category.name IN (:...categories)', { categories: categoriesArray });
      }        
      
      if (dto.orderPrice && (dto.orderPrice.toLowerCase() === 'asc' || dto.orderPrice.toLowerCase() === 'desc')) {
            const order: 'ASC' | 'DESC' = dto.orderPrice.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
            arrayProduct.addOrderBy('product.price', order); 
          }

          if (dto.orderRating && (dto.orderRating.toLowerCase() === 'asc' || dto.orderRating.toLowerCase() === 'desc')) {
            const order: 'ASC' | 'DESC' = dto.orderRating.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
            arrayProduct.addOrderBy('product.rating', order); 
          }
        return await arrayProduct.getMany()
      }
      catch(error){
        throw new InternalServerErrorException("Error al encontrar el producto"+ error) 
      }
  }

  async searchServices(dto:FilterDto):Promise<Services[]> {
    try{
     
    
      const arrayService = await this.serviceRepository.createQueryBuilder('service') 
      
      const filter = {

        ...(dto.name && {name:dto.name}),
        ...(dto.price && {price:dto.price}),
        ...(dto.rating && {rating:dto.rating}),
        ...(dto.duration && {duration:dto.duration}),
        ...(dto.location && {location:dto.location}),
     
      }
      
      //Aplicación de los filtros establecidos 

      Object.entries(filter).forEach(([key, value]) => {
        arrayService.andWhere(`product.${key} = :${key}`, { [`${key}`]: value });
      })

      if (dto.categories) {
        const categoriesArray = Array.isArray(dto.categories) ? dto.categories : [dto.categories];

        arrayService.innerJoinAndSelect('product.categories', 'category')
                    .andWhere('category.name IN (:...categories)', { categories: categoriesArray });
    }        

      //Filtrado por orden ascedente de price ay rating

      if(dto.orderPrice &&( dto.orderPrice.toLowerCase()==='asc'|| dto.orderPrice.toLowerCase()==='desc')){
        const order : 'ASC' | 'DESC' = dto.orderPrice.toLowerCase() === 'asc'? 'ASC' : 'DESC'
        arrayService.addOrderBy('service.price',order)
      }

      if(dto.orderRating &&( dto.orderRating.toLowerCase()==='asc'|| dto.orderRating.toLowerCase()==='desc')){
        const order : 'ASC' | 'DESC' = dto.orderRating.toLowerCase() === 'asc'? 'ASC' : 'DESC'
        arrayService.addOrderBy('service.rating',order)
      }
      
      return await arrayService.getMany()

    }
    catch(error){
      throw new InternalServerErrorException("Error al encontrar el servicio"+ error) 
    }
  }

  async searchEvents(dto:FilterDto):Promise<Events[]>{
    try{
      const arrayEvent = await this.eventRepository.createQueryBuilder('event')

      const filter = {
        ...(dto.name && {name:dto.name}),
        ...(dto.rating && {rate:dto.rating}),
        ...(dto.categories && {categories: dto.categories}),
        ...(dto.publicationDate && {date: dto.publicationDate}),
        ...(dto.location &&{location:dto.location})
      }

      Object.entries(filter).forEach(([key, value])=>{
          if(key==='location'|| key==='categorie'){
              arrayEvent.andWhere(`event ${key} LIKE: ${key}`,{[`${key}`]:`%${value}%`})
          }
          else{
              arrayEvent.andWhere(`event ${key} =: ${key}`,{[`${key}`]:`%${value}%`})
          }
      })

      if(dto.orderPrice &&( dto.orderPrice.toLowerCase()==='asc'|| dto.orderPrice.toLowerCase()==='desc')){
        const order : 'ASC' | 'DESC' = dto.orderPrice.toLowerCase() === 'asc'? 'ASC' : 'DESC'
        arrayEvent.addOrderBy('service.price',order)
      }

      if(dto.orderRating &&( dto.orderRating.toLowerCase()==='asc'|| dto.orderRating.toLowerCase()==='desc')){
        const order : 'ASC' | 'DESC' = dto.orderRating.toLowerCase() === 'asc'? 'ASC' : 'DESC'
        arrayEvent.addOrderBy('service.rating',order)
      }
        return await arrayEvent.getMany()
    }
    catch(error){
      throw new InternalServerErrorException("Error al encontrar el evento"+ error)
    }    
  }
  
}
