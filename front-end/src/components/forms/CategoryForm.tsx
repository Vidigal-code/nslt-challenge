import React, { useState, useEffect } from 'react';
import { Button, Grid, Box, InputLabel, TextField } from '@mui/material';
import {CategoryFormProps} from "../../types/interface/Interfaces";
import { useCreateCategory, useUpdateCategory } from '../../shared/api/hooks';

const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initialData }) => {

    const [name, setName] = useState('');
    const createCategoryMutation = useCreateCategory();
    const updateCategoryMutation = useUpdateCategory();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const categoryData = { name };

        if (initialData) {
            await updateCategoryMutation.mutateAsync({ id: initialData._id, payload: categoryData });
        } else {
            await createCategoryMutation.mutateAsync(categoryData);
        }

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
                    <Grid>
                        <InputLabel>Name</InputLabel>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid>
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
