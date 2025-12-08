import * as dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
    'NODE_ENV',
    'MONGO_URI',
    'SNS_TOPIC_ARN',
    'SNS_TOPIC_NAME',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_REGION',
];

const validateEnv = () => {
    const missing = requiredEnvVars.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

validateEnv();

export const config = {
    nodeEnv: process.env.NODE_ENV!,
    mongoUri: process.env.MONGO_URI!,
    snsTopicArn: process.env.SNS_TOPIC_ARN!,
    snsTopicName: process.env.SNS_TOPIC_NAME!,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    awsRegion: process.env.AWS_REGION!,

    localstackEndpoint: process.env.LOCALSTACK_ENDPOINT,
    localstackHost: process.env.LOCALSTACK_HOST,

    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
};
