/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Products } from 'src/Entidades/products.entity';
import { ProductsController } from './products.controller';


describe('UserService', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});  