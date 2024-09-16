import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity';
import { Services } from 'src/Entidades/services.entity';
import { Events } from 'src/Entidades/events.entity';
import { FilterDto } from './Dto/filters.dto';
import { DateFormatService } from 'src/DateFormat/dateformat.service';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(Services)
    private readonly serviceRepository: Repository<Services>,
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    private readonly dataFormatService: DateFormatService
  ) {}

  async searchProducts(dto: FilterDto): Promise<Products[]> {
    try {
      const arrayProduct = this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.orders', 'order')
        .leftJoinAndSelect('product.categories', 'category');

      const textFilters = {
        ...(dto.name && { name: dto.name }),
        ...(dto.populate && { populate: dto.populate }),
      };

      const numberFilters = {
        ...(dto.price && { price: dto.price }),
        ...(dto.rating && { rating: dto.rating }),
      };

      if (Object.keys(textFilters).length > 0) {
        Object.entries(textFilters).forEach(([key, value]) => {
          arrayProduct.andWhere(`product.${key} ILIKE :${key}`, { [`${key}`]: `%${value}%` });
        });
      }

      if (Object.keys(numberFilters).length > 0) {
        Object.entries(numberFilters).forEach(([key, value]) => {
          arrayProduct.andWhere(`product.${key} = :${key}`, { [`${key}`]: value });
        });
      }

      if (dto.publicateDate) {
        arrayProduct.andWhere('product.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
      }

      if (dto.categories) {
        const categoriesArray = Array.isArray(dto.categories) ? dto.categories : [dto.categories];
        arrayProduct.andWhere('category.name IN (:...categories)', { categories: categoriesArray });
      }

      if (dto.orderPrice && (dto.orderPrice.toLowerCase() === 'asc' || dto.orderPrice.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderPrice.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayProduct.addOrderBy('product.price', order);
      }

      if (dto.orderRating && (dto.orderRating.toLowerCase() === 'asc' || dto.orderRating.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderRating.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayProduct.addOrderBy('product.rating', order);
      }

      if (dto.orderPopularity && (dto.orderPopularity.toLowerCase() === 'asc' || dto.orderPopularity.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderPopularity.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayProduct.addSelect('COUNT(order.id)', 'orderCount')
                    .groupBy('product.id')
                    .addOrderBy('orderCount', order);
      }

      return await arrayProduct.getMany();
    } catch (error) {
      throw new InternalServerErrorException("Error al encontrar el producto: " + error);
    }
  }

  async searchServices(dto: FilterDto): Promise<Services[]> {
    try {
      const arrayService = this.serviceRepository.createQueryBuilder('service')
        .leftJoinAndSelect('service.orders', 'order')
        .leftJoinAndSelect('service.categories', 'category');

      const textFilters = {
        ...(dto.name && { name: dto.name }),
        ...(dto.duration && { duration: dto.duration }),
        ...(dto.location && { location: dto.location })
      };

      const numberFilters = {
        ...(dto.price && { price: dto.price }),
        ...(dto.rating && { rating: dto.rating }),
      };

      Object.entries(textFilters).forEach(([key, value]) => {
        arrayService.andWhere(`service.${key} ILIKE :${key}`, { [`${key}`]: `%${value}%` });
      });

      Object.entries(numberFilters).forEach(([key, value]) => {
        arrayService.andWhere(`service.${key} = :${key}`, { [`${key}`]: value });
      });

      if (dto.publicateDate) {
        arrayService.andWhere('service.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
      }

      if (dto.categories) {
        const categoriesArray = Array.isArray(dto.categories) ? dto.categories : [dto.categories];
        arrayService.andWhere('category.name IN (:...categories)', { categories: categoriesArray });
      }

      if (dto.orderPrice && (dto.orderPrice.toLowerCase() === 'asc' || dto.orderPrice.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderPrice.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayService.addOrderBy('service.price', order);
      }

      if (dto.orderRating && (dto.orderRating.toLowerCase() === 'asc' || dto.orderRating.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderRating.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayService.addOrderBy('service.rating', order);
      }

      if (dto.orderPopularity && (dto.orderPopularity.toLowerCase() === 'asc' || dto.orderPopularity.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderPopularity.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayService.addSelect('COUNT(order.id)', 'orderCount')
                    .groupBy('service.id')
                    .addOrderBy('orderCount', order);
      }

      return await arrayService.getMany();
    } catch (error) {
      console.error('Error al encontrar el servicio:', error);
      throw new InternalServerErrorException('Error al encontrar el servicio: ' + error);
    }
  }

  async searchEvents(dto: FilterDto): Promise<Events[]> {
    try {
      const arrayEvent = this.eventRepository.createQueryBuilder('event')
        .leftJoinAndSelect('event.orders', 'order')
        .leftJoinAndSelect('event.categories', 'category');

      const textFilters = {
        ...(dto.name && { name: dto.name }),
        ...(dto.location && { location: dto.location })
      };

      const numberFilters = {
        ...(dto.price && { price: dto.price }),
        ...(dto.rating && { rating: dto.rating }),
      };

      Object.entries(textFilters).forEach(([key, value]) => {
        arrayEvent.andWhere(`event.${key} ILIKE :${key}`, { [`${key}`]: `%${value}%` });
      });

      Object.entries(numberFilters).forEach(([key, value]) => {
        arrayEvent.andWhere(`event.${key} = :${key}`, { [`${key}`]: value });
      });

      if (dto.publicateDate) {
        arrayEvent.andWhere('event.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
      }

      if (dto.categories) {
        const categoriesArray = Array.isArray(dto.categories) ? dto.categories : [dto.categories];
        arrayEvent.andWhere('category.name IN (:...categories)', { categories: categoriesArray });
      }

      if (dto.orderPrice && (dto.orderPrice.toLowerCase() === 'asc' || dto.orderPrice.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderPrice.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayEvent.addOrderBy('event.price', order);
      }

      if (dto.orderRating && (dto.orderRating.toLowerCase() === 'asc' || dto.orderRating.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderRating.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayEvent.addOrderBy('event.rating', order);
      }

      if (dto.orderPopularity && (dto.orderPopularity.toLowerCase() === 'asc' || dto.orderPopularity.toLowerCase() === 'desc')) {
        const order: 'ASC' | 'DESC' = dto.orderPopularity.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
        arrayEvent.addSelect('COUNT(order.id)', 'orderCount')
                  .groupBy('event.id')
                  .addOrderBy('orderCount', order);
      }

      return await arrayEvent.getMany();
    } catch (error) {
      console.error('Error al encontrar el evento:', error);
      throw new InternalServerErrorException('Error al encontrar el evento: ' + error);
    }
  }
}