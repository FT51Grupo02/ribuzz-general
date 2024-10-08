/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './Categorias/categories.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './Auth/auth.module';
import { FileUploudModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { ServicesModule } from './services/services.module';
import { OrderModule } from './orders/orders.module';
import { EventModule } from './Eventos/events.module';
import { StripeModule } from './stripe/stripe.module';
import { FilterModule } from './Filters/filters.module';
import { authAdminModule } from './Asig_Admin/asigAdmin.module';
import { ReviewsModule } from './reviews/reviews.module';
import { DateFormatModule } from './DateFormat/dateformat.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
      }),
    }),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn:'1h'}
    }),
    CategoriesModule,
    UsuarioModule,
    ProductsModule,
    FileUploudModule,
    AuthModule,
    ServicesModule,
    OrderModule,
    EventModule,
    StripeModule,
    FilterModule,
    authAdminModule,
    ReviewsModule,
    DateFormatModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
