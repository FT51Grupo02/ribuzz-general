/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from './services.controller';


describe('UserService', () => {
  let controller: ServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController]
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});  