
/*


3.3. Component Documentation
• Use Storybook to document at least 2 main components. Examples:
• Table (for listing Products, Orders or Categories).
• Form (for creating/editing).


 */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import OrderForm from '../components/forms/OrderForm';
import { OrderFormProps } from '../types/Interfaces';

const allProducts = [
    { _id: '1', name: 'Product 1' },
    { _id: '2', name: 'Product 2' },
    { _id: '3', name: 'Product 3' },
];

const initialData = {
    _id: '1',
    productIds: ['1', '2'],
    total: 250,
    date: '2025-02-25',
};

export default {
    title: 'Components/OrderForm',
    component: OrderForm,
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} as Meta;

const Template: StoryFn<OrderFormProps> = (args) => <OrderForm {...args} />;

export const CreateOrder = Template.bind({});
CreateOrder.args = {
    initialData: null,
    allProducts: allProducts.map(product => product._id),
};

export const EditOrder = Template.bind({});
EditOrder.args = {
    initialData,
    allProducts: allProducts.map(product => product._id),
};
