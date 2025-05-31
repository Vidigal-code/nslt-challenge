import { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
    date: Date;
    productIds: string[];
    total: number;
}

const orderSchema = new Schema<IOrder>({
    date: { type: Date, required: true },
    productIds: { type: [String], required: true },
    total: { type: Number, required: true },
});

const Order = model<IOrder>('Order', orderSchema);

export default Order;
