/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EventosService} from "./events.service";

describe('UserService', () => {
  let service: EventosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosService]
    }).compile();

    service = module.get<EventosService>(EventosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});