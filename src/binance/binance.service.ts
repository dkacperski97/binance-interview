import { Injectable } from '@nestjs/common';
import { Spot } from '@binance/spot';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BinanceService {
  client: Spot;

  constructor(configService: ConfigService) {
    const configurationRestAPI = {
      apiKey: configService.getOrThrow<string>('API_KEY'),
      apiSecret: configService.getOrThrow<string>('API_SECRET'),
    };

    this.client = new Spot({ configurationRestAPI });
  }
}
