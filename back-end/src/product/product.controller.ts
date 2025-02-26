import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { handleError } from "../exception/exception.handle";

@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createProductDto: CreateProductDto
    ) {
        return (file ? this.productService.uploadImage(file).then((imageUrl) => {
            createProductDto.imageUrl = imageUrl;
            return this.productService.create(createProductDto);
        }) : this.productService.create(createProductDto))
            .catch((error) => {
                handleError(error);
            });
    }

    @Get()
    findAll() {
        return this.productService.findAll()
            .catch((error) => {
                handleError(error);
            });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id)
            .catch((error) => {
                handleError(error, id);
            });
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return (file ? this.productService.uploadImage(file).then((imageUrl) => {
            updateProductDto.imageUrl = imageUrl;
            return this.productService.update(id, updateProductDto);
        }) : this.productService.update(id, updateProductDto))
            .catch((error) => {
                handleError(error, id);
            });
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.productService.delete(id)
            .catch((error) => {
                handleError(error, id);
            });
    }
}
