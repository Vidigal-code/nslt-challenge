import {IsString, IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {sanitizeInput} from "src/types/utils/sanitize";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Electronics', description: 'Category name' })
    @IsString()
    @IsNotEmpty()
    name: string = "";

    constructor() {
        this.name = sanitizeInput(this.name);
    }
}

export class UpdateCategoryDto {
    @ApiPropertyOptional({ example: 'Updated name', description: 'Category name' })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string = "";

    constructor() {
        this.name = sanitizeInput(this.name);
    }
}
