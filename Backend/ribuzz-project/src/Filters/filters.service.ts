/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity'
import {FilterDto} from './Dto/filters.dto' 
import { Services } from 'src/Entidades/services.entity';


@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Services)
    private readonly serviceRepository: Repository<Services>
  ) {}

  async searchProducts(dto:FilterDto):Promise<Products[]> {
      try{

        const arrayProduct = await this.productRepository.createQueryBuilder('product')
      
        const filter = {

          ...(dto.name && {name:dto.name}),
          ...(dto.categorie && {categorie:dto.categorie}),
          ...(dto.price && {price:dto.price}),
          ...(dto.rating && {rating:dto.rating}),
          ...(dto.populate && {populate:dto.populate}),
       
        }
        
        //Aplicación de los filtros establecidos 

        Object.entries(filter).forEach(([key, value]) => {
          if (key === 'categorie') {
            arrayProduct.andWhere(`product.${key} LIKE: ${key}`,{[`${key}`]:`%${value}%`})
          } else {
            arrayProduct.andWhere(`product.${key} = :${key}`, { [`${key}`]: value });
          }
        })

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
        ...(dto.categorie && {categorie:dto.categorie}),
        ...(dto.price && {price:dto.price}),
        ...(dto.rating && {rating:dto.rating}),
        ...(dto.duration && {duration:dto.duration}),
     
      }
      
      //Aplicación de los filtros establecidos 

      Object.entries(filter).forEach(([key, value]) => {
        if (key === 'categorie') {
          arrayService.andWhere(`service.${key} LIKE: ${key}`,{[`${key}`]:`%${value}%`})
        } else {
          arrayService.andWhere(`service.${key} = :${key}`, { [`${key}`]: value });
        }
      })
      //Deteccción de mayusculas y minusculas de l nombre del servicio:

      if(dto.name &&())

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
      throw new InternalServerErrorException("Error al encontrar el producto"+ error) 
    }
}
  
}
