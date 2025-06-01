import React, { useState, useEffect } from 'react';
import {fetchOrders, deleteOrder, fetchProducts} from '../api/Api';
import OrderTable from '../components/tables/OrderTable';
import OrderForm from '../components/forms/OrderForm';
import { Button, CircularProgress, Grid, Box } from '@mui/material';
import { Order } from '../types/Order';

const OrdersPage: React.FC = () => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [allProducts, setAllProducts] = useState<string[]>([]);

    const loadOrders = async () => {
        setLoading(true);
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
        setLoading(false);
    };

    const loadProducts = async () => {
        const fetchedProducts = await fetchProducts();
        setAllProducts(fetchedProducts.map((product: any) => product._id));
    };

    const handleDeleteOrder = async (id: string) => {
        await deleteOrder(id);
        loadOrders();
    };

    const handleEditOrder = (order: Order) => {
        setSelectedOrder(order);
        setFormOpen(true);
    };

    useEffect(() => {
        loadOrders();
        loadProducts();
    }, []);

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

            {loading ? (
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
                            onSubmit={loadOrders}
                            initialData={selectedOrder}
                            allProducts={allProducts}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default OrdersPage;
