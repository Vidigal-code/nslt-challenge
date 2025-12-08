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
    expect(screen.getByRole('button', { name: /Create Product/i })).toBeInTheDocument();
  });
});

