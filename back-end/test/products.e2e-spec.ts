import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, connection } from 'mongoose';

describe('Products E2E', () => {
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

  it('creates and lists products', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/products')
      .send({
        name: 'Test Product',
        description: 'Desc',
        price: 10,
        categoryIds: [],
      })
      .expect(201);

    expect(createRes.body.name).toBe('Test Product');

    const listRes = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(listRes.body)).toBe(true);
    expect(listRes.body.length).toBeGreaterThan(0);
  });
});

