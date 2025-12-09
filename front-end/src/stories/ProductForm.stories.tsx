/**
 *
 * 3.3. Component Documentation
 * • Use Storybook to document at least 2 main components. Examples:
 * • Table (for listing Products, Orders or Categories).
 * • Form (for creating/editing).
 *
 * ProductForm Component Stories
 * 
 * This component is used for creating and editing products in the system.
 * It includes fields for product name, description, price, category IDs, and image upload.
 * 
 * Features:
 * - Interactive chip-based category ID input
 * - Drag & drop image upload with validation
 * - Real-time form validation
 * - Responsive design (mobile-first)
 * - Dark/Light theme support
 */

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import ProductForm from '../components/forms/ProductForm';
import { lightTheme, darkTheme } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof ProductForm> = {
  title: 'Forms/ProductForm',
  component: ProductForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProductForm Component

The **ProductForm** component provides a comprehensive interface for creating and editing products.

### Features

- **Name & Price Input**: Required fields with validation
- **Description**: Multi-line text area for detailed product information
- **Category IDs**: Interactive chip-based input system
  - Add categories one by one
  - Visual chips with delete buttons
  - Prevents duplicate entries
  - Auto-expanding container with scroll
- **Image Upload**: Drag & drop or click to upload
  - Supported formats: PNG, JPEG, GIF, WebP, BMP, SVG
  - Maximum file size: 5MB
  - Visual feedback for selected files
- **Responsive Design**: Adapts to all screen sizes
- **Theme Support**: Works seamlessly in light and dark modes

### Usage

\`\`\`tsx
<ProductForm 
  onSubmit={() => console.log('Form submitted')}
  initialData={productData} // Optional, for editing
/>
\`\`\`

### Props

- **onSubmit**: Callback function called when form is submitted
- **initialData**: Optional product data for editing mode
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback function triggered when the form is successfully submitted',
      action: 'submitted',
    },
    initialData: {
      description: 'Initial product data for editing mode. If null, the form is in create mode.',
      control: 'object',
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
type Story = StoryObj<typeof ProductForm>;

/**
 * Default state for creating a new product.
 * All fields are empty and ready for user input.
 */
export const CreateMode: Story = {
  args: {
    initialData: null,
    onSubmit: () => alert('Product created successfully!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in **create mode** with all fields empty. Use this to add new products to the system.',
      },
    },
  },
};

/**
 * Edit mode with pre-filled data.
 * Used when modifying existing products.
 */
export const EditMode: Story = {
  args: {
    initialData: {
      _id: 'prod-123',
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling headphones with 30-hour battery life and crystal-clear audio quality.',
      price: 149.99,
      categoryIds: ['electronics', 'audio'],
      imageUrl: 'https://via.placeholder.com/150',
    },
    onSubmit: () => alert('Product updated successfully!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form in **edit mode** with existing product data. All fields are pre-populated and can be modified.',
      },
    },
  },
};

/**
 * Form with multiple categories to demonstrate the chip system.
 */
export const WithManyCategories: Story = {
  args: {
    initialData: {
      _id: 'prod-456',
      name: 'Smart Watch Pro',
      description: 'Advanced fitness tracking with heart rate monitor, GPS, and water resistance up to 50m.',
      price: 299.99,
      categoryIds: ['electronics', 'wearables', 'fitness', 'smartwatch', 'accessories'],
      imageUrl: 'https://via.placeholder.com/150',
    },
    onSubmit: () => alert('Product with multiple categories updated!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the **scrollable chip container** with multiple category IDs. The container automatically enables scrolling when content exceeds 300px height.',
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
      _id: 'prod-789',
      name: 'Gaming Laptop',
      description: 'High-performance gaming laptop with RTX 4080, 32GB RAM, and 1TB SSD.',
      price: 1999.99,
      categoryIds: ['electronics', 'computers', 'gaming'],
      imageUrl: 'https://via.placeholder.com/150',
    },
    onSubmit: () => alert('Product saved in dark mode!'),
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
        story: 'Form rendered with **dark theme**. All colors and contrasts are optimized for dark mode.',
      },
    },
    backgrounds: { default: 'dark' },
  },
};
