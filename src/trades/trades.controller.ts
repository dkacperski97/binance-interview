import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { TradesService } from './trades.service';
import { SpotRestAPI } from '@binance/spot';

@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Get()
  async getRecentTrades(
    @Query('symbol') symbol?: string,
    @Query('startTime') startTime?: number,
    @Query('endTime') endTime?: number,
  ): Promise<SpotRestAPI.GetTradesResponse> {
    if (symbol === undefined) {
      throw new BadRequestException("Missing required query param: 'symbol'");
    }
    if (startTime === undefined) {
      throw new BadRequestException(
        "Missing required query param: 'startTime'",
      );
    }
    if (endTime === undefined) {
      throw new BadRequestException("Missing required query param: 'endTime'");
    }
    return this.tradesService.getRecentTrades(symbol, startTime, endTime);
  }
}
