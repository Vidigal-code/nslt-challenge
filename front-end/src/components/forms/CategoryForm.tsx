import React, { useState, useEffect } from 'react';
import { Button, Box, TextField } from '@mui/material';
import {
    Save as SaveIcon,
    Update as UpdateIcon,
} from '@mui/icons-material';
import { CategoryFormProps } from "../../types/interface/Interfaces";
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
            <Box sx={{ 
                width: '100%',
                display: 'grid',
                gap: 3,
            }}>
                <Box>
                    <TextField
                        label="Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                        variant="outlined"
                        placeholder="Enter category name"
                    />
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
                        {initialData ? 'Update Category' : 'Create Category'}
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default CategoryForm;
