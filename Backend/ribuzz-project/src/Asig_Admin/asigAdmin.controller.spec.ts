/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { giveAdminController } from './asigAdmin.controller';

describe('UserService', () => {
  let controller: giveAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [giveAdminController]
    }).compile();

    controller = module.get<giveAdminController>(giveAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});