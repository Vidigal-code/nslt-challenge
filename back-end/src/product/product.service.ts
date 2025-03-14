import {HttpException, HttpStatus, Injectable, OnModuleInit} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {HydratedDocument, MergeType, Model, Types} from 'mongoose';
import {Product} from './product.schema';
import {CreateProductDto, UpdateProductDto} from './product.dto';
import {AwsService} from '../aws/aws.service';
import {GenericException, handleErrorStatusMessage} from "../exception/exception.handle";
import ImageValidator from "../types/image.validator";

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
        if (file != null) {
            const validationResult = ImageValidator.validateImage(file);
            if (validationResult) {
                handleErrorStatusMessage(500, validationResult);
                return;
            }
        }
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
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        return this.productModel.findById(id).exec();
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
        return await this.productModel.findByIdAndUpdate(id, updateProductDto, {new: true}).exec();
    }

    async delete(id: string): Promise<boolean> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
        }
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
