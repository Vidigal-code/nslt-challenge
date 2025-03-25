import {IsArray, IsString, IsNumber, IsDateString, IsOptional, IsPositive, IsNotEmpty} from 'class-validator';
import {sanitizeInput} from "src/types/utils/sanitize";

export class CreateOrderDto {
    @IsDateString()
    date: Date = new Date();

    @IsArray()
    @IsString({each: true})
    productIds: string[] = [];

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    total: number = 0;

    constructor() {
        this.productIds = this.productIds.map((id) => sanitizeInput(id));
    }
}

export class UpdateOrderDto {
    @IsOptional()
    @IsDateString()
    date: Date = new Date();

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    productIds: string[] = [];

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    total: number = 0;

    constructor() {
        this.productIds = this.productIds.map((id) => sanitizeInput(id));
    }
}
