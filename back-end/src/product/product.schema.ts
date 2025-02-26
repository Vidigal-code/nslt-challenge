import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string = "";

    @Prop({ required: true })
    description: string = "";

    @Prop({ required: true })
    price: number = 0;

    @Prop({ type: [String], required: true })
    categoryIds: string[] = [];

    @Prop()
    imageUrl?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
