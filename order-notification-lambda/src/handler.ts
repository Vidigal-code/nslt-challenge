/*
# Test Offline Example

## 2. Asynchronous Task (Serverless Framework)

This section demonstrates how to use the **Serverless Framework** to create an **AWS Lambda function** that performs an asynchronous task in the background.

### 2.1. Lambda Function

We will create a Lambda function to process **sales reports** based on **orders**. This example shows how to handle background tasks that do not require immediate user interaction.
*/

import mongoose from 'mongoose';
import { config } from './config';
import { MongoOrderRepository } from './infrastructure/repositories/mongo-order.repository';
import { SnsNotificationAdapter } from './infrastructure/messaging/sns-notification.adapter';
import { SendOrderNotificationUseCase } from './application/use-cases/send-order-notification.usecase';
import { ProcessSalesReportUseCase } from './application/use-cases/process-sales-report.usecase';
import { Errors } from './shared/errors';

let connected = false;
export async function connectToMongo(): Promise<void> {
    if (connected) return;
    if (!config.mongoUri) {
        throw new Error(Errors.BAD_REQUEST);
    }
    await mongoose.connect(config.mongoUri);
    connected = true;
}

export function buildDependencies() {
    const orderRepo = new MongoOrderRepository();
    const notifier = new SnsNotificationAdapter();
    return {
        sendOrderNotificationUseCase: new SendOrderNotificationUseCase(orderRepo, notifier),
        processSalesReportUseCase: new ProcessSalesReportUseCase(orderRepo, notifier),
    };
}

