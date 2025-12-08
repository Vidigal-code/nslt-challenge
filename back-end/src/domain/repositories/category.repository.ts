import { CreateCategoryDto, UpdateCategoryDto } from 'src/category/application/dto/category.dto';
import { Category } from 'src/category/interfaces/schemas/category.schema';

export interface CategoryRepository {
    create(payload: CreateCategoryDto): Promise<Category>;
    insertMany(payload: CreateCategoryDto[]): Promise<Category[]>;
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category | null>;
    update(id: string, payload: UpdateCategoryDto): Promise<Category | null>;
    delete(id: string): Promise<void>;
    deleteMany(): Promise<void>;
}

