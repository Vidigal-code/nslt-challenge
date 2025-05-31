import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ProductService } from '../src/product/product.service';
import { CategoryService } from '../src/category/category.service';
import { OrderService } from '../src/order/order.service';
import 'src/config';

interface Category {
    _id: string;
    name: string;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    categoryIds: string[];
    imageUrl: string;
}

async function bootstrap() {

    const app = await NestFactory.createApplicationContext(AppModule);

    const categoryService = app.get(CategoryService);
    const productService = app.get(ProductService);
    const orderService = app.get(OrderService);

    await categoryService.deleteAll();
    await productService.deleteAll();
    await orderService.deleteAll();

    const categories = (await categoryService.createMany([
        { name: 'Eletrônicos' },
        { name: 'Roupas' },
        { name: 'Acessórios' },
        { name: 'Cozinha' },
        { name: 'Móveis' },
        { name: 'Beleza' },
    ])) as Category[];

    const products = (await productService.createMany([
        {
            name: 'Notebook',
            description: 'Notebook potente com 16GB de RAM',
            price: 5000,
            categoryIds: [categories[0]._id],
            imageUrl: 'http://example.com/notebook.jpg',
        },
        {
            name: 'Camiseta',
            description: 'Camiseta confortável de algodão',
            price: 50,
            categoryIds: [categories[1]._id],
            imageUrl: 'http://example.com/camiseta.jpg',
        },
        {
            name: 'Smartphone',
            description: 'Smartphone com câmera de 48MP',
            price: 2500,
            categoryIds: [categories[0]._id, categories[2]._id],
            imageUrl: 'http://example.com/smartphone.jpg',
        },
        {
            name: 'Geladeira',
            description: 'Geladeira com capacidade de 500L e tecnologia inverter',
            price: 3500,
            categoryIds: [categories[3]._id],
            imageUrl: 'http://example.com/geladeira.jpg',
        },
        {
            name: 'Sofá',
            description: 'Sofá confortável de 3 lugares',
            price: 2000,
            categoryIds: [categories[4]._id],
            imageUrl: 'http://example.com/sofa.jpg',
        },
        {
            name: 'Perfume',
            description: 'Perfume feminino de longa duração',
            price: 150,
            categoryIds: [categories[5]._id],
            imageUrl: 'http://example.com/perfume.jpg',
        },
        {
            name: 'Fone de Ouvido',
            description: 'Fone de ouvido com cancelamento de ruído',
            price: 500,
            categoryIds: [categories[0]._id],
            imageUrl: 'http://example.com/fone.jpg',
        },
        {
            name: 'Camisola',
            description: 'Camisola de seda confortável',
            price: 120,
            categoryIds: [categories[1]._id],
            imageUrl: 'http://example.com/camisola.jpg',
        },
    ])) as Product[];

    // Create orders
    await orderService.createMany([
        {
            date: new Date('2024-01-01'),
            productIds: [products[0]._id, products[1]._id],
            total: 5050,
        },
        {
            date: new Date('2024-01-15'),
            productIds: [products[2]._id],
            total: 2500,
        },
        {
            date: new Date('2024-02-01'),
            productIds: [products[3]._id, products[5]._id],
            total: 3650,
        },
        {
            date: new Date('2024-02-15'),
            productIds: [products[4]._id, products[7]._id],
            total: 2120,
        },
        {
            date: new Date('2024-02-20'),
            productIds: [products[6]._id],
            total: 500,
        },
        {
            date: new Date('2024-02-28'),
            productIds: [products[0]._id, products[5]._id],
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