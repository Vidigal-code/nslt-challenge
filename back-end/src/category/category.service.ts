import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';
import { Product } from '../product/product.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
        @InjectModel(Product.name) private productModel: Model<Product>
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const createdCategory = new this.categoryModel(createCategoryDto);
        return createdCategory.save();
    }

    async createMany(createCategoryDtos: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoryModel.insertMany(createCategoryDtos);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }

    async findOne(id: string): Promise<Category | null> {
        return this.categoryModel.findById(id).exec();
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
        return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        await this.productModel.updateMany({ categoryIds: id }, { $pull: { categoryIds: id } }).exec();
        await this.categoryModel.findByIdAndDelete(id).exec();
    }

    async deleteAll(): Promise<void> {
        await this.categoryModel.deleteMany({}).exec();
    }
}
