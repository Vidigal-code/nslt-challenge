/*


3.3. Component Documentation
• Use Storybook to document at least 2 main components. Examples:
• Table (for listing Products, Orders or Categories).
• Form (for creating/editing).


 */


import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProductTable from '../components/tables/ProductTable';

export default {
    title: 'Components/ProductTable',
    component: ProductTable,
    parameters: {
        docs: {
            description: {
                component:
                    'The ProductTable component is used to display a list of products with the ability to edit and delete them. Each product includes a name, description, price, associated categories, and an image (if available).',
            },
        },
    },
} as Meta;

const Template: StoryFn<any> = (args) => <ProductTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    products: [
        {
            _id: '1',
            name: 'Product 1',
            description: 'Description of Product 1',
            price: 19.99,
            categoryIds: ['Cat1', 'Cat2'],
            imageUrl: 'https://via.placeholder.com/50',
        },
        {
            _id: '2',
            name: 'Product 2',
            description: 'Description of Product 2',
            price: 29.99,
            categoryIds: ['Cat2'],
            imageUrl: 'https://via.placeholder.com/50',
        },
    ],
    onEdit: (product: any) => console.log('Edit Product', product),
    onDelete: (id: string) => console.log('Delete Product', id),
};
