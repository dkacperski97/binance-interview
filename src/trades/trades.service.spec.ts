import { Test, TestingModule } from '@nestjs/testing';
import { TradesService } from './trades.service';
import { BinanceService } from 'src/binance/binance.service';

describe('TradesService', () => {
  let service: TradesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradesService,
        {
          provide: BinanceService,
          useValue: {
            client: {},
          },
        },
      ],
    })
      .overrideProvider(BinanceService)
      .useValue({})
      .compile();

    service = module.get<TradesService>(TradesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
