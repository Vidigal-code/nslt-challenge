/**
 *
 * 3.3. Component Documentation
 * • Use Storybook to document at least 2 main components. Examples:
 * • Table (for listing Products, Orders or Categories).
 * • Form (for creating/editing).
 *
 * ProductTable Component Stories
 * 
 * This component displays a paginated list of products with CRUD operations.
 * 
 * Features:
 * - Sortable columns
 * - Pagination with configurable rows per page
 * - Edit and Delete actions
 * - Responsive design with mobile optimization
 * - Avatar display for product images
 * - Chip-based category display
 */

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import ProductTable from '../components/tables/ProductTable';
import { lightTheme, darkTheme } from '../theme';

const meta: Meta<typeof ProductTable> = {
  title: 'Tables/ProductTable',
  component: ProductTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ProductTable Component

The **ProductTable** component provides a comprehensive data grid for displaying and managing products.

### Features

- **Responsive Grid**: Adapts to all screen sizes
  - Desktop: Full table view
  - Mobile: Optimized compact view
- **Pagination**: Built-in pagination controls
  - Configurable rows per page (5, 10, 25)
  - Shows total count and current page
- **Product Information Display**:
  - Product image with fallback avatar
  - Name, description, price
  - Category chips (color-coded)
- **Actions**:
  - Edit button (primary color)
  - Delete button (error color)
  - Icon-based buttons for cleaner UI
- **Visual Enhancements**:
  - Hover effects on rows
  - Smooth transitions
  - Color-coded price chips
  - Theme-aware styling

### Usage

\`\`\`tsx
<ProductTable
  products={productList}
  onEdit={(product) => console.log('Edit', product)}
  onDelete={(id) => console.log('Delete', id)}
/>
\`\`\`

### Props

- **products**: Array of product objects to display
- **onEdit**: Callback when edit button is clicked
- **onDelete**: Callback when delete button is clicked
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    products: {
      description: 'Array of product objects to display in the table',
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
type Story = StoryObj<typeof ProductTable>;

const sampleProducts = [
  {
    _id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 149.99,
    categoryIds: ['electronics', 'audio'],
    imageUrl: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Headphones',
  },
  {
    _id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    categoryIds: ['electronics', 'wearables', 'fitness'],
    imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Watch',
  },
  {
    _id: '3',
    name: 'Mechanical Keyboard RGB',
    description: 'Gaming keyboard with customizable RGB lighting and cherry MX switches',
    price: 89.99,
    categoryIds: ['electronics', 'gaming', 'accessories'],
    imageUrl: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Keyboard',
  },
  {
    _id: '4',
    name: 'USB-C Hub 7-in-1',
    description: 'Multi-port adapter with HDMI, USB 3.0, and SD card reader',
    price: 39.99,
    categoryIds: ['electronics', 'accessories'],
    imageUrl: 'https://via.placeholder.com/150/FFFF00/000000?text=Hub',
  },
  {
    _id: '5',
    name: 'Webcam 4K Ultra HD',
    description: 'Professional streaming webcam with autofocus and noise cancellation',
    price: 129.99,
    categoryIds: ['electronics', 'cameras', 'streaming'],
    imageUrl: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Webcam',
  },
];

/**
 * Default table with sample products
 */
export const Default: Story = {
  args: {
    products: sampleProducts,
    onEdit: (product: any) => console.log('Editing product:', product),
    onDelete: (id: string) => console.log('Deleting product:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default table view with **5 sample products**. Shows pagination controls, product images, categories as chips, and action buttons.',
      },
    },
  },
};

/**
 * Empty state - no products
 */
export const Empty: Story = {
  args: {
    products: [],
    onEdit: (product: any) => console.log('Editing product:', product),
    onDelete: (id: string) => console.log('Deleting product:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with **no products**. Shows the empty state UI.',
      },
    },
  },
};

/**
 * Single product
 */
export const SingleProduct: Story = {
  args: {
    products: [sampleProducts[0]],
    onEdit: (product: any) => console.log('Editing product:', product),
    onDelete: (id: string) => console.log('Deleting product:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with **only one product**. Useful for testing minimal data scenarios.',
      },
    },
  },
};

/**
 * Large dataset for pagination testing
 */
export const LargeDataset: Story = {
  args: {
    products: Array.from({ length: 25 }, (_, i) => ({
      _id: `prod-${i + 1}`,
      name: `Product ${i + 1}`,
      description: `This is the description for product number ${i + 1}`,
      price: Math.round((Math.random() * 500 + 10) * 100) / 100,
      categoryIds: ['electronics', i % 2 === 0 ? 'accessories' : 'gaming'],
      imageUrl: `https://via.placeholder.com/150/${Math.floor(Math.random() * 16777215).toString(16)}/FFFFFF?text=P${i + 1}`,
    })),
    onEdit: (product: any) => console.log('Editing product:', product),
    onDelete: (id: string) => console.log('Deleting product:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Table with **25 products** to demonstrate **pagination functionality**. Try changing rows per page and navigating between pages.',
      },
    },
  },
};

/**
 * Products without images
 */
export const WithoutImages: Story = {
  args: {
    products: sampleProducts.map(p => ({ ...p, imageUrl: '' })),
    onEdit: (product: any) => console.log('Editing product:', product),
    onDelete: (id: string) => console.log('Deleting product:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Products **without images**. Shows fallback avatars with product initials.',
      },
    },
  },
};

/**
 * Dark theme variant
 */
export const DarkTheme: Story = {
  args: {
    products: sampleProducts,
    onEdit: (product: any) => console.log('Editing product:', product),
    onDelete: (id: string) => console.log('Deleting product:', id),
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
        story: 'Table rendered with **dark theme**. All colors adapt automatically to the dark color scheme.',
      },
    },
    backgrounds: { default: 'dark' },
  },
};

/**
 * Products with many categories
 */
export const ManyCategories: Story = {
  args: {
    products: [
      {
        ...sampleProducts[0],
        categoryIds: ['electronics', 'audio', 'wireless', 'bluetooth', 'premium', 'noise-cancelling'],
      },
      {
        ...sampleProducts[1],
        categoryIds: ['electronics', 'wearables', 'fitness', 'smart', 'gps', 'waterproof'],
      },
    ],
    onEdit: (product: any) => console.log('Editing product:', product),
    onDelete: (id: string) => console.log('Deleting product:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Products with **multiple category tags**. Demonstrates how the chip display handles many categories with proper wrapping.',
      },
    },
  },
};
