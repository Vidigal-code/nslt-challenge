import React, {useState, useEffect, useRef} from 'react';
import {Button, Grid, Box, InputLabel, TextField} from '@mui/material';
import {createProduct, updateProduct} from '../../api/Api';
import {ALLOWED_MIME_TYPES, ProductFormProps, SIZE_VALUE_IMG, SIZE_VALUE_IMG_CALC} from "../../types/interface/Interfaces";

const ProductForm: React.FC<ProductFormProps> = ({onSubmit, initialData}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number>(1);
    const [categoryIds, setCategoryIds] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

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
                            inputProps={{ min: 1}}
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
                        <InputLabel>
                            {error ? (
                                <p style={{ color: 'red' }}>{error}</p>
                            ) : (
                                image && <p>File selected: {image.name}</p>
                            )}
                        </InputLabel>
                        <input
                            ref={inputRef}
                            id="image-upload"
                            type="file"
                            onChange={handleImageChange}
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
