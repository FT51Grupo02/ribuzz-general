import { Controller, Get, Post, Body, Param, Delete, Put, Query} from '@nestjs/common';
import { CreateReviewDto } from './dto/review.dto';
import { ReviewsService } from './reviews.service';
/*import { EntrepreneurGuard } from 'src/Guardianes/entrepreneur.guard';
import { AdminGuard } from 'src/Guardianes/admin.guard';*/

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService:ReviewsService) {}

  @Post()
  createUser(@Body() review:CreateReviewDto) {
    return this.reviewsService.AddProductReview(review);
  }


//   @Get()
//   findAll(@Query(`page`) page:number, @Query(`limit`) limit:number) {
//     if (page && limit){
//       return this.ReviewsService.findAll(page,limit );  
//     }
//     return this.ReviewsService.findAll(1, 3);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.ReviewsService.findOne(id);
//   }

//   //@UseGuards(EntrepreneurGuard)
//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateUsuarioDto) {
//     return this.ReviewsService.update(id, updateUsuarioDto);
//   }
  
//   //@UseGuards(AdminGuard)
//   @Delete(':id')
//   deleteUser(@Param(`id`) id:string){
//     return this.ReviewsService.deleteUser(id);
//   }

 }
  