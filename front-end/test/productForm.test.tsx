import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from '../src/components/forms/ProductForm';

jest.mock('../src/shared/api/hooks', () => ({
  useCreateProduct: () => ({ mutateAsync: jest.fn().mockResolvedValue({}) }),
  useUpdateProduct: () => ({ mutateAsync: jest.fn().mockResolvedValue({}) }),
}));

describe('ProductForm', () => {
  it('submits product data', async () => {
    const onSubmit = jest.fn();
    render(<ProductForm onSubmit={onSubmit} initialData={null} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Prod' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Desc' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/Category IDs/i), { target: { value: 'c1,c2' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Product/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});

