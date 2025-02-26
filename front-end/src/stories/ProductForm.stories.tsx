
/*


3.3. Component Documentation
• Use Storybook to document at least 2 main components. Examples:
• Table (for listing Products, Orders or Categories).
• Form (for creating/editing).


 */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProductForm from '../components/forms/ProductForm';
import { ProductFormProps } from '../services/Interfaces';

const initialData = {
    _id: '1',
    name: 'Sample Product',
    description: 'This is a sample description.',
    price: 100,
    categoryIds: ['1', '2'],
    imageUrl: 'https://via.placeholder.com/150', // Include the image URL here
};

export default {
    title: 'Components/ProductForm',
    component: ProductForm,
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} as Meta;

const Template: StoryFn<ProductFormProps> = (args) => <ProductForm {...args} />;

export const CreateProduct = Template.bind({});
CreateProduct.args = {
    initialData: null,
};

export const EditProduct = Template.bind({});
EditProduct.args = {
    initialData,
};
