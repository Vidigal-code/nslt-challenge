import React, { useState } from 'react';
import ProductTable from '../components/tables/ProductTable';
import ProductForm from '../components/forms/ProductForm';
import { Button, CircularProgress, Grid, Box } from '@mui/material';
import { Product } from '../types/Product';
import { useDeleteProduct, useProductsQuery } from '../shared/api/hooks';

const ProductsPage: React.FC = () => {

    const { data: products = [], isLoading } = useProductsQuery();
    const deleteProductMutation = useDeleteProduct();
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleDeleteProduct = async (id: string) => {
        await deleteProductMutation.mutateAsync(id);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setFormOpen(true);
    };

    return (
        <div>
            <Grid container spacing={2} justifyContent="center" sx={{ p: 0 }}>
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            setSelectedProduct(null);
                            setFormOpen(true);
                        }}
                    >
                        Add New Product
                    </Button>
                </Grid>

                <Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                            setSelectedProduct(null);
                            setFormOpen(false);
                        }}
                    >
                        Close Product
                    </Button>
                </Grid>
            </Grid>

            {isLoading ? (
                <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <ProductTable
                        products={products}
                        onDelete={handleDeleteProduct}
                        onEdit={handleEditProduct}
                    />
                    {isFormOpen && (
                        <ProductForm
                            onSubmit={() => setFormOpen(false)}
                            initialData={selectedProduct}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsPage;
