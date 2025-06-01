import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Order} from './order.schema';
import {CreateOrderDto, UpdateOrderDto} from './order.dto';
import 'src/config';



@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        // STEP 1: Create and save the order in NestJS database FIRST
        const createdOrder = new this.orderModel(createOrderDto);
        const savedOrder = await createdOrder.save();

        // STEP 2: Send notification via Lambda (async, non-blocking)
        this.sendNotificationToLambda(savedOrder);

        return savedOrder;
    }

    /**
     * Send notification to Lambda function asynchronously
     * This method doesn't block the main order creation flow
     */
    private async sendNotificationToLambda(order: any): Promise<void> {
        const lambdaEndpoint = process.env.API_LAMBDA;

        if (!lambdaEndpoint) {
            console.warn('\n⚠️ [ORDER SERVICE] Lambda endpoint not configured - Skipping notification');
            return;
        }

        try {
            // Send order ID and essential data to Lambda for notification
            const notificationPayload = {
                orderId: order._id.toString(),
                total: order.total,
                productIds: order.productIds,
                date: order.date
            };

            const response = await fetch(lambdaEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notificationPayload),
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });

            if (response.ok) {
                console.log('\n✅ [ORDER SERVICE] Lambda notification sent successfully');
            } else {
                const errorText = await response.text();
                console.error(`\n❌ [ORDER SERVICE] Lambda responded with error: ${response.status} - ${errorText}`);

                // Fallback: Create manual notification log
                this.logManualNotification(order);
            }

        } catch (error: any) {
            console.error('\n❌ [ORDER SERVICE] Failed to connect to Lambda:', error.message);

            // Fallback: Create manual notification log
            this.logManualNotification(order);
        }
    }

    /**
     * Fallback notification when Lambda is unavailable
     */
    private logManualNotification(order: any): void {
        console.log('\n📧 [MANUAL NOTIFICATION] New order created:', {
            orderId: order._id.toString(),
            total: order.total,
            productCount: order.productIds.length,
            date: order.date,
            timestamp: new Date().toISOString(),
            status: 'FALLBACK_NOTIFICATION'
        });
    }

    async createMany(createOrderDtos: CreateOrderDto[]): Promise<Order[]> {
        const orders = await this.orderModel.insertMany(createOrderDtos);

        // Send notifications for each order asynchronously
        orders.forEach(order => this.sendNotificationToLambda(order));

        return orders;
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findOne(id: string): Promise<Order | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        return this.orderModel.findById(id).exec();
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        return this.orderModel.findByIdAndUpdate(id, updateOrderDto, {new: true}).exec();
    }

    async delete(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        await this.orderModel.findByIdAndDelete(id).exec();
    }

    async deleteAll(): Promise<void> {
        await this.orderModel.deleteMany({}).exec();
    }
}