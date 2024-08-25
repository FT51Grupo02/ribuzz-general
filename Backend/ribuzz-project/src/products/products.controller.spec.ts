/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Products } from 'src/Entidades/products.entity';
import { ProductsControler } from './products.controller';


describe('UserService', () => {
  let controller: ProductsControler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsControler]
    }).compile();

    controller = module.get<ProductsControler>(ProductsControler);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});  