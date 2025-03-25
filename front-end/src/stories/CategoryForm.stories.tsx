
/*


3.3. Component Documentation
• Use Storybook to document at least 2 main components. Examples:
• Table (for listing Products, Orders or Categories).
• Form (for creating/editing).


 */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CategoryForm from '../components/forms/CategoryForm';
import { CategoryFormProps } from '../types/interface/Interfaces';

const initialData = {
    _id: '1',
    name: 'Sample Category',
};

export default {
    title: 'Components/CategoryForm',
    component: CategoryForm,
    argTypes: {
        onSubmit: { action: 'submitted' },
    },
} as Meta;

const Template: StoryFn<CategoryFormProps> = (args) => <CategoryForm {...args} />;

export const CreateCategory = Template.bind({});
CreateCategory.args = {
    initialData: null,
};

export const EditCategory = Template.bind({});
EditCategory.args = {
    initialData,
};
