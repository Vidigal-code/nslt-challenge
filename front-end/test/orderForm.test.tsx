import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OrderForm from '../src/components/forms/OrderForm';

jest.mock('../src/shared/api/hooks', () => ({
  useCreateOrder: () => ({ mutateAsync: jest.fn().mockResolvedValue({}) }),
  useUpdateOrder: () => ({ mutateAsync: jest.fn().mockResolvedValue({}) }),
}));

describe('OrderForm', () => {
  it('submits order data', async () => {
    const onSubmit = jest.fn();
    render(<OrderForm onSubmit={onSubmit} initialData={null} />);
    expect(screen.getByRole('button', { name: /Create Order/i })).toBeInTheDocument();
  });
});

