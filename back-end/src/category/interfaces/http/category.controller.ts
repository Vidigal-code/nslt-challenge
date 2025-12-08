import { Controller, Get, Post, Body, Param, Put, Delete, HttpException} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryDto, UpdateCategoryDto } from '../../application/dto/category.dto';
import { Types } from "mongoose";
import { FindOneDto } from "../../../types/find.one.dto";
import { handleError } from "../../../exception/exception.handle";
import { Errors } from 'src/shared/errors';
import { CreateCategoryCommand } from '../../application/commands/create-category.command';
import { UpdateCategoryCommand } from '../../application/commands/update-category.command';
import { DeleteCategoryCommand } from '../../application/commands/delete-category.command';
import { GetCategoryQuery } from '../../application/queries/get-category.query';
import { ListCategoriesQuery } from '../../application/queries/list-categories.query';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('categories')
@ApiTags('categories')
export class CategoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create category' })
    @ApiResponse({ status: 201, description: 'Category created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.commandBus.execute(new CreateCategoryCommand(createCategoryDto))
            .catch((error) => handleError(error));
    }

    @Get()
    @ApiOperation({ summary: 'List categories' })
    findAll() {
        return this.queryBus.execute(new ListCategoriesQuery())
            .catch((error) => handleError(error));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by id' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiResponse({ status: 200, description: 'Category found' })
    @ApiResponse({ status: 400, description: 'Invalid ID format' })
    findOne(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }
        return this.queryBus.execute(new GetCategoryQuery(params.id))
            .catch((error) => handleError(error, params.id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiResponse({ status: 200, description: 'Category updated' })
    update(@Param() params: FindOneDto, @Body() updateCategoryDto: UpdateCategoryDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }
        return this.commandBus.execute(new UpdateCategoryCommand(params.id, updateCategoryDto))
            .catch((error) => handleError(error, params.id));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete category' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiResponse({ status: 200, description: 'Category deleted' })
    delete(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }
        return this.commandBus.execute(new DeleteCategoryCommand(params.id))
            .catch((error) => handleError(error, params.id));
    }
}
