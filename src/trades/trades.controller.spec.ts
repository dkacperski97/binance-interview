import { Test, TestingModule } from '@nestjs/testing';
import { TradesController } from './trades.controller';
import { BinanceService } from 'src/binance/binance.service';
import { TradesService } from './trades.service';
import { BadRequestException } from '@nestjs/common';

describe('TradesController', () => {
  let controller: TradesController;
  let tradesServiceMock: { getRecentTrades: jest.Mock };

  const symbol = 'symbol';
  const startTime = 123;
  const endTime = 123;

  beforeEach(async () => {
    tradesServiceMock = {
      getRecentTrades: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradesController],
      providers: [
        { provide: BinanceService, useValue: {} },
        {
          provide: TradesService,
          useValue: tradesServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TradesController>(TradesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should retrieve historical data', async () => {
    await controller.getRecentTrades(symbol, startTime, endTime);

    expect(tradesServiceMock.getRecentTrades).toHaveBeenCalledTimes(1);
  });

  it.skip('should throw when symbol is undefined', () => {
    expect(async () => {
      await controller.getRecentTrades(undefined, startTime, endTime);
    }).toThrow(BadRequestException);
  });
});
