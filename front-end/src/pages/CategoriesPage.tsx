import React, { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from '../api/Api';
import CategoryTable from '../components/tables/CategoryTable';
import CategoryForm from '../components/forms/CategoryForm';
import { Button, CircularProgress, Grid, Box } from '@mui/material';
import { Category } from '../types/Category';

const CategoriesPage: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);


    const loadCategories = async () => {
        setLoading(true);
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        setLoading(false);
    };


    const handleDeleteCategory = async (id: string) => {
        await deleteCategory(id);
        loadCategories();
    };


    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
        setFormOpen(true);
    };

    useEffect(() => {
        loadCategories();
    }, []);


    return (
        <div>
            <Grid container spacing={2} justifyContent="center" sx={{ p: 0 }}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                            setSelectedCategory(null);
                            setFormOpen(true);
                        }}
                    >
                        Add New Category
                    </Button>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                            setSelectedCategory(null);
                            setFormOpen(false);
                        }}
                    >
                        Close Category
                    </Button>
                </Grid>
            </Grid>

            {loading ? (
                <Box display="flex" justifyContent="center" sx={{ p: 0 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <CategoryTable
                        categories={categories}
                        onDelete={handleDeleteCategory}
                        onEdit={handleEditCategory}
                    />
                    {isFormOpen && (
                        <CategoryForm
                            onSubmit={loadCategories}
                            initialData={selectedCategory}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CategoriesPage;
