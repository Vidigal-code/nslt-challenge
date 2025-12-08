import { CreateProductDto, UpdateProductDto } from 'src/product/application/dto/product.dto';
import { Product } from 'src/product/interfaces/schemas/product.schema';

export interface ProductRepository {
    create(payload: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    update(id: string, payload: UpdateProductDto): Promise<Product | null>;
    delete(id: string): Promise<boolean>;
    insertMany(payload: CreateProductDto[]): Promise<Product[]>;
    deleteMany(): Promise<void>;
    removeCategoryFromProducts(categoryId: string): Promise<void>;
}

