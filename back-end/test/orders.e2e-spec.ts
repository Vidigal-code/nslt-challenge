import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection, disconnect } from 'mongoose';

describe('Orders E2E', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGO_URI = mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await connection.close();
    await disconnect();
    if (mongoServer) await mongoServer.stop();
  });

  it('creates an order and lists it', async () => {
    // create product
    const productRes = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Desc',
        price: 10,
        categoryIds: [],
      })
      .expect(201);

    const productId = productRes.body._id;

    // create order
    await request(app.getHttpServer())
      .post('/orders')
      .send({
        date: new Date().toISOString(),
        productIds: [productId],
        total: 10,
      })
      .expect(201);

    const listRes = await request(app.getHttpServer())
      .get('/orders')
      .expect(200);

    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThan(0);
  });
});

