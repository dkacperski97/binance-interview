import { Test, TestingModule } from '@nestjs/testing';
import { TradesService } from './trades.service';
import { BinanceService } from 'src/binance/binance.service';

describe('TradesService', () => {
  let service: TradesService;
  let binanceServiceMock: { client: { restAPI: { aggTrades: jest.Mock } } };
  const symbol = 'symbol';
  const startTime = 123;
  const endTime = 123;

  beforeEach(async () => {
    binanceServiceMock = {
      client: {
        restAPI: {
          aggTrades: jest.fn(() => ({
            data: () => [{}, {}],
          })),
        },
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradesService,
        {
          provide: BinanceService,
          useValue: binanceServiceMock,
        },
      ],
    }).compile();

    service = module.get<TradesService>(TradesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve historical data', async () => {
    await service.getRecentTrades(symbol, startTime, endTime);

    expect(binanceServiceMock.client.restAPI.aggTrades).toHaveBeenCalledTimes(
      1,
    );
  });
});
