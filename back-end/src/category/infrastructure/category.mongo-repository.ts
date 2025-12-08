import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from '../interfaces/schemas/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from '../application/dto/category.dto';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from 'src/shared/errors';

export class CategoryMongoRepository implements CategoryRepository {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

    async create(payload: CreateCategoryDto): Promise<Category> {
        const created = new this.categoryModel(payload);
        return created.save();
    }

    async insertMany(payload: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoryModel.insertMany(payload);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async findById(id: string): Promise<Category | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.categoryModel.findById(id).exec();
    }

    async update(id: string, payload: UpdateCategoryDto): Promise<Category | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.categoryModel.findByIdAndUpdate(id, payload, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        await this.categoryModel.findByIdAndDelete(id).exec();
    }

    async deleteMany(): Promise<void> {
        await this.categoryModel.deleteMany({}).exec();
    }
}

