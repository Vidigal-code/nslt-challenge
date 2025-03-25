import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, InputLabel, TextField } from '@mui/material';
import { createOrder, updateOrder } from '../../api/Api';
import { OrderFormProps } from "../../types/interface/Interfaces";

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, initialData }) => {

    const [productIds, setProductIds] = useState<string[]>([]);
    const [total, setTotal] = useState<number>(1);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const orderData = { productIds, total, date };

        await (initialData ? updateOrder(initialData._id, orderData) : createOrder(orderData));

        onSubmit();
    };

    useEffect(() => {
        if (initialData) {
            setProductIds(initialData.productIds);
            setTotal(initialData.total);
            setDate(initialData.date.split('T')[0]);
        }
    }, [initialData]);

    return (
        <form onSubmit={handleSubmit}>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1500,
                    margin: '0 auto',
                    padding: 0,
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel>Product IDs (comma-separated)</InputLabel>
                        <TextField
                            value={productIds.join(', ')}
                            onChange={(e) => setProductIds(e.target.value.split(',').map(id => id.trim()))}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Total</InputLabel>
                        <TextField
                            type="number"
                            value={total}
                            onChange={(e) => setTotal(Number(e.target.value))}
                            fullWidth
                            required
                            inputProps={{ min: 1}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Date</InputLabel>
                        <TextField
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {initialData ? 'Update Order' : 'Create Order'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default OrderForm;
