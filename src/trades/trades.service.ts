import { Injectable } from '@nestjs/common';
import { SpotRestAPI } from '@binance/spot';
import { InjectModel } from '@nestjs/mongoose';
import { Trade } from './trades.schema';
import { Model } from 'mongoose';
import { BinanceService } from 'src/binance/binance.service';

@Injectable()
export class TradesService {
  constructor(
    @InjectModel(Trade.name) private tradeModel: Model<Trade>,
    private binanceService: BinanceService,
  ) {}

  async getRecentTrades(
    symbol: string,
  ): Promise<SpotRestAPI.GetTradesResponse> {
    try {
      const response = await this.binanceService.client.restAPI.getTrades({
        symbol,
        limit: 5,
      });
      const data = await response.data();
      await this.tradeModel.insertMany(
        data.map((trade) => ({ ...trade, symbol })),
      );
      return data;
    } catch (error) {
      throw new Error(`Error getting recent trades: ${error}`);
    }
  }
}
