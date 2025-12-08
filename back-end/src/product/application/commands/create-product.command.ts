import { CreateProductDto } from '../dto/product.dto';

export class CreateProductCommand {
    constructor(public readonly payload: CreateProductDto, public readonly file?: Express.Multer.File) {}
}

