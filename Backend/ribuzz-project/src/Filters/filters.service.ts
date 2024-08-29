/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity'
import {FilterDto} from './Dto/filters.dto' 

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async search(dto:FilterDto): Promise<Products[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Construir filtros dinámicamente
    const filters = {
      ...(dto.categorie && { categorie: `%${dto.categorie}%` }),
      ...(dto.price && { price: dto.price }),
      ...(dto.rate && { rate: dto.rate }),
      ...(dto.publicationDate && { publicationDate: dto.publicationDate }),
      ...(dto.populate && { populate: dto.populate }),
      ...(dto.location && { location: dto.location }),
    };

    // Aplicar filtros
    Object.entries(filters).forEach(([key, value]) => {
        if (key === 'categorie' || key === 'location') {
          queryBuilder.andWhere(`product.${key} LIKE :${key}`, { [`${key}`]: value });
        } else {
          queryBuilder.andWhere(`product.${key} = :${key}`, { [`${key}`]: value });
        }
      });

    return await queryBuilder.getMany();
  }
}
