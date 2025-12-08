import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductTable from '../src/components/tables/ProductTable';

describe('ProductTable', () => {
  it('renders products', () => {
    render(
      <ProductTable
        products={[
          { _id: '1', name: 'A', description: 'd', price: 1, categoryIds: [], imageUrl: '' },
        ]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getAllByText('A')[0]).toBeInTheDocument();
  });
});

