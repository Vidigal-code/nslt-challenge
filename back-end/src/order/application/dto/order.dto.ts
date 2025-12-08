import {IsArray, IsString, IsNumber, IsDateString, IsOptional, IsPositive, IsNotEmpty} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {sanitizeInput} from "src/types/utils/sanitize";

export class CreateOrderDto {
    @ApiProperty({ example: '2024-01-01T00:00:00.000Z', description: 'Order date' })
    @IsDateString()
    date: Date = new Date();

    @ApiProperty({ example: ['60f7f9a8b4a4b21f8c3c9b1a'], description: 'Product IDs' })
    @IsArray()
    @IsString({each: true})
    productIds: string[] = [];

    @ApiProperty({ example: 120.5, description: 'Order total amount' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    total: number = 0;

    constructor() {
        this.productIds = this.productIds.map((id) => sanitizeInput(id));
    }
}

export class UpdateOrderDto {
    @ApiPropertyOptional({ example: '2024-02-01T00:00:00.000Z', description: 'Order date' })
    @IsOptional()
    @IsDateString()
    date: Date = new Date();

    @ApiPropertyOptional({ example: ['60f7f9a8b4a4b21f8c3c9b1a'], description: 'Product IDs' })
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    productIds: string[] = [];

    @ApiPropertyOptional({ example: 150.0, description: 'Order total amount' })
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    total: number = 0;

    constructor() {
        this.productIds = this.productIds.map((id) => sanitizeInput(id));
    }
}
