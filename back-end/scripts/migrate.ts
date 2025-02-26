import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ProductService } from '../src/product/product.service';
import { CategoryService } from '../src/category/category.service';
import { OrderService } from '../src/order/order.service';

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


    const products = await productService.createMany([
        {
            name: 'Notebook',
            description: 'Notebook potente com 16GB de RAM',
            price: 5000,
            categoryIds: [categories[0]._id.toString()],
            imageUrl: 'http://example.com/notebook.jpg',
        },
        {
            name: 'Camiseta',
            description: 'Camiseta confortável de algodão',
            price: 50,
            categoryIds: [categories[1]._id.toString()],
            imageUrl: 'http://example.com/camiseta.jpg',
        },
        {
            name: 'Smartphone',
            description: 'Smartphone com câmera de 48MP',
            price: 2500,
            categoryIds: [
                categories[0]._id.toString(),
                categories[2]._id.toString()
            ],
            imageUrl: 'http://example.com/smartphone.jpg',
        },
        {
            name: 'Geladeira',
            description: 'Geladeira com capacidade de 500L e tecnologia inverter',
            price: 3500,
            categoryIds: [categories[3]._id.toString()],
            imageUrl: 'http://example.com/geladeira.jpg',
        },
        {
            name: 'Sofá',
            description: 'Sofá confortável de 3 lugares',
            price: 2000,
            categoryIds: [categories[4]._id.toString()],
            imageUrl: 'http://example.com/sofa.jpg',
        },
        {
            name: 'Perfume',
            description: 'Perfume feminino de longa duração',
            price: 150,
            categoryIds: [categories[5]._id.toString()],
            imageUrl: 'http://example.com/perfume.jpg',
        },
        {
            name: 'Fone de Ouvido',
            description: 'Fone de ouvido com cancelamento de ruído',
            price: 500,
            categoryIds: [categories[0]._id.toString()],
            imageUrl: 'http://example.com/fone.jpg',
        },
        {
            name: 'Camisola',
            description: 'Camisola de seda confortável',
            price: 120,
            categoryIds: [categories[1]._id.toString()],
            imageUrl: 'http://example.com/camisola.jpg',
        },
    ]);


    await orderService.createMany([
        {
            date: new Date('2024-01-01'),
            productIds: [products[0]._id.toString(), products[1]._id.toString()],
            total: 5050,
        },
        {
            date: new Date('2024-01-15'),
            productIds: [products[2]._id.toString()],
            total: 2500,
        },
        {
            date: new Date('2024-02-01'),
            productIds: [products[3]._id.toString(), products[5]._id.toString()],
            total: 3650,
        },
        {
            date: new Date('2024-02-15'),
            productIds: [products[4]._id.toString(), products[7]._id.toString()],
            total: 2120,
        },
        {
            date: new Date('2024-02-20'),
            productIds: [products[6]._id.toString()],
            total: 500,
        },
        {
            date: new Date('2024-02-28'),
            productIds: [products[0]._id.toString(), products[5]._id.toString()],
            total: 5150,
        },
    ]);

    console.log('\x1b[32mDatabase populated successfully with categories, products, and orders!\x1b[39m');
    await app.close();
}

bootstrap().catch((err) => {
    console.error('\x1b[31mError populating the database:\x1b[39m', err);
    process.exit(1);
});
