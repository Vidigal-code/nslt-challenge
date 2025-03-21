import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, InputLabel, TextField } from '@mui/material';
import { createCategory, updateCategory } from '../../services/Api';
import {CategoryFormProps} from "../../types/Interfaces";

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initialData }) => {

    const [name, setName] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const categoryData = { name };

        await (initialData ? updateCategory(initialData._id, categoryData) : createCategory(categoryData));

        onSubmit();
    };


    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
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
                        <InputLabel>Name</InputLabel>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {initialData ? 'Update Category' : 'Create Category'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default CategoryForm;
