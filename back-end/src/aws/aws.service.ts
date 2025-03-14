/*

4. AWS Integration (LocalStack to S3)
4.1. Local Configuration
• Use LocalStack only to simulate S3 in a local environment.
• Upload the Product images to the simulated S3 bucket.
• Configure Docker (via docker-compose or similar) to upload both
LocalStack and your NestJS and React application.
4.2. Access to S3
• Ensure that the application uploads files to the bucket and that it is possible to retrieve
the image URL (displaying it on the front-end).

*/


import {Injectable} from '@nestjs/common';
import {S3Client, PutObjectCommand, DeleteObjectCommand, CreateBucketCommand} from '@aws-sdk/client-s3';
import {AwsException, handleAwsError} from "../exception/aws.exception";
import {handleErrorStatusMessage} from "../exception/exception.handle";
import 'src/config';


@Injectable()
export class AwsService {

    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION || 'us-east-1',
            endpoint: process.env.S3_ENDPOINT || 'http://localhost:4566',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
            },
            forcePathStyle: true,
        });
    }

    async uploadImage(file: Express.Multer.File): Promise<string | void> {
        if (!file.mimetype.startsWith('image/')) {
            handleErrorStatusMessage(500, 'Only images are allowed');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            handleErrorStatusMessage(500, 'File too large (max 10MB)');
            return;
        }

        const params = {
            Bucket: 'my-bucket',
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        const endpoint = process.env.S3_ENDPOINT?.replace(/^https?:\/\//, '');

        return this.s3.send(command)
            .then(() => `http://${endpoint}/my-bucket/${params.Key}`)
            .catch((error) => {
                handleAwsError(error, 'Uploading image to S3');
            });
    }

    async createBucketIfNotExists() {
        const params = {Bucket: 'my-bucket'};

        return this.s3.send(new CreateBucketCommand(params))
            .catch((error) => {
                handleAwsError(error, 'Creating bucket');
            });
    }

    async deleteImage(imageUrl: string) {
        const imageKey = imageUrl.split('/').pop();
        if (imageKey) {
            return this.s3.send(new DeleteObjectCommand({Bucket: 'my-bucket', Key: imageKey}))
                .catch((error) => {
                    handleAwsError(error, 'Deleting image from S3');
                });
        }
        return Promise.reject(new AwsException('Invalid image URL or key', 400));
    }
}
