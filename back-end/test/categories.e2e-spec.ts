import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connection, disconnect } from 'mongoose';

describe('Categories E2E', () => {
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

  it('creates and lists categories', async () => {
    await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'Electronics' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .get('/categories')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe('Electronics');
  });
});

