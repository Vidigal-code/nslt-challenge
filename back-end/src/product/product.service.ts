import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {HydratedDocument, MergeType, Model } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { AwsService } from '../aws/aws.service';
import {GenericException} from "../exception/exception.handle";

@Injectable()
export class ProductService implements OnModuleInit {

    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        private awsService: AwsService,
    ) {}

    async onModuleInit() {
        return this.awsService.createBucketIfNotExists()
            .catch((error) => {
                console.error('Error creating bucket:', error.message);
                throw new GenericException('Error creating bucket: ' + error.message, 500);
            });
    }

    async uploadImage(file: Express.Multer.File): Promise<string | void> {
        return await this.awsService.uploadImage(file);
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
        return await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const product = await this.productModel.findById(id).exec();
        if (product?.imageUrl) {
            await this.awsService.deleteImage(product.imageUrl);
        }
        const result = await this.productModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async deleteAll(): Promise<void> {
        await this.productModel.deleteMany({}).exec();
    }

    async createMany(createProductDto: CreateProductDto[]): Promise<Array<MergeType<HydratedDocument<Product, {}, {}>, Omit<CreateProductDto, "_id">>>> {
        return this.productModel.insertMany(createProductDto);
    }
}
