import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import * as dotenv from 'dotenv';
dotenv.config();

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017'),
    ],
    exports: [
        MongooseModule,
    ],
})
export class DatabaseModule {}