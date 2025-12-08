import { CreateCategoryDto } from '../dto/category.dto';

export class CreateCategoryCommand {
    constructor(public readonly payload: CreateCategoryDto) {}
}

