import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { StrategyController } from './strategy.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trade, TradeSchema } from '../trades/trades.schema';
import { BinanceModule } from '../binance/binance.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trade.name, schema: TradeSchema }]),
    BinanceModule,
  ],
  providers: [StrategyService],
  controllers: [StrategyController],
})
export class StrategyModule {}
