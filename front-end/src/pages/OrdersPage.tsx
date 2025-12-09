import React, { useState } from 'react';
import OrderTable from '../components/tables/OrderTable';
import OrderForm from '../components/forms/OrderForm';
import { 
    Button, 
    CircularProgress, 
    Box, 
    Paper,
    Typography,
    Fade,
    Collapse,
    useTheme,
} from '@mui/material';
import {
    Add as AddIcon,
    Close as CloseIcon,
    ShoppingCartOutlined as OrdersIcon,
} from '@mui/icons-material';
import { Order } from '../types/Order';
import { useDeleteOrder, useOrdersQuery, useProductsQuery } from '../shared/api/hooks';

const OrdersPage: React.FC = () => {
    const theme = useTheme();

    const { data: orders = [], isLoading } = useOrdersQuery();
    const { data: products = [] } = useProductsQuery();
    const deleteOrderMutation = useDeleteOrder();
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const handleDeleteOrder = async (id: string) => {
        await deleteOrderMutation.mutateAsync(id);
    };

    const handleEditOrder = (order: Order) => {
        setSelectedOrder(order);
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setSelectedOrder(null);
        setFormOpen(false);
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
                            <OrdersIcon 
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
                                    Orders Management
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mt: 0.5 }}
                                >
                                    {orders.length} {orders.length === 1 ? 'order' : 'orders'} registered
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
                                    setSelectedOrder(null);
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
                            {isFormOpen ? 'Close Form' : 'Add New Order'}
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
                            {selectedOrder ? 'Edit Order' : 'Create New Order'}
                        </Typography>
                        <OrderForm
                            onSubmit={handleCloseForm}
                            initialData={selectedOrder}
                            allProducts={products.map((product: any) => product._id)}
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
                        Loading orders...
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
                        <OrderTable
                            orders={orders}
                            onDelete={handleDeleteOrder}
                            onEdit={handleEditOrder}
                        />
                    </Paper>
                </Fade>
            )}
        </Box>
    );
};

export default OrdersPage;
