import { Module } from '@nestjs/common';
import { TradesModule } from './trades/trades.module';
import { ConfigModule } from '@nestjs/config';
import { BinanceService } from './binance/binance.service';
import { BinanceModule } from './binance/binance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TradesModule,
    BinanceModule,
  ],
  providers: [BinanceService],
})
export class AppModule {}
