/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';



describe('UserService', () => {
  let services: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesService]
    }).compile();

    services = module.get<ServicesService>(ServicesService);
  });

  it('should be defined', () => {
    expect(services).toBeDefined();
  });
});  