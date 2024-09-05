/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service'; 
import { Users } from '../Entidades/user.entity';
//import { Events } from 'src/Entidades/events.entity';
import { Orders } from 'src/Entidades/orders.entity';
import { Review } from 'src/Entidades/reviews';
import { Products } from 'src/Entidades/products.entity';
import { Services } from 'src/Entidades/services.entity';
import { Events } from 'src/Entidades/events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Review,Products,Events,Services])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule{} 