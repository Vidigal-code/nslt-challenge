import { SendOrderNotificationUseCase } from '../src/application/use-cases/send-order-notification.usecase';

describe('SendOrderNotificationUseCase', () => {
  const orderRepo = {
    findById: jest.fn(),
  };
  const notifier = {
    publish: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 404 when order not found', async () => {
    orderRepo.findById.mockResolvedValue(null);
    const useCase = new SendOrderNotificationUseCase(orderRepo as any, notifier as any);
    const res = await useCase.execute({ orderId: '1', total: 10 });
    expect(res.statusCode).toBe(404);
  });

  it('returns 200 when order exists', async () => {
    orderRepo.findById.mockResolvedValue({ id: '1', total: 10, productIds: ['a'] });
    const useCase = new SendOrderNotificationUseCase(orderRepo as any, notifier as any);
    const res = await useCase.execute({ orderId: '1', total: 10 });
    expect(res.statusCode).toBe(200);
    expect(notifier.publish).toHaveBeenCalled();
  });
});

