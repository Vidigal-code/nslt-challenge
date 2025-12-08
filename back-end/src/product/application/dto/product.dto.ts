import {IsString, IsNumber, IsArray, IsOptional, IsUrl, IsNotEmpty, IsPositive} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {sanitizeInput} from "src/types/utils/sanitize";

export class CreateProductDto {
    @ApiProperty({ example: 'Notebook', description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    name: string = "";

    @ApiProperty({ example: 'Powerful laptop with 16GB RAM', description: 'Product description' })
    @IsString()
    @IsNotEmpty()
    description: string = "";

    @ApiProperty({ example: 1999.9, description: 'Product price' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number = 0;

    @ApiProperty({ example: ['60f7f9a8b4a4b21f8c3c9b1a'], description: 'Category IDs' })
    @IsArray()
    @IsNotEmpty()
    categoryIds: string[] = [];

    @ApiPropertyOptional({ example: 'http://localhost:4566/my-bucket/notebook.png', description: 'Image URL' })
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
    @ApiPropertyOptional({ example: 'Notebook Pro', description: 'Product name' })
    @IsString()
    @IsOptional()
    name: string = "";

    @ApiPropertyOptional({ example: 'Updated description', description: 'Product description' })
    @IsString()
    @IsOptional()
    description: string = "";

    @ApiPropertyOptional({ example: 2499.9, description: 'Product price' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    price: number = 0;

    @ApiPropertyOptional({ example: ['60f7f9a8b4a4b21f8c3c9b1a'], description: 'Category IDs' })
    @IsArray()
    @IsOptional()
    categoryIds: string[] = [];

    @ApiPropertyOptional({ example: 'http://localhost:4566/my-bucket/notebook.png', description: 'Image URL' })
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
