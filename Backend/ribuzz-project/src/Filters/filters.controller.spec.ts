/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FilterController } from './filters.controller';

describe('FilterController', () => {
  let controller: FilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterController]
    }).compile();

    controller = module.get<FilterController>(FilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});