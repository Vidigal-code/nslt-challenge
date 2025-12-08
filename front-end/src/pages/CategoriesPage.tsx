import React, { useState } from 'react';
import CategoryTable from '../components/tables/CategoryTable';
import CategoryForm from '../components/forms/CategoryForm';
import { Button, CircularProgress, Grid, Box } from '@mui/material';
import { Category } from '../types/Category';
import { useCategoriesQuery, useDeleteCategory } from '../shared/api/hooks';

const CategoriesPage: React.FC = () => {

    const { data: categories = [], isLoading } = useCategoriesQuery();
    const deleteCategoryMutation = useDeleteCategory();
    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    const handleDeleteCategory = async (id: string) => {
        await deleteCategoryMutation.mutateAsync(id);
    };

    const handleEditCategory = (category: Category) => {
        setSelectedCategory(category);
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
                            setSelectedCategory(null);
                            setFormOpen(true);
                        }}
                    >
                        Add New Category
                    </Button>
                </Grid>

                <Grid>
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

            {isLoading ? (
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
                            onSubmit={() => setFormOpen(false)}
                            initialData={selectedCategory}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CategoriesPage;
