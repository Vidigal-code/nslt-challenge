import { Controller, Get, Post, Body, Param, Put, Delete, HttpException} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { Types } from "mongoose";
import { FindOneDto } from "../types/find.one.dto";
import { handleError } from "../exception/exception.handle";


@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto)
            .catch((error) => {
                handleError(error);
            });
    }

    @Get()
    findAll() {
        return this.categoryService.findAll()
            .catch((error) => {
                handleError(error);
            });
    }

    @Get(':id')
    findOne(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.categoryService.findOne(params.id)
            .catch((error) => {
                handleError(error, params.id);
            });
    }

    @Put(':id')
    update(@Param() params: FindOneDto, @Body() updateCategoryDto: UpdateCategoryDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.categoryService.update(params.id, updateCategoryDto)
            .catch((error) => {
                handleError(error, params.id);
            });
    }

    @Delete(':id')
    delete(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.categoryService.delete(params.id)
            .catch((error) => {
                handleError(error, params.id);
            });
    }
}
