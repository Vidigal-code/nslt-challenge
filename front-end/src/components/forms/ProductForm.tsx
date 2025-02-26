import React, { useState, useEffect } from 'react';
import {Button, Grid, Box, InputLabel, TextField} from '@mui/material';
import { createProduct, updateProduct } from '../../services/Api';
import {ProductFormProps} from "../../services/Interfaces";

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | string>('');
    const [categoryIds, setCategoryIds] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', String(price));
        formData.append('categoryIds', categoryIds);

        if (image) formData.append('image', image);

        await (initialData ? updateProduct(initialData._id, formData) : createProduct(formData));

        onSubmit();
    };

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
            setPrice(initialData.price);
            setCategoryIds(initialData.categoryIds.join(','));
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
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Name</InputLabel>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Price</InputLabel>
                        <TextField
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Category IDs (comma-separated)</InputLabel>
                        <TextField
                            value={categoryIds}
                            onChange={(e) => setCategoryIds(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel>Image</InputLabel>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            style={{width: '100%'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {initialData ? 'Update Product' : 'Create Product'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default ProductForm;
