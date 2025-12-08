import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { IMAGE_STORAGE_PORT } from '../domain/tokens';

@Module({
    providers: [
        AwsService,
        {
            provide: IMAGE_STORAGE_PORT,
            useExisting: AwsService,
        },
    ],
    exports: [AwsService, IMAGE_STORAGE_PORT],
})
export class AwsModule {}
