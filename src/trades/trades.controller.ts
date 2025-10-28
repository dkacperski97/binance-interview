import { Controller, Get, Query } from '@nestjs/common';
import { TradesService } from './trades.service';
import { SpotRestAPI } from '@binance/spot';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Get()
  async getRecentTrades(
    @Query('symbol') symbol: string,
    @Query('startTime') startTime: number,
    @Query('endTime') endTime: number,
  ): Promise<SpotRestAPI.GetTradesResponse> {
    return this.tradesService.getRecentTrades(symbol, startTime, endTime);
  }
}
