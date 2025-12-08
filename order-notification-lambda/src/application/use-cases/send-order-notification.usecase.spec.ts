import { SendOrderNotificationUseCase } from './send-order-notification.usecase';

describe('SendOrderNotificationUseCase', () => {
  const orderRepo = {
    findById: jest.fn(),
  };
  const notifier = {
    publish: jest.fn(),
  };

  it('returns 404 when order not found', async () => {
    orderRepo.findById.mockResolvedValue(null);
    const useCase = new SendOrderNotificationUseCase(orderRepo as any, notifier as any);
    const res = await useCase.execute({ orderId: '1', total: 10 });
    expect(res.statusCode).toBe(404);
  });

  it('returns 200 when order exists', async () => {
    orderRepo.findById.mockResolvedValue({ _id: '1', total: 10, productIds: [], date: new Date() });
    notifier.publish.mockResolvedValue(undefined);
    const useCase = new SendOrderNotificationUseCase(orderRepo as any, notifier as any);
    const res = await useCase.execute({ orderId: '1', total: 10 });
    expect(res.statusCode).toBe(200);
  });
});

