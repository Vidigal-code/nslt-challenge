/**
 *
 * 3.3. Component Documentation
 * • Use Storybook to document at least 2 main components. Examples:
 * • Table (for listing Products, Orders or Categories).
 * • Form (for creating/editing).
 *
 * OrderTable Component Stories
 * 
 * Displays a paginated list of orders with product details and order information.
 * 
 * Features:
 * - Product chips display
 * - Formatted currency amounts
 * - Date formatting with icons
 * - Edit and Delete actions
 * - Responsive pagination
 */

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import OrderTable from '../components/tables/OrderTable';
import { lightTheme, darkTheme } from '../theme';

const meta: Meta<typeof OrderTable> = {
  title: 'Tables/OrderTable',
  component: OrderTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## OrderTable Component

The **OrderTable** displays orders in a comprehensive, paginated format.

### Features

- **Product Display**: Product IDs shown as color-coded chips
- **Currency Formatting**: Prices displayed with proper formatting
- **Date Display**: Human-readable dates with calendar icons
- **Actions**: Quick access to edit and delete operations
- **Pagination**: Navigate through large order lists
- **Responsive**: Adapts table layout for mobile devices
- **Visual Enhancements**:
  - Hover effects on rows
  - Color-coded chips for products
  - Success-colored price badges
  - Smooth transitions

### Usage

\`\`\`tsx
<OrderTable
  orders={orderList}
  onEdit={(order) => console.log('Edit', order)}
  onDelete=(id) => console.log('Delete', id)}
/>
\`\`\`

### Props

- **orders**: Array of order objects
- **onEdit**: Callback when edit is clicked
- **onDelete**: Callback when delete is clicked
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orders: {
      description: 'Array of order objects to display',
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
type Story = StoryObj<typeof OrderTable>;

const sampleOrders = [
  {
    _id: '1',
    productIds: ['prod-1', 'prod-3'],
    total: 249.98,
    date: '2024-12-01T10:30:00.000Z',
  },
  {
    _id: '2',
    productIds: ['prod-2'],
    total: 299.99,
    date: '2024-12-02T14:15:00.000Z',
  },
  {
    _id: '3',
    productIds: ['prod-1', 'prod-2', 'prod-4'],
    total: 509.97,
    date: '2024-12-03T09:45:00.000Z',
  },
  {
    _id: '4',
    productIds: ['prod-5'],
    total: 129.99,
    date: '2024-12-04T16:20:00.000Z',
  },
  {
    _id: '5',
    productIds: ['prod-3', 'prod-4', 'prod-5'],
    total: 259.97,
    date: '2024-12-05T11:00:00.000Z',
  },
];

/**
 * Default table with sample orders
 */
export const Default: Story = {
  args: {
    orders: sampleOrders,
    onEdit: (order: any) => console.log('Editing order:', order),
    onDelete: (id: string) => console.log('Deleting order:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default table view with **5 sample orders** showing product chips, formatted prices, and dates.',
      },
    },
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    orders: [],
    onEdit: (order: any) => console.log('Editing order:', order),
    onDelete: (id: string) => console.log('Deleting order:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with **no orders**.',
      },
    },
  },
};

/**
 * Single order
 */
export const SingleOrder: Story = {
  args: {
    orders: [sampleOrders[0]],
    onEdit: (order: any) => console.log('Editing order:', order),
    onDelete: (id: string) => console.log('Deleting order:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with **one order**.',
      },
    },
  },
};

/**
 * Order with many products
 */
export const ManyProducts: Story = {
  args: {
    orders: [
      {
        _id: '1',
        productIds: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6', 'prod-7', 'prod-8'],
        total: 1599.92,
        date: '2024-12-09T10:00:00.000Z',
      },
    ],
    onEdit: (order: any) => console.log('Editing order:', order),
    onDelete: (id: string) => console.log('Deleting order:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Order with **8 products** showing how chips wrap in the table cell.',
      },
    },
  },
};

/**
 * Large dataset for pagination
 */
export const LargeDataset: Story = {
  args: {
    orders: Array.from({ length: 25 }, (_, i) => ({
      _id: `order-${i + 1}`,
      productIds: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, j) => `prod-${j + 1}`),
      total: Math.round((Math.random() * 1000 + 50) * 100) / 100,
      date: new Date(2024, 11, Math.floor(Math.random() * 9) + 1).toISOString(),
    })),
    onEdit: (order: any) => console.log('Editing order:', order),
    onDelete: (id: string) => console.log('Deleting order:', id),
  },
  parameters: {
    docs: {
      description: {
        story: '**25 orders** to demonstrate pagination functionality.',
      },
    },
  },
};

/**
 * High value orders
 */
export const HighValueOrders: Story = {
  args: {
    orders: [
      {
        _id: '1',
        productIds: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5'],
        total: 15999.95,
        date: '2024-12-09T10:00:00.000Z',
      },
      {
        _id: '2',
        productIds: ['prod-6', 'prod-7', 'prod-8'],
        total: 29999.97,
        date: '2024-12-08T14:30:00.000Z',
      },
    ],
    onEdit: (order: any) => console.log('Editing order:', order),
    onDelete: (id: string) => console.log('Deleting order:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Orders with **high total amounts** to test currency formatting.',
      },
    },
  },
};

/**
 * Dark theme variant
 */
export const DarkTheme: Story = {
  args: {
    orders: sampleOrders,
    onEdit: (order: any) => console.log('Editing order:', order),
    onDelete: (id: string) => console.log('Deleting order:', id),
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
        story: 'Table with **dark theme** applied.',
      },
    },
    backgrounds: { default: 'dark' },
  },
};

/**
 * Recent orders (sorted by date)
 */
export const RecentOrders: Story = {
  args: {
    orders: [
      {
        _id: '1',
        productIds: ['prod-1', 'prod-2'],
        total: 449.98,
        date: new Date().toISOString(),
      },
      {
        _id: '2',
        productIds: ['prod-3'],
        total: 149.99,
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      },
      {
        _id: '3',
        productIds: ['prod-4', 'prod-5'],
        total: 219.98,
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ],
    onEdit: (order: any) => console.log('Editing order:', order),
    onDelete: (id: string) => console.log('Deleting order:', id),
  },
  parameters: {
    docs: {
      description: {
        story: '**Recent orders** with dates from today, yesterday, and 2 days ago.',
      },
    },
  },
};
