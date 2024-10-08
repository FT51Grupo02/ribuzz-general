/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity'
import {FilterDto} from './Dto/filters.dto' 
import { Services } from 'src/Entidades/services.entity';
import { Events } from 'src/Entidades/events.entity';
import { DateFormatService } from 'src/DateFormat/dateformat.service';
//import { query } from 'express';


@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Services)
    private readonly serviceRepository: Repository<Services>,
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    private readonly dataFormatService : DateFormatService
  ) {}
  


  async searchProducts(dto:FilterDto):Promise<Products[]> {
      try{

        const arrayProduct = await this.productRepository.createQueryBuilder('product')
        
      
        const textFilters = {
          ...(dto.name && { name: dto.name }),
          ...(dto.populate && { populate: dto.populate }),
          ...(dto.publicateDate && {publicateDate:dto.publicateDate})
        };
    
        const numberFilters = {
          ...(dto.price && { price: dto.price }),
          ...(dto.rating && { rating: dto.rating }),
        };
    
        if(Object.keys(textFilters).length>0){
          Object.entries(textFilters).forEach(([key, value]) => {
            arrayProduct.andWhere(`product.${key} ILIKE :${key}`, { [`${key}`]: `%${value}%` });
          });
        }
        
        if(Object.keys(numberFilters).length>0){
          Object.entries(numberFilters).forEach(([key, value]) => {
            arrayProduct.andWhere(`product.${key} = :${key}`, { [`${key}`]: value });
          });
        }

        if (dto.publicateDate) {
          arrayProduct.andWhere('product.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
        }

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

  async searchServices(dto: FilterDto): Promise<Services[]> {
    try {
        const arrayService = this.serviceRepository.createQueryBuilder('service');
        
        const textFilters ={
          ...(dto.name && { name: dto.name }),
          ...(dto.duration && {duration:dto.duration}),
          ...(dto.location && { location: dto.location })
      }
       
        const numberFilters  = {
            
            ...(dto.price && {price:dto.price}),
            ...(dto.rating && { rating: dto.rating }),
          };
          

        // Aplicar filtros
        Object.entries(textFilters).forEach(([key, value]) => {
            arrayService.andWhere(`service.${key} ILIKE :${key}`, { [`${key}`]: `%${value}%` });
        });

        Object.entries(numberFilters).forEach(([key, value]) => {
            arrayService.andWhere(`service.${key} = :${key}`, { [`${key}`]: value });
        })

        if (dto.publicateDate) {
          arrayService.andWhere('service.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
        }  
      
        if (dto.categories) {
            const categoriesArray = Array.isArray(dto.categories) ? dto.categories : [dto.categories];

            arrayService.innerJoinAndSelect('event.categories', 'category')
                      .andWhere('category.name IN (:...categories)', { categories: categoriesArray });
        }


        if (dto.orderPrice && (dto.orderPrice.toLowerCase() === 'asc' || dto.orderPrice.toLowerCase() === 'desc')) {
            const order: 'ASC' | 'DESC' = dto.orderPrice.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
            arrayService.addOrderBy('service.price', order);
        }

     
        if (dto.orderRating && (dto.orderRating.toLowerCase() === 'asc' || dto.orderRating.toLowerCase() === 'desc')) {
            const order: 'ASC' | 'DESC' = dto.orderRating.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
            arrayService.addOrderBy('service.rating', order);
        }

        return await arrayService.getMany();
    } catch (error) {
        console.error('Error al encontrar el evento:', error);
        throw new InternalServerErrorException('Error al encontrar el evento: ' + error);
    }
}

  async searchEvents(dto: FilterDto): Promise<Events[]> {
    try {
        const arrayEvent = this.eventRepository.createQueryBuilder('event')

        const textFilters ={
          ...(dto.name && { name: dto.name }),
          ...(dto.location && { location: dto.location })
        }

        const numberFilters = {
            ...(dto.price && {price:dto.price}),
            ...(dto.rating && { rating: dto.rating }),
        };

        // Aplicar filtros
        Object.entries(textFilters).forEach(([key, value]) => {
            arrayEvent.andWhere(`event.${key} ILIKE :${key}`, { [`${key}`]: `%${value}%` });
        });
        
        Object.entries(numberFilters).forEach(([key, value]) => {
          arrayEvent.andWhere(`event.${key} = :${key}`, { [`${key}`]: value });
      });

      //filtro de fecha de publicación
      if (dto.publicateDate) {
        arrayEvent.andWhere('event.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
      }
      
      if (dto.categories) {
          const categoriesArray = Array.isArray(dto.categories) ? dto.categories : [dto.categories];

          arrayEvent.innerJoinAndSelect('event.categories', 'category')
                      .andWhere('category.name IN (:...categories)', { categories: categoriesArray });
      }


        if (dto.orderPrice && (dto.orderPrice.toLowerCase() === 'asc' || dto.orderPrice.toLowerCase() === 'desc')) {
            const order: 'ASC' | 'DESC' = dto.orderPrice.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
            arrayEvent.addOrderBy('event.price', order);
        }

     
        if (dto.orderRating && (dto.orderRating.toLowerCase() === 'asc' || dto.orderRating.toLowerCase() === 'desc')) {
            const order: 'ASC' | 'DESC' = dto.orderRating.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
            arrayEvent.addOrderBy('event.rating', order);
        }
        return await arrayEvent.getMany();


    } catch (error) {
        console.error('Error al encontrar el evento:', error);
        throw new InternalServerErrorException('Error al encontrar el evento: ' + error);
    }
}

  
}
