/**
 *
 * 3.3. Component Documentation
 * • Use Storybook to document at least 2 main components. Examples:
 * • Table (for listing Products, Orders or Categories).
 * • Form (for creating/editing).
 *
 * OrderForm Component Stories
 * 
 * Form component for creating and editing orders with product selection.
 * 
 * Features:
 * - Interactive chip-based product ID input
 * - Total amount calculation
 * - Date picker for order date
 * - Responsive layout
 * - Theme support
 */

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import OrderForm from '../components/forms/OrderForm';
import { OrderFormProps } from '../types/interface/Interfaces';
import { lightTheme, darkTheme } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof OrderForm> = {
  title: 'Forms/OrderForm',
  component: OrderForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## OrderForm Component

The **OrderForm** manages order creation and editing with product selection.

### Features

- **Product IDs**: Interactive chip-based input system
  - Add products one by one
  - Visual chips with delete buttons
  - Prevents duplicate entries
  - Auto-expanding with scroll (120-300px)
  - Press Enter or click Add button
- **Total Amount**: Numeric input with validation
- **Order Date**: Date picker with calendar
- **Responsive Design**: 
  - Desktop: Side-by-side fields
  - Mobile: Stacked layout
- **Theme Support**: Light and dark modes

### Usage

\`\`\`tsx
<OrderForm 
  onSubmit={() => console.log('Order saved')}
  initialData={orderData} // Optional
  allProducts={productIds} // Available product IDs
/>
\`\`\`

### Props

- **onSubmit**: Callback on form submission
- **initialData**: Optional order data for editing
- **allProducts**: Array of available product IDs (optional)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback function triggered on successful submission',
      action: 'submitted',
    },
    initialData: {
      description: 'Initial order data for edit mode',
      control: 'object',
    },
    allProducts: {
      description: 'Array of available product IDs (for validation)',
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Box sx={{ width: '100%', maxWidth: 800, p: 3 }}>
            <Story />
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OrderForm>;

/**
 * Create mode - empty form
 */
export const CreateMode: Story = {
  args: {
    initialData: null,
    allProducts: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5'],
    onSubmit: () => alert('Order created successfully!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in **create mode** with empty fields ready for new order entry.',
      },
    },
  },
};

/**
 * Edit mode with existing order
 */
export const EditMode: Story = {
  args: {
    initialData: {
      _id: 'order-123',
      productIds: ['prod-1', 'prod-3', 'prod-5'],
      total: 459.97,
      date: '2024-12-09T00:00:00.000Z',
    },
    allProducts: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5'],
    onSubmit: () => alert('Order updated successfully!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in **edit mode** with pre-filled order data including 3 products.',
      },
    },
  },
};

/**
 * Order with many products
 */
export const ManyProducts: Story = {
  args: {
    initialData: {
      _id: 'order-456',
      productIds: [
        'prod-1',
        'prod-2',
        'prod-3',
        'prod-4',
        'prod-5',
        'prod-6',
        'prod-7',
        'prod-8',
      ],
      total: 1299.99,
      date: '2024-12-09T00:00:00.000Z',
    },
    allProducts: Array.from({ length: 20 }, (_, i) => `prod-${i + 1}`),
    onSubmit: () => alert('Order with multiple products saved!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Order with **8 products** to demonstrate the **scrollable chip container**. Container automatically scrolls when exceeding 300px height.',
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
      _id: 'order-789',
      productIds: ['prod-10', 'prod-11', 'prod-12'],
      total: 899.99,
      date: '2024-12-09T00:00:00.000Z',
    },
    allProducts: Array.from({ length: 15 }, (_, i) => `prod-${i + 1}`),
    onSubmit: () => alert('Order saved in dark mode!'),
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Box sx={{ width: '100%', maxWidth: 800, p: 3, bgcolor: 'background.default', minHeight: 600 }}>
            <Story />
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Form with **dark theme**. All elements adapt to dark color scheme with optimized contrast.',
      },
    },
    backgrounds: { default: 'dark' },
  },
};

/**
 * Large order amount
 */
export const LargeOrder: Story = {
  args: {
    initialData: {
      _id: 'order-999',
      productIds: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6'],
      total: 15999.99,
      date: '2024-12-09T00:00:00.000Z',
    },
    allProducts: Array.from({ length: 10 }, (_, i) => `prod-${i + 1}`),
    onSubmit: () => alert('Large order saved!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Order with **high total amount** to demonstrate numeric formatting.',
      },
    },
  },
};
