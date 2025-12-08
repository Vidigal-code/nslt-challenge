import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ProductService } from '../src/product/application/use-cases/product.service';
import { CategoryService } from '../src/category/application/use-cases/category.service';
import { OrderService } from '../src/order/application/use-cases/order.service';
import 'src/config';

async function bootstrap() {

    const app = await NestFactory.createApplicationContext(AppModule);

    const categoryService = app.get(CategoryService);
    const productService = app.get(ProductService);
    const orderService = app.get(OrderService);

    await categoryService.deleteAll();
    await productService.deleteAll();
    await orderService.deleteAll();

    const categories = await categoryService.createMany([
        { name: 'Eletrônicos' },
        { name: 'Roupas' },
        { name: 'Acessórios' },
        { name: 'Cozinha' },
        { name: 'Móveis' },
        { name: 'Beleza' },
    ]);

    const getCategoryId = (index: number) => categories[index]._id.toString();

    const products = await productService.createMany([
        {
            name: 'Notebook',
            description: 'Notebook potente com 16GB de RAM',
            price: 5000,
            categoryIds: [getCategoryId(0)],
            imageUrl: 'http://example.com/notebook.jpg',
        },
        {
            name: 'Camiseta',
            description: 'Camiseta confortável de algodão',
            price: 50,
            categoryIds: [getCategoryId(1)],
            imageUrl: 'http://example.com/camiseta.jpg',
        },
        {
            name: 'Smartphone',
            description: 'Smartphone com câmera de 48MP',
            price: 2500,
            categoryIds: [getCategoryId(0), getCategoryId(2)],
            imageUrl: 'http://example.com/smartphone.jpg',
        },
        {
            name: 'Geladeira',
            description: 'Geladeira com capacidade de 500L e tecnologia inverter',
            price: 3500,
            categoryIds: [getCategoryId(3)],
            imageUrl: 'http://example.com/geladeira.jpg',
        },
        {
            name: 'Sofá',
            description: 'Sofá confortável de 3 lugares',
            price: 2000,
            categoryIds: [getCategoryId(4)],
            imageUrl: 'http://example.com/sofa.jpg',
        },
        {
            name: 'Perfume',
            description: 'Perfume feminino de longa duração',
            price: 150,
            categoryIds: [getCategoryId(5)],
            imageUrl: 'http://example.com/perfume.jpg',
        },
        {
            name: 'Fone de Ouvido',
            description: 'Fone de ouvido com cancelamento de ruído',
            price: 500,
            categoryIds: [getCategoryId(0)],
            imageUrl: 'http://example.com/fone.jpg',
        },
        {
            name: 'Camisola',
            description: 'Camisola de seda confortável',
            price: 120,
            categoryIds: [getCategoryId(1)],
            imageUrl: 'http://example.com/camisola.jpg',
        },
    ]);

    const getProductId = (index: number) => products[index]._id.toString();

    // Create orders
    await orderService.createMany([
        {
            date: new Date('2026-01-08'),
            productIds: [getProductId(0), getProductId(1)],
            total: 5050,
        },
        {
            date: new Date('2026-01-08'),
            productIds: [getProductId(2)],
            total: 2500,
        },
        {
            date: new Date('2026-01-08'),
            productIds: [getProductId(3), getProductId(5)],
            total: 3650,
        },
        {
            date: new Date('2026-01-08'),
            productIds: [getProductId(4), getProductId(7)],
            total: 2120,
        },
        {
            date: new Date('2026-01-08'),
            productIds: [getProductId(6)],
            total: 500,
        },
        {
            date: new Date('2026-01-08'),
            productIds: [getProductId(0), getProductId(5)],
            total: 5150,
        },
    ]);

    console.log('\x1b\n[32mDatabase populated successfully!\x1b[0m');
    await app.close();
}

bootstrap().catch((err) => {
    console.error('\x1b[31mError:\x1b[0m', err);
    process.exit(1);
});