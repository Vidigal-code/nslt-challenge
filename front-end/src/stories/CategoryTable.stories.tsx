/**
 *
 * 3.3. Component Documentation
 * • Use Storybook to document at least 2 main components. Examples:
 * • Table (for listing Products, Orders or Categories).
 * • Form (for creating/editing).
 *
 * CategoryTable Component Stories
 *
 * Displays a paginated list of product categories with CRUD operations.
 *
 * Features:
 * - Simple two-column layout (Name, Actions)
 * - Pagination controls
 * - Edit and Delete actions
 * - Icon-enhanced display
 * - Responsive design
 */

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import CategoryTable from '../components/tables/CategoryTable';
import { lightTheme, darkTheme } from '../theme';

const meta: Meta<typeof CategoryTable> = {
  title: 'Tables/CategoryTable',
  component: CategoryTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## CategoryTable Component

The **CategoryTable** component displays categories in a clean, paginated table format.

### Features

- **Simple Layout**: Focused on category name and actions
- **Icon Display**: Category icon for visual identification
- **Pagination**: Navigate through large category lists
- **Actions**: Quick access to edit and delete operations
- **Responsive**: Adapts to mobile and desktop views
- **Hover Effects**: Visual feedback on row interactions

### Usage

\`\`\`tsx
<CategoryTable
  categories={categoryList}
  onEdit={(category) => console.log('Edit', category)}
  onDelete=(id) => console.log('Delete', id)}
/>
\`\`\`

### Props

- **categories**: Array of category objects
- **onEdit**: Callback when edit is clicked
- **onDelete**: Callback when delete is clicked
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    categories: {
      description: 'Array of category objects to display',
      control: 'object',
    },
    onEdit: {
      description: 'Callback function triggered when edit button is clicked',
      action: 'edit',
    },
    onDelete: {
      description: 'Callback function triggered when delete button is clicked',
      action: 'delete',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CategoryTable>;

const sampleCategories = [
  { _id: '1', name: 'Electronics' },
  { _id: '2', name: 'Gaming' },
  { _id: '3', name: 'Audio' },
  { _id: '4', name: 'Wearables' },
  { _id: '5', name: 'Accessories' },
  { _id: '6', name: 'Cameras' },
  { _id: '7', name: 'Computers' },
];

/**
 * Default table with sample categories
 */
export const Default: Story = {
  args: {
    categories: sampleCategories,
    onEdit: (category: any) => console.log('Editing category:', category),
    onDelete: (id: string) => console.log('Deleting category:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default table view with **7 sample categories**.',
      },
    },
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    categories: [],
    onEdit: (category: any) => console.log('Editing category:', category),
    onDelete: (id: string) => console.log('Deleting category:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with **no categories**.',
      },
    },
  },
};

/**
 * Single category
 */
export const SingleCategory: Story = {
  args: {
    categories: [sampleCategories[0]],
    onEdit: (category: any) => console.log('Editing category:', category),
    onDelete: (id: string) => console.log('Deleting category:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with **one category**.',
      },
    },
  },
};

/**
 * Large dataset for pagination
 */
export const LargeDataset: Story = {
  args: {
    categories: Array.from({ length: 20 }, (_, i) => ({
      _id: `cat-${i + 1}`,
      name: `Category ${i + 1}`,
    })),
    onEdit: (category: any) => console.log('Editing category:', category),
    onDelete: (id: string) => console.log('Deleting category:', id),
  },
  parameters: {
    docs: {
      description: {
        story: '**20 categories** to test pagination.',
      },
    },
  },
};

/**
 * Dark theme variant
 */
export const DarkTheme: Story = {
  args: {
    categories: sampleCategories,
    onEdit: (category: any) => console.log('Editing category:', category),
    onDelete: (id: string) => console.log('Deleting category:', id),
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
          <Story />
        </Box>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Table with **dark theme**.',
      },
    },
    backgrounds: { default: 'dark' },
  },
};
