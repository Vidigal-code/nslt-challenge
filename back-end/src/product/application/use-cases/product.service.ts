import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { HydratedDocument, MergeType, Types } from 'mongoose';
import { Product } from '../../interfaces/schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { GenericException, handleErrorMessageCustom } from "../../../exception/exception.handle";
import ImageValidator from "../../../types/image.validator";
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { IMAGE_STORAGE_PORT, PRODUCT_REPOSITORY } from '../../../domain/tokens';
import { ImageStoragePort } from '../../../domain/ports/image-storage.port';
import { Errors } from 'src/shared/errors';

@Injectable()
export class ProductService implements OnModuleInit {

    constructor(
        @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository,
        @Inject(IMAGE_STORAGE_PORT) private readonly imageStorage: ImageStoragePort,
    ) {}

    async onModuleInit() {
        // Skip S3 interactions during automated tests to avoid network calls
        if (process.env.NODE_ENV === 'test' || process.env.SKIP_S3 === 'true') {
            return;
        }

        return this.imageStorage.createBucketIfNotExists()
            .catch((error) => {
                console.error('Error creating bucket:', error.message);
                throw new GenericException('Error creating bucket: ' + error.message, 500);
            });
    }

    async uploadImage(file: Express.Multer.File): Promise<string | void> {
        if (file != null) {
            const validationResult = ImageValidator.validateImage(file);
            if (validationResult) {
                return handleErrorMessageCustom(500, validationResult);
            }
        }
        return await this.imageStorage.uploadImage(file);
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productRepository.create(createProductDto);
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async findOne(id: string): Promise<Product | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return this.productRepository.findById(id);
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        return await this.productRepository.update(id, updateProductDto);
    }

    async delete(id: string): Promise<boolean> {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, HttpStatus.BAD_REQUEST);
        }
        const product = await this.productRepository.findById(id);
        if (product?.imageUrl) {
            await this.imageStorage.deleteImage(product.imageUrl);
        }
        return this.productRepository.delete(id);
    }

    async deleteAll(): Promise<void> {
        await this.productRepository.deleteMany();
    }

    async createMany(createProductDto: CreateProductDto[]): Promise<Product[]> {
        return this.productRepository.insertMany(createProductDto) as unknown as Product[];
    }
}
