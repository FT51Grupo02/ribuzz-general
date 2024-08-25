/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesControl } from './categories.controller';

describe('UserService', () => {
  let controller: CategoriesControl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesControl]
    }).compile();

    controller = module.get<CategoriesControl>(CategoriesControl);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});