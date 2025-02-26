import { IsArray, IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateOrderDto {
    @IsDateString()
    date: Date = new Date();

    @IsArray()
    @IsString({ each: true })
    productIds: string[] = [];

    @IsNumber()
    total: number = 0;
}

export class UpdateOrderDto {
    @IsOptional()
    @IsDateString()
    date?: Date = new Date();

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    productIds?: string[];

    @IsOptional()
    @IsNumber()
    total?: number;
}
