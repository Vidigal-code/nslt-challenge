import { IsString, IsNumber, IsArray, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string = "";

    @IsString()
    @IsNotEmpty()
    description: string = "";

    @IsNumber()
    @IsNotEmpty()
    price: number = 0;

    @IsArray()
    @IsNotEmpty()
    categoryIds: string[] = [];

    @IsUrl()
    @IsOptional()
    imageUrl?: string | void;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    price?: number;

    @IsArray()
    @IsOptional()
    categoryIds?: string[];

    @IsUrl()
    @IsOptional()
    imageUrl?: string | void;
}
