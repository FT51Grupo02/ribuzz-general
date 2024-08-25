/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FileUploudService } from './file-upload.service';

describe('UserService', () => {
  let service: FileUploudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploudService]
    }).compile();

    service = module.get<FileUploudService>(FileUploudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});