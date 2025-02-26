import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
    @Prop({ required: true })
    date: Date = new Date();

    @Prop({ type: [String], required: true })
    productIds: string[] = [];

    @Prop({ required: true })
    total: number = 0;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
