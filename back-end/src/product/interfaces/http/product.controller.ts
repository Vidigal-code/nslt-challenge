import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UploadedFile,
    UseInterceptors,
    HttpException
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiParam } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {CreateProductDto, UpdateProductDto} from '../../application/dto/product.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {handleError, handleErrorMessageCustom} from "../../../exception/exception.handle";
import {FindOneDto} from "../../../types/find.one.dto";
import {Types} from "mongoose";
import ImageValidator from "../../../types/image.validator";
import { Errors } from 'src/shared/errors';
import { CreateProductCommand } from '../../application/commands/create-product.command';
import { UpdateProductCommand } from '../../application/commands/update-product.command';
import { DeleteProductCommand } from '../../application/commands/delete-product.command';
import { GetProductQuery } from '../../application/queries/get-product.query';
import { ListProductsQuery } from '../../application/queries/list-products.query';

@Controller('products')
@ApiTags('products')
export class ProductController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    @Post()
    @ApiOperation({ summary: 'Create product' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 201, description: 'Product created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createProductDto: CreateProductDto
    ) {

        const price: number = createProductDto.price;

        if (price <= 0) {
            return handleErrorMessageCustom(403, `Value not allowed: ${price}`);
        }

        if (file != null) {
            const validationResult = ImageValidator.validateImage(file);
            if (validationResult) {
                return handleErrorMessageCustom(500, validationResult);
            }
        }
        return this.commandBus.execute(new CreateProductCommand(createProductDto, file))
            .catch((error) => handleError(error));
    }

    @Get()
    @ApiOperation({ summary: 'List products' })
    @ApiResponse({ status: 200, description: 'Products listed' })
    //@Throttle({ default: { limit: 5, ttl: 60 } }) - CUSTOM
    findAll() {
        return this.queryBus.execute(new ListProductsQuery())
            .catch((error) => handleError(error));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get product by id' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiResponse({ status: 200, description: 'Product found' })
    @ApiResponse({ status: 400, description: 'Invalid ID format' })
    findOne(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }
        return this.queryBus.execute(new GetProductQuery(params.id))
            .catch((error) => handleError(error, params.id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update product' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiConsumes('multipart/form-data')
    @ApiResponse({ status: 200, description: 'Product updated' })
    @ApiResponse({ status: 400, description: 'Invalid ID format' })
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param() params: FindOneDto,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateProductDto: UpdateProductDto
    ) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }

        const price: number = updateProductDto.price;

        if (price <= 0) {
            return handleErrorMessageCustom(403, `Value not allowed: ${price}`);
        }

        if (file != null) {
            const validationResult = ImageValidator.validateImage(file);
            if (validationResult) {
                return handleErrorMessageCustom(500, validationResult);
            }
        }
        return this.commandBus.execute(new UpdateProductCommand(params.id, updateProductDto, file))
            .catch((error) => handleError(error, params.id));
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete product' })
    @ApiParam({ name: 'id', example: '65f7f9a8b4a4b21f8c3c9b1a' })
    @ApiResponse({ status: 200, description: 'Product deleted' })
    delete(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException(Errors.INVALID_ID_FORMAT, 400);
        }
        return this.commandBus.execute(new DeleteProductCommand(params.id))
            .catch((error) => handleError(error, params.id));
    }
}
