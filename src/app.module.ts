import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradesModule } from './trades/trades.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StrategyModule } from './strategy/strategy.module';
import { BinanceService } from './binance/binance.service';
import { BinanceModule } from './binance/binance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TradesModule,
    StrategyModule,
    BinanceModule,
  ],
  controllers: [AppController],
  providers: [AppService, BinanceService],
})
export class AppModule {}
