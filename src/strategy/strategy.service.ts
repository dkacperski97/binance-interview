import { Injectable } from '@nestjs/common';
import { SpotRestAPI } from '@binance/spot';
import { InjectModel } from '@nestjs/mongoose';
import { Trade } from '../trades/trades.schema';
import { Model } from 'mongoose';
import { BinanceService } from 'src/binance/binance.service';

@Injectable()
export class StrategyService {
  private readonly dropThreshold = 0.02;
  private readonly riseThreshold = 0.03;

  constructor(
    @InjectModel(Trade.name) private tradeModel: Model<Trade>,
    private binanceService: BinanceService,
  ) {}

  private async buySymbol(symbol: string) {
    await this.binanceService.client.restAPI.newOrder({
      symbol,
      side: SpotRestAPI.NewOrderSideEnum.BUY,
      type: SpotRestAPI.NewOrderTypeEnum.STOP_LOSS,
    });
  }

  private async sellSymbol(symbol: string) {
    await this.binanceService.client.restAPI.newOrder({
      symbol,
      side: SpotRestAPI.NewOrderSideEnum.SELL,
      type: SpotRestAPI.NewOrderTypeEnum.STOP_LOSS,
    });
  }

  async getStrategy(symbol: string) {
    const recentlyBought = await this.tradeModel
      .findOne({ symbol, bought: { $exists: true } })
      .sort({ createdAt: -1 })
      .exec();

    const recentTrade = await this.tradeModel
      .findOne({ symbol })
      .sort({ createdAt: -1 })
      .exec();

    if (!recentTrade) {
      throw new Error(`Error getting recent trade`);
    }

    if (!recentlyBought) {
      await this.tradeModel.updateOne(
        { _id: recentTrade._id },
        { $set: { bought: true } },
      );
      //   await this.buySymbol(symbol);
      return 'BUY';
    }

    const priceChange =
      (recentTrade.price - recentlyBought.price) / recentlyBought.price;

    if (priceChange <= -this.dropThreshold) {
      await this.tradeModel.updateOne(
        { _id: recentTrade._id },
        { $set: { bought: true } },
      );
      return 'BUY';
    } else if (priceChange >= this.riseThreshold) {
      await this.tradeModel.updateOne(
        { _id: recentTrade._id },
        { $set: { sold: true } },
      );
      return 'SELL';
    }

    return;
  }
}
