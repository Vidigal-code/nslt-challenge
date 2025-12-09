/**
 *
 * 3.3. Component Documentation
 * • Use Storybook to document at least 2 main components. Examples:
 * • Table (for listing Products, Orders or Categories).
 * • Form (for creating/editing).
 *
 * CategoryForm Component Stories
 * 
 * A simple form component for creating and editing product categories.
 * 
 * Features:
 * - Single text input for category name
 * - Clean and minimal design
 * - Responsive layout
 * - Theme support
 */

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import CategoryForm from '../components/forms/CategoryForm';
import { lightTheme, darkTheme } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof CategoryForm> = {
  title: 'Forms/CategoryForm',
  component: CategoryForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CategoryForm Component

The **CategoryForm** is a streamlined component for managing product categories.

### Features

- **Simple Input**: Single text field for category name
- **Validation**: Required field with real-time validation
- **Clean Design**: Minimal interface focused on usability
- **Responsive**: Works seamlessly on all devices
- **Dual Mode**: Create new or edit existing categories

### Usage

\`\`\`tsx
<CategoryForm 
  onSubmit={() => console.log('Category saved')}
  initialData={categoryData} // Optional, for editing
/>
\`\`\`

### Props

- **onSubmit**: Callback function when form is submitted
- **initialData**: Optional category data for edit mode
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback function triggered on successful form submission',
      action: 'submitted',
    },
    initialData: {
      description: 'Initial category data. If null, form is in create mode.',
      control: 'object',
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Box sx={{ width: '100%', maxWidth: 500, p: 3 }}>
            <Story />
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CategoryForm>;

/**
 * Create mode - empty form for new categories
 */
export const CreateMode: Story = {
  args: {
    initialData: null,
    onSubmit: () => alert('New category created!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in **create mode** for adding new categories.',
      },
    },
  },
};

/**
 * Edit mode with pre-filled data
 */
export const EditMode: Story = {
  args: {
    initialData: {
      _id: 'cat-123',
      name: 'Electronics',
    },
    onSubmit: () => alert('Category updated!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in **edit mode** with existing category data.',
      },
    },
  },
};

/**
 * Dark theme variant
 */
export const DarkTheme: Story = {
  args: {
    initialData: {
      _id: 'cat-456',
      name: 'Gaming Accessories',
    },
    onSubmit: () => alert('Category saved in dark mode!'),
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{ width: '100%', maxWidth: 500, p: 3, bgcolor: 'background.default', minHeight: 400 }}>
            <Story />
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Form with **dark theme** applied.',
      },
    },
    backgrounds: { default: 'dark' },
  },
};
