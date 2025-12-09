import React, { useState, useEffect } from 'react';
import { 
    Button, 
    Box, 
    TextField, 
    useTheme,
    Typography,
    Paper,
    Chip,
    alpha,
} from '@mui/material';
import {
    Save as SaveIcon,
    Update as UpdateIcon,
    Add as AddIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { OrderFormProps } from "../../types/interface/Interfaces";
import { useCreateOrder, useUpdateOrder } from '../../shared/api/hooks';

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, initialData }) => {

    const theme = useTheme();

    const [productIds, setProductIds] = useState<string[]>([]);
    const [productInput, setProductInput] = useState('');
    const [total, setTotal] = useState<number>(1);
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const createOrderMutation = useCreateOrder();
    const updateOrderMutation = useUpdateOrder();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const orderData = { productIds, total, date };

        if (initialData) {
            await updateOrderMutation.mutateAsync({ id: initialData._id, payload: orderData });
        } else {
            await createOrderMutation.mutateAsync(orderData);
        }

        onSubmit();
    };

    useEffect(() => {
        if (initialData) {
            setProductIds(initialData.productIds);
            setTotal(initialData.total);
            setDate(initialData.date.split('T')[0]);
        }
    }, [initialData]);

    const handleAddProduct = () => {
        const trimmed = productInput.trim();
        if (trimmed && !productIds.includes(trimmed)) {
            setProductIds([...productIds, trimmed]);
            setProductInput('');
        }
    };

    const handleRemoveProduct = (id: string) => {
        setProductIds(productIds.filter(prodId => prodId !== id));
    };

    const handleProductKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddProduct();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 3,
                }}>
                    <Box>
                        <Typography 
                            variant="subtitle2" 
                            sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}
                        >
                            Product IDs *
                        </Typography>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 2,
                                backgroundColor: 'background.paper',
                                minHeight: 120,
                                maxHeight: 300,
                                overflowY: 'auto',
                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: alpha(theme.palette.divider, 0.1),
                                    borderRadius: '4px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.3),
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.5),
                                    },
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: productIds.length > 0 ? 2 : 0 }}>
                                {productIds.map((id, index) => (
                                    <Chip
                                        key={index}
                                        label={id}
                                        onDelete={() => handleRemoveProduct(id)}
                                        deleteIcon={<CloseIcon />}
                                        sx={{
                                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                                            color: 'secondary.main',
                                            fontWeight: 500,
                                            '& .MuiChip-deleteIcon': {
                                                color: 'secondary.main',
                                                '&:hover': {
                                                    color: 'error.main',
                                                },
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                                <TextField
                                    value={productInput}
                                    onChange={(e) => setProductInput(e.target.value)}
                                    onKeyPress={handleProductKeyPress}
                                    placeholder="Type product ID and press Enter or click Add"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'background.default',
                                        },
                                    }}
                                />
                                <Button
                                    onClick={handleAddProduct}
                                    variant="contained"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    disabled={!productInput.trim()}
                                    sx={{
                                        minWidth: { xs: '100%', sm: 100 },
                                        textTransform: 'none',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Paper>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                            Add product IDs one by one. Press Enter or click Add button.
                        </Typography>
                    </Box>
                    
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                        gap: 3,
                    }}>
                        <Box>
                            <TextField
                                label="Total"
                                type="number"
                                value={total}
                                onChange={(e) => setTotal(Number(e.target.value))}
                                fullWidth
                                required
                                variant="outlined"
                                placeholder="Enter total amount"
                                inputProps={{ min: 1, step: 0.01 }}
                            />
                        </Box>

                        <Box>
                            <TextField
                                label="Order Date"
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                fullWidth
                                required
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                    </Box>
                    
                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={initialData ? <UpdateIcon /> : <SaveIcon />}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                            }}
                        >
                            {initialData ? 'Update Order' : 'Create Order'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default OrderForm;
