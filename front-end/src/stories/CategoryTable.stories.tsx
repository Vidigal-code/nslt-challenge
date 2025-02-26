
/*


3.3. Component Documentation
• Use Storybook to document at least 2 main components. Examples:
• Table (for listing Products, Orders or Categories).
• Form (for creating/editing).


 */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CategoryTable from '../components/tables/CategoryTable';


export default {
    title: 'Components/CategoryTable',
    component: CategoryTable,
    parameters: {
        docs: {
            description: {
                component: 'A table to display categories with edit and delete actions.',
            },
        },
    },
} as Meta;

const Template: StoryFn<any> = (args) => <CategoryTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    categories: [
        { _id: '1', name: 'Category 1' },
        { _id: '2', name: 'Category 2' },
    ],
    onEdit: (category: any) => console.log('Edit', category),
    onDelete: (id: string) => console.log('Delete', id),
};
