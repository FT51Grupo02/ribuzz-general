/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { EventService} from "./events.service";

describe('UserService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService]
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});