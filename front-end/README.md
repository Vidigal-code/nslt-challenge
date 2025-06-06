# Front-End Documentation - React + Material UI + Storybook

## Scripts in `package.json`

The scripts defined in `package.json` are commands that you can run using a Node.js package manager (like `npm` or `yarn`). They are used to automate tasks such as starting the development server, building the application, or generating component documentation in Storybook. Below is the explanation of the defined scripts:

If you're looking to add a script for running Jest tests in your `package.json` and also want to document your commands (similar to how you documented your existing scripts), here's how you can do it.

### Adding Jest Test Script to `package.json`:

1. Add a new script for running Jest tests.
2. Provide a description for it, similar to the structure you've already followed.

### Updated `package.json` with Jest Test Script

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test": "jest --watch"  
  }
}
```

---
# Front-end .env

Sure! Here's an explanation for creating a `.env` file in markdown format:

---

# How to Create a `.env` File

A `.env` file is used to store environment variables that are important for configuring your application. These variables are typically used to store sensitive information, such as API keys, database connection strings, and other configuration settings that differ between development, staging, and production environments.

### Front-end `.env` File

For a front-end application, such as a React app, you may need to set environment variables that configure API endpoints and other settings.

**Example of a Front-end `.env` file:**

```bash
VITE_API_URL=http://localhost:3000
```

- **VITE_API_URL:** This specifies the API endpoint the front-end application will communicate with. It could point to your back-end server, usually set to a local development server (e.g., `http://localhost:3000`) during development.

### Documenting the Scripts:

Here is a detailed breakdown of all the commands in your `scripts` section, including the `test` script for Jest.

---

### 1. `dev`
- **Command:** `"vite"`
- **Description:** This command starts the development server using Vite, a modern and fast build tool for frontend projects. The server will run in development mode, and the application will automatically reload whenever there are changes to the files.

### 2. `build`
- **Command:** `"vite build"`
- **Description:** This command runs the Vite build process, which compiles and optimizes the project for production. It will bundle the files and generate the output in a `dist/` folder, ready for deployment.

### 3. `serve`
- **Command:** `"vite preview"`
- **Description:** This command previews the built application. After running the `build` script, you can use this command to preview the production build locally to make sure everything works as expected before deploying.

### 4. `storybook`
- **Command:** `"storybook dev -p 6006"`
- **Description:** This command starts the Storybook development server on port 6006. Storybook is a tool for developing and showcasing UI components in isolation. It helps you build and test components in a separate environment, independent of the main application.

### 5. `build-storybook`
- **Command:** `"storybook build"`
- **Description:** This command builds the Storybook static site, compiling all the UI components and documentation into a static output that can be deployed or served. It generates a `storybook-static/` folder containing the production-ready build of the Storybook site.

### 6. `test`
- **Command:** `"jest --watch"`
- **Description:** This command runs Jest in watch mode, which will automatically re-run the tests when you make changes to the code. It's helpful for continuous testing during development. Jest is a testing framework used for unit and integration tests in JavaScript and TypeScript applications.

---




This will execute Jest in watch mode, so tests will be rerun automatically as you make changes to your code.

Let me know if you need any more details or if you'd like further clarification!
---

# Information

## Version: 3.0.1 (02/01/24)

### 3.1 Main Pages

The system has the following main pages:

#### Products
- **List:** Display of all registered products.
- **Creation:** Form for creating new products.
- **Editing:** Form for editing existing products.
- **Deletion:** Functionality for deleting products.
- **Image Upload:** The system allows you to upload images, which are saved in S3.

#### Categories
- **List:** Display of all registered categories.
- **Creation:** Form for creating new categories.
- **Editing:** Form for editing existing categories.
- **Deletion:** Functionality for deleting categories.

#### Orders
- **List:** Display of all orders placed.
- **Creation:** Functionality to create new orders.
- **Editing:** Functionality to edit existing orders.
- **Deletion:** Functionality to delete orders.

---

### 3.2 KPI Dashboard

The system displays a dashboard of indicators (KPIs) with the following metrics related to orders:

- **Total number of orders:** Displays the total number of orders placed.
- **Average value per order:** Calculates and displays the average value of all orders.
- **Total revenue:** Displays the total value of revenue generated by orders.
- **Orders by period:** Allows you to view orders by different time intervals, such as:
    - Daily
    - Weekly
    - Monthly

---

### 3.3 Component Documentation

Below are two examples of main components documented using **Storybook**.

#### 3.3.1 Table (for Listing Products, Orders or Categories)

This component is responsible for displaying a table of data. It can be reused on the **Products**, **Orders**, and **Categories** pages.

##### Usage Example:
```jsx
<Table
  columns={[
    { title: 'ID', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Price', field: 'price' },
    { title: 'Creation Date', field: 'createdAt' }
  ]}
  data={dataProducts}
/>
