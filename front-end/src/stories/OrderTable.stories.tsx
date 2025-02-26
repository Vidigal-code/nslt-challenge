/*


3.3. Component Documentation
• Use Storybook to document at least 2 main components. Examples:
• Table (for listing Products, Orders or Categories).
• Form (for creating/editing).


 */


import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import OrderTable from '../components/tables/OrderTable';

export default {
    title: 'Components/OrderTable',
    component: OrderTable,
    parameters: {
        docs: {
            description: {
                component:
                    'The OrderTable component is used to display a list of orders with the ability to edit and delete them. Each order shows the associated product IDs, total amount, and actions (Edit, Delete).',
            },
        },
    },
} as Meta;

const Template: StoryFn<any> = (args) => <OrderTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    orders: [
        { _id: '1', productIds: ['101', '102'], total: 29.99 },
        { _id: '2', productIds: ['103', '104'], total: 49.99 },
    ],
    onEdit: (order: any) => console.log('Edit Order', order),
    onDelete: (id: string) => console.log('Delete Order', id),
};
