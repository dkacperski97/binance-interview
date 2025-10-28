import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trade extends Document {
  @Prop() symbol: string;
  @Prop() price: number;
  @Prop() qty: number;
  @Prop() isBuyerMaker: boolean;
  @Prop() time: number;
  @Prop() bought: boolean;
  @Prop() sold: boolean;
}

export const TradeSchema = SchemaFactory.createForClass(Trade);
