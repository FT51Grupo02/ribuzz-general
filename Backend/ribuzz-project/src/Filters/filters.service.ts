import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Entidades/products.entity';
import { Services } from 'src/Entidades/services.entity';
import { Events } from 'src/Entidades/events.entity';
import { FilterDto } from './Dto/filters.dto';

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

  async searchProducts(dto: FilterDto): Promise<Products[]> {
    try {
      const arrayProduct = this.productRepository.createQueryBuilder('product')
        .leftJoinAndSelect('product.categories', 'category')
        .leftJoin('DETAILS_ORDER_PRODUCTS', 'details', 'details.productsId = product.id')
        .leftJoin('details.order', 'order');

      if (dto.name) {
        arrayProduct.andWhere('product.name ILIKE :name', { name: `%${dto.name}%` });
      }

      if (dto.price) {
        arrayProduct.andWhere('product.price = :price', { price: dto.price });
      }

      if (dto.rating) {
        arrayProduct.andWhere('product.rating = :rating', { rating: dto.rating });
      }

      if (dto.publicateDate) {
        arrayProduct.andWhere('product.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
      }

      if (dto.categories) {
        arrayProduct.andWhere('category.name = :category', { category: dto.categories });
      }

      if (dto.orderPrice) {
        arrayProduct.addOrderBy('product.price', dto.orderPrice);
      }

      if (dto.orderRating) {
        arrayProduct.addOrderBy('product.rating', dto.orderRating);
      }

      if (dto.orderPopularity) {
        arrayProduct.addSelect('COUNT(DISTINCT order.id)', 'orderCount')
          .groupBy('product.id')
          .addOrderBy('orderCount', dto.orderPopularity);
      }

      return await arrayProduct.getMany();
    } catch (error) {
      throw new InternalServerErrorException("Error al encontrar el producto: " + error);
    }
  }

  async searchServices(dto: FilterDto): Promise<Services[]> {
    try {
      const arrayService = this.serviceRepository.createQueryBuilder('service')
        .leftJoinAndSelect('service.categories', 'category')
        .leftJoin('DETAILS_ORDER_SERVICE', 'details', 'details.serviceId = service.id')
        .leftJoin('details.order', 'order');

      if (dto.name) {
        arrayService.andWhere('service.name ILIKE :name', { name: `%${dto.name}%` });
      }

      if (dto.price) {
        arrayService.andWhere('service.price = :price', { price: dto.price });
      }

      if (dto.rating) {
        arrayService.andWhere('service.rating = :rating', { rating: dto.rating });
      }

      if (dto.publicateDate) {
        arrayService.andWhere('service.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
      }

      if (dto.location) {
        arrayService.andWhere("service.providerInfo->>'location' ILIKE :location", { location: `%${dto.location}%` });
      }

      if (dto.categories) {
        arrayService.andWhere('category.name = :category', { category: dto.categories });
      }

      if (dto.orderPrice) {
        arrayService.addOrderBy('service.price', dto.orderPrice);
      }

      if (dto.orderRating) {
        arrayService.addOrderBy('service.rating', dto.orderRating);
      }

      if (dto.orderPopularity) {
        arrayService.addSelect('COUNT(DISTINCT order.id)', 'orderCount')
          .groupBy('service.id')
          .addOrderBy('orderCount', dto.orderPopularity);
      }

      return await arrayService.getMany();
    } catch (error) {
      throw new InternalServerErrorException("Error al encontrar el servicio: " + error);
    }
  }

  async searchEvents(dto: FilterDto): Promise<Events[]> {
    try {
      const arrayEvent = this.eventRepository.createQueryBuilder('event')
        .leftJoinAndSelect('event.categories', 'category')
        .leftJoin('DETAILS_ORDER_EVENTS', 'details', 'details.eventsId = event.id')
        .leftJoin('details.order', 'order');

      if (dto.name) {
        arrayEvent.andWhere('event.name ILIKE :name', { name: `%${dto.name}%` });
      }

      if (dto.price) {
        arrayEvent.andWhere('event.price = :price', { price: dto.price });
      }

      if (dto.rating) {
        arrayEvent.andWhere('event.rating = :rating', { rating: dto.rating });
      }

      if (dto.publicateDate) {
        arrayEvent.andWhere('event.publicateDate = :publicateDate', { publicateDate: dto.publicateDate });
      }

      if (dto.location) {
        arrayEvent.andWhere('event.location ILIKE :location', { location: `%${dto.location}%` });
      }

      if (dto.categories) {
        arrayEvent.andWhere('category.name = :category', { category: dto.categories });
      }

      if (dto.orderPrice) {
        arrayEvent.addOrderBy('event.price', dto.orderPrice);
      }

      if (dto.orderRating) {
        arrayEvent.addOrderBy('event.rating', dto.orderRating);
      }

      if (dto.orderPopularity) {
        arrayEvent.addSelect('COUNT(DISTINCT order.id)', 'orderCount')
          .groupBy('event.id')
          .addOrderBy('orderCount', dto.orderPopularity);
      }

      return await arrayEvent.getMany();
    } catch (error) {
      throw new InternalServerErrorException("Error al encontrar el evento: " + error);
    }
  }
}