/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Products } from 'src/Entidades/products.entity';
import { FileUploudController } from './file-upload.controller';


describe('UserService', () => {
  let controller: FileUploudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploudController]
    }).compile();

    controller = module.get<FileUploudController>(FileUploudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});  