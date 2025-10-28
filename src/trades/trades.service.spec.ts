import { Test, TestingModule } from '@nestjs/testing';
import { TradesService } from './trades.service';
import { BinanceService } from 'src/binance/binance.service';

describe('TradesService', () => {
  let service: TradesService;
  let binanceServiceMock: { client: { restAPI: { aggTrades: jest.Mock } } };
  const symbol = 'symbol';
  const startTime = 123;
  const endTime = 123;
  const aggTradesData: {
    data: { a?: number; p?: string }[];
  } = {
    data: [],
  };

  beforeEach(async () => {
    binanceServiceMock = {
      client: {
        restAPI: {
          aggTrades: jest.fn(() => ({
            data: () => aggTradesData.data,
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
    aggTradesData.data = [{}, {}];

    const result = await service.getRecentTrades(symbol, startTime, endTime);

    expect(binanceServiceMock.client.restAPI.aggTrades).toHaveBeenCalledTimes(
      1,
    );
    expect(result).toHaveLength(2);
    expect(result[0].priceChange).toBeUndefined();
    expect(result[1].priceChange).toBeUndefined();
  });

  it('should analyze data', async () => {
    aggTradesData.data = [{ p: '100' }, { p: '120' }];

    const result = await service.getRecentTrades(symbol, startTime, endTime);

    expect(binanceServiceMock.client.restAPI.aggTrades).toHaveBeenCalledTimes(
      1,
    );
    expect(result).toHaveLength(2);
    expect(result[0].priceChange).toBeUndefined();
    expect(result[1].priceChange).toBe(0.2);
  });

  it('should return empty array', async () => {
    aggTradesData.data = [];

    const result = await service.getRecentTrades(symbol, startTime, endTime);

    expect(binanceServiceMock.client.restAPI.aggTrades).toHaveBeenCalledTimes(
      1,
    );
    expect(result).toHaveLength(0);
  });

  it("should throw error when binance api doesn't work", async () => {
    binanceServiceMock.client.restAPI.aggTrades = jest.fn(() => {
      throw new Error('test error');
    });
    await expect(
      service.getRecentTrades(symbol, startTime, endTime),
    ).rejects.toThrow(Error);
  });
});
