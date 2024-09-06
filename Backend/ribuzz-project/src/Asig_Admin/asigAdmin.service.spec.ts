/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { giveAdminService } from './asigAdmin.service';

describe('giveAdminService', () => {
  let service: giveAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [giveAdminService]
    }).compile();

    service = module.get<giveAdminService>(giveAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});