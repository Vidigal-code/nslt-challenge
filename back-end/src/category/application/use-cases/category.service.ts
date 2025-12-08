import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Category } from '../../interfaces/schemas/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { CategoryRepository } from 'src/domain/repositories/category.repository';
import { PRODUCT_REPOSITORY, CATEGORY_REPOSITORY } from 'src/domain/tokens';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { Errors } from 'src/shared/errors';

@Injectable()
export class CategoryService {
    constructor(
        @Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository,
        @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository,
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.create(createCategoryDto);
    }

    async createMany(createCategoryDtos: CreateCategoryDto[]): Promise<Category[]> {
        return this.categoryRepository.insertMany(createCategoryDtos);
    }

    async findAll(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    async findOne(id: string): Promise<Category | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.categoryRepository.findById(id);
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.categoryRepository.update(id, updateCategoryDto);
    }

    async delete(id: string): Promise<void> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        const category = await this.categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        const products = await this.productRepository.findAll();
        const promises = products
            .filter((p) => p.categoryIds.includes(id))
            .map((p) => {
                p.categoryIds = p.categoryIds.filter((c) => c !== id);
                return this.productRepository.update(p._id.toString(), {
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    categoryIds: p.categoryIds,
                    imageUrl: p.imageUrl,
                } as any);
            });
        await Promise.all(promises);
        await this.categoryRepository.delete(id);
    }

    async deleteAll(): Promise<void> {
        await this.categoryRepository.deleteMany();
    }
}
