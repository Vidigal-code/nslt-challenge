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
import {ProductService} from './product.service';
import {CreateProductDto, UpdateProductDto} from './product.dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {handleError, handleErrorMessageCustom} from "../exception/exception.handle";
import {FindOneDto} from "../types/find.one.dto";
import {Types} from "mongoose";
import ImageValidator from "../types/image.validator";

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {
    }

    @Post()
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
        return (file ? this.productService.uploadImage(file).then((imageUrl) => {
            createProductDto.imageUrl = imageUrl;
            return this.productService.create(createProductDto);
        }) : this.productService.create(createProductDto))
            .catch((error) => {
                handleError(error);
            });
    }

    @Get()
    //@Throttle({ default: { limit: 5, ttl: 60 } }) - CUSTOM
    findAll() {
        return this.productService.findAll()
            .catch((error) => {
                handleError(error);
            });
    }

    @Get(':id')
    findOne(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.productService.findOne(params.id)
            .catch((error) => {
                handleError(error, params.id);
            });
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param() params: FindOneDto,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateProductDto: UpdateProductDto
    ) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
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
        return (file ? this.productService.uploadImage(file).then((imageUrl) => {
            updateProductDto.imageUrl = imageUrl;
            return this.productService.update(params.id, updateProductDto);
        }) : this.productService.update(params.id, updateProductDto))
            .catch((error) => {
                handleError(error, params.id);
            });
    }

    @Delete(':id')
    delete(@Param() params: FindOneDto) {
        if (!Types.ObjectId.isValid(params.id)) {
            throw new HttpException('Invalid ID format', 400);
        }
        return this.productService.delete(params.id)
            .catch((error) => {
                handleError(error, params.id);
            });
    }
}
