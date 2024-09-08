import { Controller, Get, Post, Body, Param, Delete, Put, Query} from '@nestjs/common';
import { CreateReviewDto } from './dto/review.dto';
import { ReviewsService } from './reviews.service';
import { ApiTags } from '@nestjs/swagger';
/*import { EntrepreneurGuard } from 'src/Guardianes/entrepreneur.guard';
import { AdminGuard } from 'src/Guardianes/admin.guard';*/


@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService:ReviewsService) {}

  @Post('products')
  createReviewproduct(@Body() review:CreateReviewDto) {
    return this.reviewsService.AddProductReview(review);
  }
  @Post('event')
  createReviewEvent(@Body() review) {
    return this.reviewsService.AddEventReview(review);
  }
  @Post('service')
  createReviewService(@Body() review) {
    return this.reviewsService.AddServiceReview(review);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

 
  //@UseGuards(AdminGuard)
  @Delete(':id')
  deleteReview(@Param(`id`) id:string){
    return this.reviewsService.deleteReview(id);
  }

 }
  