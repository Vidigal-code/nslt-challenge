import { ProcessSalesReportUseCase } from './process-sales-report.usecase';

describe('ProcessSalesReportUseCase', () => {
  const orderRepo = {
    findSince: jest.fn(),
  };
  const notifier = {
    publish: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds report and publishes', async () => {
    orderRepo.findSince.mockResolvedValue([
      { total: 10, productIds: ['a'], date: new Date() },
      { total: 20, productIds: ['a', 'b'], date: new Date() },
    ]);
    const useCase = new ProcessSalesReportUseCase(orderRepo as any, notifier as any);
    const res = await useCase.execute();
    expect(res.statusCode).toBe(200);
    expect(notifier.publish).toHaveBeenCalled();
  });
});

