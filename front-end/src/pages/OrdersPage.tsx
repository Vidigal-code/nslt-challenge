import React, { useState } from 'react';
import OrderTable from '../components/tables/OrderTable';
import OrderForm from '../components/forms/OrderForm';
import { Button, CircularProgress, Grid, Box } from '@mui/material';
import { Order } from '../types/Order';
import { useDeleteOrder, useOrdersQuery, useProductsQuery } from '../shared/api/hooks';

const OrdersPage: React.FC = () => {

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

    return (
        <div>
            <Grid container spacing={2} justifyContent="center" sx={{ p: 0 }}>
                <Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            setSelectedOrder(null);
                            setFormOpen(true);
                        }}
                    >
                        Add New Order
                    </Button>
                </Grid>

                <Grid>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                            setSelectedOrder(null);
                            setFormOpen(false);
                        }}
                    >
                        Close Order
                    </Button>
                </Grid>
            </Grid>

            {isLoading ? (
                <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <OrderTable
                        orders={orders}
                        onDelete={handleDeleteOrder}
                        onEdit={handleEditOrder}
                    />
                    {isFormOpen && (
                        <OrderForm
                            onSubmit={() => setFormOpen(false)}
                            initialData={selectedOrder}
                            allProducts={products.map((product: any) => product._id)}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default OrdersPage;
