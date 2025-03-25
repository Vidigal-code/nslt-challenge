import {IsString, IsNotEmpty, IsOptional} from 'class-validator';
import {sanitizeInput} from "src/types/utils/sanitize";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string = "";

    constructor() {
        this.name = sanitizeInput(this.name);
    }
}

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string = "";

    constructor() {
        this.name = sanitizeInput(this.name);
    }
}
