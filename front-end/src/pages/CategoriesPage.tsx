import React, { useState } from 'react';
import CategoryTable from '../components/tables/CategoryTable';
import CategoryForm from '../components/forms/CategoryForm';
import { 
    Button, 
    CircularProgress, 
    Box, 
    Paper,
    Typography,
    Fade,
    Collapse,
    useTheme,
} from '@mui/material';
import {
    Add as AddIcon,
    Close as CloseIcon,
    CategoryOutlined as CategoriesIcon,
} from '@mui/icons-material';
import { Category } from '../types/Category';
import { useCategoriesQuery, useDeleteCategory } from '../shared/api/hooks';

const CategoriesPage: React.FC = () => {

    const theme = useTheme();

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

    const handleCloseForm = () => {
        setSelectedCategory(null);
        setFormOpen(false);
    };

    return (
        <Box>
            <Fade in timeout={600}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        mb: 3,
                        borderRadius: 3,
                        background: theme.palette.mode === 'dark' 
                            ? 'linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%)'
                            : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CategoriesIcon 
                                sx={{ 
                                    fontSize: { xs: 32, sm: 40 }, 
                                    color: 'primary.main' 
                                }} 
                            />
                            <Box>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        fontSize: { xs: '1.5rem', sm: '2rem' },
                                    }}
                                >
                                    Categories Management
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', mt: 0.5 }}
                                >
                                    {categories.length} {categories.length === 1 ? 'category' : 'categories'} registered
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={isFormOpen ? <CloseIcon /> : <AddIcon />}
                            onClick={() => {
                                if (isFormOpen) {
                                    handleCloseForm();
                                } else {
                                    setSelectedCategory(null);
                                    setFormOpen(true);
                                }
                            }}
                            sx={{
                                borderRadius: 2,
                                px: 3,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                width: { xs: '100%', sm: 'auto' },
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                },
                            }}
                        >
                            {isFormOpen ? 'Close Form' : 'Add New Category'}
                        </Button>
                    </Box>
                </Paper>
            </Fade>

            <Collapse in={isFormOpen} timeout={500}>
                <Fade in={isFormOpen} timeout={800}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2, sm: 3, md: 4 },
                            mb: 3,
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,
                                fontWeight: 600,
                                color: 'text.primary',
                            }}
                        >
                            {selectedCategory ? 'Edit Category' : 'Create New Category'}
                        </Typography>
                        <CategoryForm
                            onSubmit={handleCloseForm}
                            initialData={selectedCategory}
                        />
                    </Paper>
                </Fade>
            </Collapse>

            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        py: 8,
                    }}
                >
                    <CircularProgress size={48} />
                    <Typography
                        variant="body1"
                        sx={{ mt: 2, color: 'text.secondary' }}
                    >
                        Loading categories...
                    </Typography>
                </Box>
            ) : (
                <Fade in timeout={1000}>
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            border: `1px solid ${theme.palette.divider}`,
                            overflow: 'hidden',
                            backgroundColor: 'background.paper',
                        }}
                    >
                        <CategoryTable
                            categories={categories}
                            onDelete={handleDeleteCategory}
                            onEdit={handleEditCategory}
                        />
                    </Paper>
                </Fade>
            )}
        </Box>
    );
};

export default CategoriesPage;
