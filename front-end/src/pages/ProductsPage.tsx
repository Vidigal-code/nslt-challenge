import React, { useState } from 'react';
import ProductTable from '../components/tables/ProductTable';
import ProductForm from '../components/forms/ProductForm';
import { 
    Button, 
    CircularProgress, 
    Box, 
    Paper,
    Typography,
    Fade,
    Collapse,
    useTheme,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import {
    Add as AddIcon,
    Close as CloseIcon,
    Inventory2Outlined as ProductsIcon,
    Warning as WarningIcon,
} from '@mui/icons-material';
import { Product } from '../types/Product';
import { useDeleteProduct, useProductsQuery } from '../shared/api/hooks';
import { useQueryClient } from '@tanstack/react-query';

const ProductsPage: React.FC = () => {

    const theme = useTheme();
    const qc = useQueryClient();
    const { data: products = [], isLoading } = useProductsQuery();
    const deleteProductMutation = useDeleteProduct();
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        productId: string | null;
        productName: string;
    }>({
        open: false,
        productId: null,
        productName: '',
    });

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'warning' | 'info';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleDeleteProduct = async (id: string) => {
        const product = products.find(p => p._id === id);
        setDeleteDialog({
            open: true,
            productId: id,
            productName: product?.name || 'this product',
        });
    };

    const confirmDelete = async () => {
        if (!deleteDialog.productId) return;

        try {
            await deleteProductMutation.mutateAsync(deleteDialog.productId);
            setSnackbar({
                open: true,
                message: 'Product deleted successfully!',
                severity: 'success',
            });
        } catch (error: any) {
            const rawMsg = error?.response?.data?.message || error?.message;
            const msg = Array.isArray(rawMsg) ? rawMsg.join(' ') : String(rawMsg || '');
            const isImageKeyError = msg.toLowerCase().includes('invalid image url or key');

            if (isImageKeyError) {
                // Treat backend image-cleanup failure as a soft success; refresh list.
                await qc.invalidateQueries({ queryKey: ['products'] });
                setSnackbar({
                    open: true,
                    message: 'Product deleted (image cleanup failed).',
                    severity: 'warning',
                });
            } else {
                setSnackbar({
                    open: true,
                    message: msg || 'Failed to delete product',
                    severity: 'error',
                });
            }
        } finally {
            setDeleteDialog({ open: false, productId: null, productName: '' });
        }
    };

    const cancelDelete = () => {
        setDeleteDialog({ open: false, productId: null, productName: '' });
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setSelectedProduct(null);
        setFormOpen(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Box>
            <Fade in timeout={600}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        mb: 3,
                        borderRadius: 3,
                        background: theme.palette.mode === 'dark' 
                            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
                            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <ProductsIcon 
                                sx={{ 
                                    fontSize: { xs: 32, sm: 40 }, 
                                    color: 'primary.main' 
                                }} 
                            />
                            <Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        fontSize: { xs: '1.5rem', sm: '2rem' },
                                    }}
                                >
                                    Products Management
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mt: 0.5 }}
                                >
                                    {products.length} {products.length === 1 ? 'product' : 'products'} registered
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={isFormOpen ? <CloseIcon /> : <AddIcon />}
                            onClick={() => {
                                if (isFormOpen) {
                                    handleCloseForm();
                                } else {
                                    setSelectedProduct(null);
                                    setFormOpen(true);
                                }
                            }}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                width: { xs: '100%', sm: 'auto' },
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                },
                            }}
                        >
                            {isFormOpen ? 'Close Form' : 'Add New Product'}
                        </Button>
                    </Box>
                </Paper>
            </Fade>

            <Collapse in={isFormOpen} timeout={500}>
                <Fade in={isFormOpen} timeout={800}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2, sm: 3, md: 4 },
                            mb: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: 'text.primary',
                            }}
                        >
                            {selectedProduct ? 'Edit Product' : 'Create New Product'}
                        </Typography>
                        <ProductForm
                            onSubmit={handleCloseForm}
                            initialData={selectedProduct}
                        />
                    </Paper>
                </Fade>
            </Collapse>

            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 8,
                    }}
                >
                    <CircularProgress size={48} />
                    <Typography
                        variant="body1"
                        sx={{ mt: 2, color: 'text.secondary' }}
                    >
                        Loading products...
                    </Typography>
                </Box>
            ) : (
                <Fade in timeout={1000}>
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            overflow: 'hidden',
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <ProductTable
                            products={products}
                            onDelete={handleDeleteProduct}
                            onEdit={handleEditProduct}
                        />
                    </Paper>
                </Fade>
            )}

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Dialog
                open={deleteDialog.open}
                onClose={cancelDelete}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        minWidth: { xs: '90%', sm: 400 },
                    },
                }}
            >
                <DialogTitle sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    color: 'error.main',
                }}>
                    <WarningIcon />
                    Confirm Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <strong>{deleteDialog.productName}</strong>?
                        <br />
                        <br />
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button 
                        onClick={cancelDelete}
                        variant="outlined"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={confirmDelete}
                        variant="contained"
                        color="error"
                        disabled={deleteProductMutation.isPending}
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                        }}
                    >
                        {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProductsPage;
