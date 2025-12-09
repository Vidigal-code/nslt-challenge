import React, { useState, useEffect, useRef } from 'react';
import { 
    Button, 
    Box, 
    TextField,
    Typography,
    Alert,
    useTheme,
    alpha,
    Chip,
    Paper,
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    Save as SaveIcon,
    Update as UpdateIcon,
    Add as AddIcon,
    Close as CloseIcon,
} from '@mui/icons-material';
import { ALLOWED_MIME_TYPES, ProductFormProps, SIZE_VALUE_IMG, SIZE_VALUE_IMG_CALC } from "../../types/interface/Interfaces";
import { useCreateProduct, useUpdateProduct } from '../../shared/api/hooks';

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {

    const theme = useTheme();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(1);
    const [categoryIds, setCategoryIds] = useState<string[]>([]);
    const [categoryInput, setCategoryInput] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const createProductMutation = useCreateProduct();
    const updateProductMutation = useUpdateProduct();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', String(price));
        formData.append('categoryIds', categoryIds.join(','));

        if (image) formData.append('image', image);

        if (initialData) {
            await updateProductMutation.mutateAsync({ id: initialData._id, payload: formData });
        } else {
            await createProductMutation.mutateAsync(formData);
        }

        onSubmit();
    };

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description);
            setPrice(initialData.price);
            setCategoryIds(initialData.categoryIds);
        }
    }, [initialData]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            if (!ALLOWED_MIME_TYPES.includes(file.type)) {
                setError('Invalid file type. Allowed types are: PNG, JPEG, GIF, WebP, BMP, SVG.');
                setImage(null);
                return;
            }

            if (file.size > SIZE_VALUE_IMG) {
                setError(`File is too large. Maximum size is ${SIZE_VALUE_IMG / SIZE_VALUE_IMG_CALC}MB.`);
                setImage(null);
                return;
            }

            setError(null);
            setImage(file);

            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    const handleAddCategory = () => {
        const trimmed = categoryInput.trim();
        if (trimmed && !categoryIds.includes(trimmed)) {
            setCategoryIds([...categoryIds, trimmed]);
            setCategoryInput('');
        }
    };

    const handleRemoveCategory = (id: string) => {
        setCategoryIds(categoryIds.filter(catId => catId !== id));
    };

    const handleCategoryKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCategory();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 3,
                }}>
                    <Box>
                        <TextField
                            label="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                            variant="outlined"
                            placeholder="Enter product name"
                        />
                    </Box>
                    
                    <Box>
                        <TextField
                            label="Price"
                            type="number"
                            value={price}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                    setPrice(value);
                                }
                            }}
                            fullWidth
                            required
                            variant="outlined"
                            placeholder="Enter price"
                            inputProps={{ min: 1, step: 0.01 }}
                        />
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            required
                            variant="outlined"
                            placeholder="Enter product description"
                            multiline
                            rows={3}
                        />
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                        <Typography 
                            variant="subtitle2" 
                            sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}
                        >
                            Category IDs *
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
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: categoryIds.length > 0 ? 2 : 0 }}>
                                {categoryIds.map((id, index) => (
                                    <Chip
                                        key={index}
                                        label={id}
                                        onDelete={() => handleRemoveCategory(id)}
                                        deleteIcon={<CloseIcon />}
                                        sx={{
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                            color: 'primary.main',
                                            fontWeight: 500,
                                            '& .MuiChip-deleteIcon': {
                                                color: 'primary.main',
                                                '&:hover': {
                                                    color: 'error.main',
                                                },
                                            },
                                        }}
                                    />
                                ))}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    value={categoryInput}
                                    onChange={(e) => setCategoryInput(e.target.value)}
                                    onKeyPress={handleCategoryKeyPress}
                                    placeholder="Type category ID and press Enter or click Add"
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
                                    onClick={handleAddCategory}
                                    variant="contained"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    disabled={!categoryInput.trim()}
                                    sx={{
                                        minWidth: 100,
                                        textTransform: 'none',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    Add
                                </Button>
                            </Box>
                        </Paper>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                            Add category IDs one by one. Press Enter or click Add button.
                        </Typography>
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
                        <Box
                            sx={{
                                p: 3,
                                border: `2px dashed ${theme.palette.divider}`,
                                borderRadius: 2,
                                textAlign: 'center',
                                backgroundColor: alpha(theme.palette.primary.main, 0.02),
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                },
                            }}
                        >
                            <input
                                ref={inputRef}
                                id="image-upload"
                                type="file"
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                            <label htmlFor="image-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<UploadIcon />}
                                    sx={{
                                        mb: 2,
                                    }}
                                >
                                    Choose Image
                                </Button>
                            </label>
                            
                            {error && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {error}
                                </Alert>
                            )}
                            
                            {image && !error && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 2,
                                        color: 'success.main',
                                        fontWeight: 500,
                                    }}
                                >
                                    ✓ File selected: {image.name}
                                </Typography>
                            )}

                            {!image && !error && (
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 2, color: 'text.secondary' }}
                                >
                                    Accepted formats: PNG, JPEG, GIF, WebP, BMP, SVG
                                    <br />
                                    Maximum size: {SIZE_VALUE_IMG / SIZE_VALUE_IMG_CALC}MB
                                </Typography>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ gridColumn: { xs: '1', sm: '1 / -1' } }}>
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
                            {initialData ? 'Update Product' : 'Create Product'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </form>
    );
};

export default ProductForm;
