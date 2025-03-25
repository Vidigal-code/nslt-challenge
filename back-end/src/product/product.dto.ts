import {IsString, IsNumber, IsArray, IsOptional, IsUrl, IsNotEmpty, IsPositive} from 'class-validator';
import {sanitizeInput} from "src/types/utils/sanitize";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string = "";

    @IsString()
    @IsNotEmpty()
    description: string = "";

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number = 0;

    @IsArray()
    @IsNotEmpty()
    categoryIds: string[] = [];

    @IsUrl()
    @IsOptional()
    imageUrl: string | void = "";

    constructor() {
        this.name = sanitizeInput(this.name);
        this.description = sanitizeInput(this.description);
        this.categoryIds = this.categoryIds.map((id) => sanitizeInput(id));
        this.imageUrl = this.imageUrl ? sanitizeInput(this.imageUrl) : '';
    }
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string = "";

    @IsString()
    @IsOptional()
    description: string = "";

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number = 0;

    @IsArray()
    @IsOptional()
    categoryIds: string[] = [];

    @IsUrl()
    @IsOptional()
    imageUrl: string | void = "";

    constructor() {
        this.name = sanitizeInput(this.name);
        this.description = sanitizeInput(this.description);
        this.categoryIds = this.categoryIds.map((id) => sanitizeInput(id));
        this.imageUrl = this.imageUrl ? sanitizeInput(this.imageUrl) : '';
    }

}
