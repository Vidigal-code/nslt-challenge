import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import {handleError} from "../exception/exception.handle";

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
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id)
            .catch((error) => {
                handleError(error, id);
            });
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto)
            .catch((error) => {
                handleError(error, id);
            });
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.categoryService.delete(id)
            .catch((error) => {
                handleError(error, id);
            });
    }
}
