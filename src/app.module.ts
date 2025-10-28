import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService, BinanceService],
})
export class AppModule {}
