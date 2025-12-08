import { ProductService } from './product.service';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ImageStoragePort } from '../../../domain/ports/image-storage.port';

describe('ProductService (unit)', () => {
  const repo: jest.Mocked<ProductRepository> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    insertMany: jest.fn(),
    deleteMany: jest.fn(),
    removeCategoryFromProducts: jest.fn(),
  };
  const storage: jest.Mocked<ImageStoragePort> = {
    uploadImage: jest.fn(),
    deleteImage: jest.fn(),
    createBucketIfNotExists: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it('creates a product', async () => {
    const service = new ProductService(repo, storage);
    repo.create.mockResolvedValue({ _id: '1', name: 'p' } as any);
    const res = await service.create({ name: 'p' } as any);
    expect(res._id).toBe('1');
    expect(repo.create).toHaveBeenCalled();
  });
});

