import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../services/Api';
import ProductTable from '../components/tables/ProductTable';
import ProductForm from '../components/forms/ProductForm';
import { Button, CircularProgress, Grid, Box } from '@mui/material';
import { Product } from '../types/Product';

const ProductsPage: React.FC = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


    const loadProducts = async () => {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setLoading(false);
    };


    const handleDeleteProduct = async (id: string) => {
        await deleteProduct(id);
        loadProducts();
    };


    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setFormOpen(true);
    };



    useEffect(() => {
        loadProducts();
    }, []);


    return (
        <div>
            <Grid container spacing={2} justifyContent="center" sx={{ p: 0 }}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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

                <Grid item xs={12} sm={6} md={4} lg={3}>
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

            {loading ? (
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
                            onSubmit={loadProducts}
                            initialData={selectedProduct}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsPage;
