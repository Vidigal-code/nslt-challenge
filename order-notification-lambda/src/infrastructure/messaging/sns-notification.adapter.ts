import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { NotificationPort } from '../../domain/ports/notification.port';
import { config } from '../../config';

export class SnsNotificationAdapter implements NotificationPort {
    private client: SNSClient;

    constructor() {
        this.client = new SNSClient({
            region: config.awsRegion || 'us-east-1',
            ...(config.nodeEnv === 'development' && {
                endpoint: config.localstackEndpoint,
                credentials: {
                    accessKeyId: config.awsAccessKeyId || 'test',
                    secretAccessKey: config.awsSecretAccessKey || 'test',
                },
            }),
        });
    }

    async publish(message: Record<string, any>): Promise<void> {
        if (!config.snsTopicArn) {
            console.warn('SNS Topic ARN not configured, logging notification instead');
            console.log('\n[NOTIFICATION LOGGED]', message);
            return;
        }
        const command = new PublishCommand({
            TopicArn: config.snsTopicArn,
            Message: JSON.stringify(message),
        });
        await this.client.send(command);
    }
}

