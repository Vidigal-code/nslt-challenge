import { UpdateCategoryDto } from '../dto/category.dto';

export class UpdateCategoryCommand {
    constructor(public readonly id: string, public readonly payload: UpdateCategoryDto) {}
}

