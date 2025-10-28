import { Injectable } from '@nestjs/common';
import { SpotRestAPI } from '@binance/spot';
import { BinanceService } from 'src/binance/binance.service';

interface GetRecentTradesResponse {
  aggregateTradeId?: number;
  priceChange?: number;
  price?: string;
}
@Injectable()
export class TradesService {
  constructor(private binanceService: BinanceService) {}

  async getRecentTrades(
    symbol: string,
    startTime: number,
    endTime: number,
  ): Promise<GetRecentTradesResponse[]> {
    try {
      const response = await this.binanceService.client.restAPI.aggTrades({
        symbol,
        limit: 5,
        startTime,
        endTime,
      });
      const data = await response.data();
      const result: GetRecentTradesResponse[] = [
        this.mapTradeToResponse(data[0]),
      ];
      for (let i = 1; i < data.length; i++) {
        const oldTradeData = data[i - 1];
        const newTradeData = data[i];

        const priceChange = this.getPriceChange(
          Number(oldTradeData.p),
          Number(newTradeData.p),
        );

        result.push({ ...this.mapTradeToResponse(newTradeData), priceChange });
      }
      return result;
    } catch (error) {
      throw new Error(`Error getting recent trades: ${error}`);
    }
  }

  private getPriceChange(oldPrice: number, newPrice: number) {
    return (newPrice - oldPrice) / oldPrice;
  }

  private mapTradeToResponse(
    trade: SpotRestAPI.AggTradesResponseInner,
  ): GetRecentTradesResponse {
    return {
      aggregateTradeId: trade.a,
      price: trade.p,
    };
  }
}
