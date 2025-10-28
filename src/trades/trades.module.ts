import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trade, TradeSchema } from './trades.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trade.name, schema: TradeSchema }]),
  ],
  providers: [TradesService],
  controllers: [TradesController],
})
export class TradesModule {}
