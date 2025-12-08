import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../interfaces/schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from '../application/dto/product.dto';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from 'src/shared/errors';

export class ProductMongoRepository implements ProductRepository {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) {}

    async create(payload: CreateProductDto): Promise<Product> {
        const created = new this.productModel(payload);
        return created.save();
    }

    async findAll(): Promise<Product[]> {
        return (await this.productModel.find().exec()) as unknown as Product[];
    }

    async findById(id: string): Promise<Product | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.productModel.findById(id).exec();
    }

    async update(id: string, payload: UpdateProductDto): Promise<Product | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.productModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        const result = await this.productModel.findByIdAndDelete(id).exec();
        return result !== null;
    }

    async insertMany(payload: CreateProductDto[]): Promise<Product[]> {
        return (await this.productModel.insertMany(payload)) as unknown as Product[];
    }

    async deleteMany(): Promise<void> {
        await this.productModel.deleteMany({}).exec();
    }

    async removeCategoryFromProducts(categoryId: string): Promise<void> {
        if (!Types.ObjectId.isValid(categoryId)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        await this.productModel.updateMany({ categoryIds: categoryId }, { $pull: { categoryIds: categoryId } }).exec();
    }
}

