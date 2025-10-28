import { Injectable } from '@nestjs/common';
import { Spot, SpotRestAPI } from '@binance/spot';
import { InjectModel } from '@nestjs/mongoose';
import { Trade } from './trades.schema';
import { Model } from 'mongoose';

@Injectable()
export class TradesService {
  private client: Spot;

  constructor(@InjectModel(Trade.name) private tradeModel: Model<Trade>) {
    const configurationRestAPI = {
      apiKey: 'your-api-key',
      apiSecret: 'your-api-secret',
    };

    this.client = new Spot({ configurationRestAPI });
  }

  async getRecentTrades(
    symbol: string,
  ): Promise<SpotRestAPI.GetTradesResponse> {
    try {
      const response = await this.client.restAPI.getTrades({
        symbol,
        limit: 5,
      });
      const data = await response.data();
      await this.tradeModel.insertMany(data);
      return data;
    } catch (error) {
      throw new Error(`Error getting recent trades: ${error}`);
    }
  }
}
